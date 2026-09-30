import React, { useState, useEffect } from 'react';

export type NavTab =
  | 'realtime-monitoring'
  | 'site-map'
  | 'facility-status'
  | 'alarms-and-events'
  | 'inspection-actions'
  | 'reports'
  | 'system-settings';

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  activeCriticalCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  activeCriticalCount,
}) => {
  const [ping, setPing] = useState<number>(4.2);

  // Slight ping fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 0.4;
      setPing((prev) => Math.max(3.8, Math.min(5.1, +(prev + delta).toFixed(1))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { tab: NavTab; label: string; icon: string; badge?: number }[] = [
    { tab: 'realtime-monitoring', label: '실시간 관제', icon: 'monitoring' },
    { tab: 'site-map', label: '현장 지도', icon: 'map' },
    { tab: 'facility-status', label: '설비 상태', icon: 'precision_manufacturing' },
    {
      tab: 'alarms-and-events',
      label: '경보·이벤트',
      icon: 'warning',
      badge: activeCriticalCount > 0 ? activeCriticalCount : undefined,
    },
    { tab: 'inspection-actions', label: '점검·조치', icon: 'assignment_turned_in' },
    { tab: 'reports', label: '보고서', icon: 'description' },
    { tab: 'system-settings', label: '시스템 설정', icon: 'settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[184px] bg-gradient-to-b from-[#684EF5] to-[#1879F2] z-50 flex flex-col justify-between text-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] select-none">
      <div className="flex flex-col">
        {/* Brand / Logo */}
        <div className="px-3.5 py-4 flex items-center gap-2 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-white text-[20px]">local_fire_department</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white tracking-wider leading-tight text-[13px] font-extrabold font-sans">
              EV-FIREGUARD
            </span>
            <span className="text-white/75 text-[10px] tracking-wide font-medium">Safety Operations</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1 px-2 pt-3">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onTabChange(item.tab)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-all text-left ${
                  isActive
                    ? 'bg-[#0D2653] text-white font-semibold shadow-inner'
                    : 'text-white/80 hover:bg-white/10 hover:text-white text-[13px]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  <span className="text-[13px]">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-[#DB1660] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Sensor Health Status Badge */}
      <div className="p-2 mb-3">
        <div className="bg-black/25 backdrop-blur-sm rounded-lg p-2.5 flex flex-col gap-1 border border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-white text-[10px] font-bold tracking-wide">센서망 정상 가동</span>
          </div>
          <span className="text-white/70 text-[11px] leading-tight">화재 감지 센서망 정상</span>
          <span className="font-mono-numeric text-white/90 text-[11px]">최근 핑 {ping}ms</span>
        </div>
      </div>
    </aside>
  );
};
