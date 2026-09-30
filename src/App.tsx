import React, { useState, useEffect } from 'react';
import { Site, Incident } from './types';
import { INITIAL_SITES, INITIAL_INCIDENTS } from './data/mockData';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { MetricCards } from './components/MetricCards';
import { RadarMap } from './components/RadarMap';
import { IncidentQueue } from './components/IncidentQueue';
import { EventTimelineChart } from './components/EventTimelineChart';
import { FacilityHealth } from './components/FacilityHealth';
import { ResponseMetrics } from './components/ResponseMetrics';

// Modals
import { EmergencyControlModal } from './components/modals/EmergencyControlModal';
import { Emergency119Modal } from './components/modals/Emergency119Modal';
import { SOPModal } from './components/modals/SOPModal';
import { TechnicianModal } from './components/modals/TechnicianModal';
import { SensorDiagnosticModal } from './components/modals/SensorDiagnosticModal';
import { PhoneCallModal } from './components/modals/PhoneCallModal';

// Sub Views
import { SiteMapView } from './components/views/SiteMapView';
import { FacilityView } from './components/views/FacilityView';
import { AlarmsView } from './components/views/AlarmsView';
import { InspectionView } from './components/views/InspectionView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('realtime-monitoring');
  const [sites, setSites] = useState<Site[]>(INITIAL_SITES);
  const [selectedSite, setSelectedSite] = useState<Site | null>(INITIAL_SITES[0]); // hanbit-b2
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);

  // Filters
  const [selectedSiteFilter, setSelectedSiteFilter] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('today');
  const [audioAlarmActive, setAudioAlarmActive] = useState<boolean>(false);

  // Modals
  const [isEmergencyControlOpen, setIsEmergencyControlOpen] = useState<boolean>(false);
  const [emergencyModalSite, setEmergencyModalSite] = useState<Site | null>(INITIAL_SITES[0]);
  const [is119ModalOpen, setIs119ModalOpen] = useState<boolean>(false);
  const [isSOPModalOpen, setIsSOPModalOpen] = useState<boolean>(false);
  const [isTechnicianModalOpen, setIsTechnicianModalOpen] = useState<boolean>(false);
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState<boolean>(false);
  const [callingIncident, setCallingIncident] = useState<Incident | null>(null);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState<boolean>(false);

  // Live temperature subtle fluctuation for realism
  useEffect(() => {
    const timer = setInterval(() => {
      setSites((prev) =>
        prev.map((s) => {
          if (s.id === 'hanbit-b2') {
            // slight jitter around 86.4
            const delta = (Math.random() - 0.45) * 0.3;
            const nextTemp = Math.max(84, Math.min(88.5, +(s.currentTemp + delta).toFixed(1)));
            return { ...s, currentTemp: nextTemp };
          }
          return s;
        })
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Update selected site when sites array updates
  useEffect(() => {
    if (selectedSite) {
      const refreshed = sites.find((s) => s.id === selectedSite.id);
      if (refreshed) {
        setSelectedSite(refreshed);
      }
    }
  }, [sites]);

  // Audio siren simulation using Web Audio API
  useEffect(() => {
    let ctx: AudioContext | null = null;
    let osc: OscillatorNode | null = null;

    if (audioAlarmActive) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        ctx = new AudioCtx();
        osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
      } catch (e) {
        // audio blocked or unsupported
      }
    }

    return () => {
      if (osc) {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      }
      if (ctx) {
        try {
          ctx.close();
        } catch (e) {}
      }
    };
  }, [audioAlarmActive]);

  const activeCriticalCount = incidents.filter((i) => i.level === 'critical' && !i.confirmed).length;

  // Handlers
  const handleAcknowledge = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, confirmed: true } : inc))
    );
  };

  const handleAcknowledgeAll = () => {
    setIncidents((prev) => prev.map((inc) => ({ ...inc, confirmed: true })));
  };

  const handleCutPower = (incident: Incident) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === incident.id ? { ...inc, powerCut: true } : inc))
    );
    setSites((prev) =>
      prev.map((s) =>
        s.id === incident.siteId ? { ...s, breakerStatus: '자동 트립 완료' } : s
      )
    );
  };

  const handleAssignManager = (incident: Incident) => {
    setIsTechnicianModalOpen(true);
  };

  const handleReconnectNetwork = (incident: Incident) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incident.id
          ? { ...inc, description: '보조망(LTE Band 7)으로 자동 재접속 성공 · 정상 수신' }
          : inc
      )
    );
  };

  const handleUpdateSite = (updated: Site) => {
    setSites((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setSelectedSite(updated);
  };

  const handleSiteFilterChange = (siteId: string) => {
    setSelectedSiteFilter(siteId);
    if (siteId !== 'all') {
      const target = sites.find((s) => s.id === siteId);
      if (target) {
        setSelectedSite(target);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F6FB] text-[#171C20] flex">
      {/* 1. Left Fixed Navigation Rail */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeCriticalCount={activeCriticalCount}
      />

      {/* 2. Top Fixed Header */}
      <Header
        selectedSiteFilter={selectedSiteFilter}
        onSiteFilterChange={handleSiteFilterChange}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        unreadAlertCount={activeCriticalCount}
        onOpenNotifications={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
        onManualRefresh={() => {
          setSites([...sites]);
        }}
        audioAlarmActive={audioAlarmActive}
        onToggleAudio={() => setAudioAlarmActive(!audioAlarmActive)}
      />

      {/* Notifications Dropdown Drawer */}
      {notificationDropdownOpen && (
        <div className="fixed top-[68px] right-5 z-50 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-[13px] font-bold text-slate-900">실시간 긴급 알림</span>
            <button
              onClick={() => setNotificationDropdownOpen(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                onClick={() => {
                  const s = sites.find((x) => x.id === inc.siteId);
                  if (s) {
                    setSelectedSite(s);
                    setEmergencyModalSite(s);
                    setIsEmergencyControlOpen(true);
                  }
                  setNotificationDropdownOpen(false);
                }}
                className="p-2 rounded-lg bg-slate-50 hover:bg-red-50 cursor-pointer border border-slate-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                    {inc.levelLabel}
                  </span>
                  <span className="font-mono-numeric text-[10px] text-slate-400">{inc.timeAgo}</span>
                </div>
                <div className="text-[12px] font-bold text-slate-900 mt-1 truncate">{inc.title}</div>
                <div className="text-[11px] text-slate-500">{inc.siteName}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Main Operational Content Area */}
      <main className="pl-[184px] pt-[68px] w-full min-h-screen">
        <div className="p-5 flex flex-col gap-4 max-w-[1920px] mx-auto">
          {currentTab === 'realtime-monitoring' && (
            <>
              {/* 1. TOP STATUS STRIP (Compact Operational Metric Blocks) */}
              <MetricCards
                onCardClick={(type) => {
                  if (type === 'critical') {
                    const target = sites.find((s) => s.status === 'critical');
                    if (target) {
                      setSelectedSite(target);
                      setEmergencyModalSite(target);
                      setIsEmergencyControlOpen(true);
                    }
                  } else if (type === 'sites') {
                    setCurrentTab('site-map');
                  }
                }}
              />

              {/* 2. MIDDLE MAIN AREA (Split 7 : 5 Grid) */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
                {/* LEFT: Site Safety Map (7 Cols) */}
                <div className="lg:col-span-7">
                  <RadarMap
                    sites={sites}
                    selectedSite={selectedSite}
                    onSelectSite={(site) => setSelectedSite(site)}
                    onOpenEmergencyControl={(site) => {
                      setEmergencyModalSite(site);
                      setIsEmergencyControlOpen(true);
                    }}
                  />
                </div>

                {/* RIGHT: Live Incident Queue (5 Cols) */}
                <div className="lg:col-span-5">
                  <IncidentQueue
                    incidents={incidents}
                    onAcknowledge={handleAcknowledge}
                    onAcknowledgeAll={handleAcknowledgeAll}
                    onCallManager={(inc) => setCallingIncident(inc)}
                    onCutPower={handleCutPower}
                    onAssignManager={handleAssignManager}
                    onReconnectNetwork={handleReconnectNetwork}
                    onOpenChecklist={() => setIsSOPModalOpen(true)}
                    onOpenEmergency119={() => setIs119ModalOpen(true)}
                    onOpenDispatcherModal={() => setIsTechnicianModalOpen(true)}
                  />
                </div>
              </section>

              {/* 3. BOTTOM SECTION (Split 4 : 4 : 4 Grid) */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
                {/* BOTTOM LEFT: 24-Hour Timeline & Anomaly Histogram (4 Cols) */}
                <div className="lg:col-span-4">
                  <EventTimelineChart
                    onSelectHour={() => {
                      setCurrentTab('alarms-and-events');
                    }}
                  />
                </div>

                {/* BOTTOM CENTER: Device Health Monitoring (4 Cols) */}
                <div className="lg:col-span-4">
                  <FacilityHealth
                    onOpenDiagnostic={() => setIsDiagnosticModalOpen(true)}
                  />
                </div>

                {/* BOTTOM RIGHT: Response Performance (4 Cols) */}
                <div className="lg:col-span-4">
                  <ResponseMetrics
                    onOpenSOP={() => setIsSOPModalOpen(true)}
                    onOpenDispatch={() => setIsTechnicianModalOpen(true)}
                  />
                </div>
              </section>
            </>
          )}

          {currentTab === 'site-map' && (
            <SiteMapView
              sites={sites}
              onSelectSite={(s) => setSelectedSite(s)}
              onOpenEmergency={(s) => {
                setEmergencyModalSite(s);
                setIsEmergencyControlOpen(true);
              }}
            />
          )}

          {currentTab === 'facility-status' && <FacilityView />}

          {currentTab === 'alarms-and-events' && (
            <AlarmsView
              incidents={incidents}
              onAcknowledge={handleAcknowledge}
              onOpen119={() => setIs119ModalOpen(true)}
            />
          )}

          {currentTab === 'inspection-actions' && <InspectionView />}

          {currentTab === 'reports' && <ReportsView />}

          {currentTab === 'system-settings' && <SettingsView />}
        </div>
      </main>

      {/* 4. Interactive Modals */}
      {isEmergencyControlOpen && emergencyModalSite && (
        <EmergencyControlModal
          site={emergencyModalSite}
          onClose={() => setIsEmergencyControlOpen(false)}
          onOpen119={() => setIs119ModalOpen(true)}
          onUpdateSite={handleUpdateSite}
        />
      )}

      {is119ModalOpen && (
        <Emergency119Modal
          site={emergencyModalSite || selectedSite}
          onClose={() => setIs119ModalOpen(false)}
        />
      )}

      {isSOPModalOpen && <SOPModal onClose={() => setIsSOPModalOpen(false)} />}

      {isTechnicianModalOpen && (
        <TechnicianModal
          onClose={() => setIsTechnicianModalOpen(false)}
          onAssignSuccess={(name) => {
            setIncidents((prev) =>
              prev.map((i) =>
                i.id === 'inc-02'
                  ? { ...i, manager: name, managerStatus: '현장 급파 (5분 내 도착)' }
                  : i
              )
            );
          }}
        />
      )}

      {isDiagnosticModalOpen && (
        <SensorDiagnosticModal onClose={() => setIsDiagnosticModalOpen(false)} />
      )}

      {callingIncident && (
        <PhoneCallModal
          incident={callingIncident}
          onClose={() => setCallingIncident(null)}
        />
      )}
    </div>
  );
}
