import React, { useState } from 'react';
import { Site } from '../types';

interface RadarMapProps {
  sites: Site[];
  selectedSite: Site | null;
  onSelectSite: (site: Site) => void;
  onOpenEmergencyControl: (site: Site) => void;
}

export const RadarMap: React.FC<RadarMapProps> = ({
  sites,
  selectedSite,
  onSelectSite,
  onOpenEmergencyControl,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'danger'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(true);

  const displayedSites = filterMode === 'all'
    ? sites
    : sites.filter((s) => s.status === 'critical' || s.status === 'caution');

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.max(0.8, Math.min(1.6, +(prev + delta).toFixed(1))));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setFilterMode('all');
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5] flex flex-col gap-3 relative overflow-hidden">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-bold text-[#171C20]">현장 안전 현황</span>
            <span className="text-[11px] bg-[#C0E8FF] text-[#004D66] px-2 py-0.5 rounded-full font-bold">
              실시간 레이더 관제
            </span>
          </div>
          <span className="text-[12px] text-[#484555] mt-0.5">
            전국 거점 사업소의 온·습도, 열화상 및 소화 배관 압력 현황
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="inline-flex p-0.5 bg-[#EAEEF3] rounded-lg">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-md text-[12px] font-semibold transition-all ${
                filterMode === 'all'
                  ? 'bg-white text-[#171C20] shadow-sm'
                  : 'text-[#484555] hover:text-[#171C20]'
              }`}
            >
              전체 현장 ({sites.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('danger')}
              className={`px-2.5 py-1 rounded-md text-[12px] font-semibold transition-all ${
                filterMode === 'danger'
                  ? 'bg-white text-[#B1004A] shadow-sm'
                  : 'text-[#B1004A] hover:text-[#DB1660]'
              }`}
            >
              위험·주의 ({sites.filter((s) => s.status !== 'normal').length})
            </button>
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center gap-0.5 bg-[#EAEEF3] rounded-lg p-0.5">
            <button
              onClick={() => handleZoom(0.1)}
              className="w-7 h-7 flex items-center justify-center rounded text-[#484555] hover:bg-white hover:text-[#171C20] transition-colors"
              title="확대"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
            <button
              onClick={() => handleZoom(-0.1)}
              className="w-7 h-7 flex items-center justify-center rounded text-[#484555] hover:bg-white hover:text-[#171C20] transition-colors"
              title="축소"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <button
              onClick={handleReset}
              className="w-7 h-7 flex items-center justify-center rounded text-[#484555] hover:bg-white hover:text-[#171C20] transition-colors"
              title="리셋"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Map & Radar Canvas Area */}
      <div className="relative w-full h-[470px] bg-[#F0F4F9] rounded-lg overflow-hidden flex items-center justify-center border border-[#DFE3E8]">
        {/* Technical Grid Background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(#797587 0.75px, transparent 0.75px), radial-gradient(#797587 0.75px, #f0f4f9 0.75px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        ></div>

        {/* Scalable Tactical Radar Graphic */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-300 pointer-events-none"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg className="w-full h-full text-[#C9C4D8]/50" fill="none" viewBox="0 0 700 470">
            {/* Concentric Radar Circles */}
            <circle cx="340" cy="220" r="220" stroke="currentColor" strokeDasharray="3 5" strokeWidth="1" opacity="0.3"></circle>
            <circle cx="340" cy="220" r="160" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" opacity="0.5"></circle>
            <circle cx="340" cy="220" r="90" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" opacity="0.6"></circle>
            <circle cx="340" cy="220" r="30" stroke="currentColor" strokeWidth="1" opacity="0.4"></circle>

            {/* Tactical Crosshairs */}
            <line x1="80" y1="220" x2="600" y2="220" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" opacity="0.35"></line>
            <line x1="340" y1="20" x2="340" y2="420" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" opacity="0.35"></line>

            {/* Regional Map Contour Trace */}
            <path
              d="M 270 80 Q 340 70 380 110 T 430 180 T 410 260 T 360 350 T 290 320 T 260 230 T 280 140 Z"
              fill="rgba(87,54,221,0.03)"
              stroke="rgba(87,54,221,0.2)"
              strokeWidth="1.5"
            ></path>
          </svg>

          {/* Sweeping Radar Beam */}
          <div className="absolute top-[220px] left-[340px] w-[220px] h-[220px] pointer-events-none -translate-x-0 -translate-y-full origin-bottom-left animate-radar">
            <div
              className="w-full h-full"
              style={{
                background: 'conic-gradient(from 0deg at 0% 100%, rgba(87, 54, 221, 0.18) 0deg, transparent 60deg)',
              }}
            ></div>
          </div>
        </div>

        {/* Site Markers */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-300 pointer-events-auto"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {displayedSites.map((site) => {
            const isSelected = selectedSite?.id === site.id;

            if (site.status === 'critical') {
              return (
                <div
                  key={site.id}
                  onClick={() => {
                    onSelectSite(site);
                    setIsPanelOpen(true);
                  }}
                  className="absolute flex flex-col items-center z-30 cursor-pointer group transition-transform hover:scale-110"
                  style={{ top: `${site.y}%`, left: `${site.x}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-9 h-9 rounded-full bg-rose-500/30 animate-ping"></span>
                    <span className="w-5 h-5 rounded-full bg-[#DB1660] flex items-center justify-center text-white shadow-lg ring-2 ring-white">
                      <span className="material-symbols-outlined text-[13px] font-bold">priority_high</span>
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 bg-[#DB1660] text-white px-2 py-0.5 rounded-md shadow-md">
                    <span className="text-[11px] font-bold">{site.name}</span>
                    <span className="font-mono-numeric text-[10px] bg-black/30 px-1 rounded">
                      {site.currentTemp.toFixed(1)}℃
                    </span>
                  </div>
                </div>
              );
            }

            if (site.status === 'caution') {
              return (
                <div
                  key={site.id}
                  onClick={() => {
                    onSelectSite(site);
                    setIsPanelOpen(true);
                  }}
                  className="absolute flex flex-col items-center z-20 cursor-pointer group transition-transform hover:scale-110"
                  style={{ top: `${site.y}%`, left: `${site.x}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full bg-amber-500 shadow-md ring-2 ring-white"></span>
                  </div>
                  <span className="mt-1 text-[10px] font-semibold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded shadow-sm border border-amber-300">
                    {site.name} (주의)
                  </span>
                </div>
              );
            }

            if (site.status === 'offline') {
              return (
                <div
                  key={site.id}
                  onClick={() => {
                    onSelectSite(site);
                    setIsPanelOpen(true);
                  }}
                  className="absolute flex flex-col items-center z-10 cursor-pointer opacity-70 group hover:opacity-100 transition-opacity"
                  style={{ top: `${site.y}%`, left: `${site.x}%` }}
                >
                  <span className="w-3 h-3 rounded-full bg-slate-400 ring-2 ring-white"></span>
                  <span className="mt-1 text-[10px] font-medium text-[#484555] bg-white/90 px-1.5 py-0.5 rounded shadow-sm border border-slate-200">
                    {site.name} (점검)
                  </span>
                </div>
              );
            }

            // Normal green sites
            return (
              <div
                key={site.id}
                onClick={() => {
                  onSelectSite(site);
                  setIsPanelOpen(true);
                }}
                className={`absolute flex flex-col items-center z-10 cursor-pointer group transition-transform hover:scale-110 ${
                  isSelected ? 'scale-110' : ''
                }`}
                style={{ top: `${site.y}%`, left: `${site.x}%` }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm ring-2 ring-white group-hover:ring-emerald-300"></span>
                </div>
                <span className="mt-1 text-[10px] font-medium text-[#171C20] bg-white/95 px-1.5 py-0.5 rounded shadow-sm border border-slate-100">
                  {site.name} ({site.chargersTotal})
                </span>
              </div>
            );
          })}
        </div>

        {/* Floating Information Panel (Active Selected Site) */}
        {selectedSite && isPanelOpen && (
          <div className="absolute bottom-3 right-3 max-w-[340px] w-full bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-xl border border-slate-200 z-30 transition-all">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] text-[#171C20] font-bold">
                  {selectedSite.name} ({selectedSite.subLocation})
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    selectedSite.status === 'critical'
                      ? 'bg-[#DB1660] text-white animate-pulse'
                      : selectedSite.status === 'caution'
                      ? 'bg-amber-500 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {selectedSite.status === 'critical'
                    ? '긴급 경보'
                    : selectedSite.status === 'caution'
                    ? '주의 관측'
                    : '정상 가동'}
                </span>
              </div>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="text-[#484555] hover:text-[#171C20] p-1 rounded hover:bg-slate-100 transition-colors"
                type="button"
                title="패널 닫기"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mt-2.5 text-[11px]">
              <div className="bg-[#F0F4F9] p-2 rounded-lg flex flex-col">
                <span className="text-[10px] font-semibold text-[#484555]">배터리/충전기 상태</span>
                <span className="text-[12px] font-bold text-[#171C20] mt-0.5">
                  {selectedSite.chargersTotal}기 (급속 {selectedSite.rapidChargers} / 완속 {selectedSite.slowChargers})
                </span>
              </div>

              <div className="bg-[#F0F4F9] p-2 rounded-lg flex flex-col">
                <span className="text-[10px] font-semibold text-[#484555]">감지 시각</span>
                <span className="font-mono-numeric text-[11px] font-semibold text-[#171C20] mt-0.5">
                  {selectedSite.detectionTime || '실시간 정상'} {selectedSite.detectionAgo ? `(${selectedSite.detectionAgo})` : ''}
                </span>
              </div>

              <div
                className={`p-2 rounded-lg flex flex-col col-span-2 ${
                  selectedSite.status === 'critical'
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-[#F0F4F9]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`text-[11px] font-bold ${
                      selectedSite.status === 'critical' ? 'text-[#B1004A]' : 'text-[#484555]'
                    }`}
                  >
                    열화상 측정 온도
                  </span>
                  <span
                    className={`font-mono-numeric text-[14px] font-bold ${
                      selectedSite.status === 'critical' ? 'text-[#DB1660]' : 'text-emerald-700'
                    }`}
                  >
                    {selectedSite.currentTemp.toFixed(1)}℃
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#484555] mt-1">
                  <span>안전 임계치: {selectedSite.tempThreshold.toFixed(1)}℃</span>
                  <span
                    className={`font-semibold ${
                      selectedSite.currentTemp > selectedSite.tempThreshold
                        ? 'text-[#DB1660]'
                        : 'text-emerald-700'
                    }`}
                  >
                    {selectedSite.currentTemp > selectedSite.tempThreshold
                      ? `+${(selectedSite.currentTemp - selectedSite.tempThreshold).toFixed(1)}℃ 초과 지속`
                      : '안전 범위 이내'}
                  </span>
                </div>
              </div>

              <div className="bg-[#F0F4F9] p-2 rounded-lg flex flex-col">
                <span className="text-[10px] font-semibold text-[#484555]">연기 감지 센서</span>
                <span
                  className={`text-[11px] font-bold mt-0.5 ${
                    selectedSite.status === 'critical' ? 'text-[#DB1660]' : 'text-emerald-700'
                  }`}
                >
                  {selectedSite.smokeStatus}
                </span>
              </div>

              <div className="bg-[#F0F4F9] p-2 rounded-lg flex flex-col">
                <span className="text-[10px] font-semibold text-[#484555]">MCCB 차단기</span>
                <span
                  className={`text-[11px] font-bold mt-0.5 ${
                    selectedSite.breakerStatus === '자동 트립 완료'
                      ? 'text-[#006687]'
                      : selectedSite.breakerStatus === '정상 가동'
                      ? 'text-emerald-700'
                      : 'text-amber-700'
                  }`}
                >
                  {selectedSite.breakerStatus}
                </span>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between bg-[#EAEEF3] px-2 py-1.5 rounded-lg text-[11px]">
              <span className="text-[#484555]">지정 안전 책임자</span>
              <span className="font-semibold text-[#171C20] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#006687]"></span>
                {selectedSite.assignedManager} ({selectedSite.managerStatus})
              </span>
            </div>

            <button
              onClick={() => onOpenEmergencyControl(selectedSite)}
              className="w-full mt-2.5 bg-[#B1004A] hover:bg-[#DB1660] text-white py-2 rounded-lg font-bold text-[12px] flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">emergency_home</span>
              <span>원격 비상 제어 및 상세 관제 열기</span>
            </button>
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 flex items-center gap-3 text-[11px] font-bold text-[#484555]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>정상 ({sites.filter((s) => s.status === 'normal').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>주의 ({sites.filter((s) => s.status === 'caution').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#DB1660]"></span>
            <span>긴급 ({sites.filter((s) => s.status === 'critical').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>미연결 (0)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
