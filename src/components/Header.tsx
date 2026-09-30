import React, { useState, useEffect } from 'react';

interface HeaderProps {
  selectedSiteFilter: string;
  onSiteFilterChange: (site: string) => void;
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  unreadAlertCount: number;
  onOpenNotifications: () => void;
  onManualRefresh: () => void;
  audioAlarmActive: boolean;
  onToggleAudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedSiteFilter,
  onSiteFilterChange,
  selectedPeriod,
  onPeriodChange,
  unreadAlertCount,
  onOpenNotifications,
  onManualRefresh,
  audioAlarmActive,
  onToggleAudio,
}) => {
  const [timeStr, setTimeStr] = useState<string>('14:32:18');

  // Real-time ticking clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${h}:${m}:${s}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-[184px] right-0 h-[68px] bg-white border-b border-[#E5EAF2] z-40 px-5 flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Left: Status & Clock */}
      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-2 bg-[#EAEEF3] px-3 py-1.5 rounded-full">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[12px] text-[#006687] font-semibold tracking-tight">실시간 연결</span>
        </div>

        <div className="flex items-center gap-1.5 font-mono-numeric text-[#484555] text-[13px]">
          <span className="text-slate-500">최종 갱신</span>
          <span className="font-bold text-[#171C20]">{timeStr}</span>
          <button
            onClick={onManualRefresh}
            title="새로고침"
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors ml-0.5"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
          </button>
        </div>
      </div>

      {/* Right: Dropdowns, Sound, Notifications, Profile */}
      <div className="flex items-center gap-3.5">
        {/* Site Filter Select */}
        <div className="relative">
          <select
            value={selectedSiteFilter}
            onChange={(e) => onSiteFilterChange(e.target.value)}
            className="appearance-none bg-[#F0F4F9] border border-[#DFE3E8] text-[#171C20] text-[13px] font-medium rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <option value="all">전체 현장 (본사/지사)</option>
            <option value="hanbit-b2">한빛 B2 거점 (긴급 위험)</option>
            <option value="center-p2">센터 P2 주차동 (주의)</option>
            <option value="hanbit-b1">한빛 B1 (정상)</option>
            <option value="seobu-transit">서부 환승센터 (정상)</option>
            <option value="gangnam-center">강남 센터 (정상)</option>
            <option value="public-parking">공영주차타워 (정상)</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-2 text-[#484555] text-[18px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Period Filter Select */}
        <div className="relative">
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="appearance-none bg-[#F0F4F9] border border-[#DFE3E8] text-[#171C20] text-[13px] font-medium rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <option value="today">오늘</option>
            <option value="24h">최근 24시간</option>
            <option value="7d">최근 7일</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-2 text-[#484555] text-[18px] pointer-events-none">
            calendar_today
          </span>
        </div>

        {/* Audio Siren Toggle */}
        <button
          onClick={onToggleAudio}
          title={audioAlarmActive ? '음향 경보 끄기' : '음향 경보 켜기'}
          className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
            audioAlarmActive
              ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 animate-pulse'
              : 'text-[#484555] hover:bg-[#EAEEF3] hover:text-[#171C20]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {audioAlarmActive ? 'volume_up' : 'volume_off'}
          </span>
        </button>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg hover:bg-[#EAEEF3] text-[#484555] hover:text-[#171C20] transition-colors"
          type="button"
          title="실시간 알림 내역"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          {unreadAlertCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#DB1660] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-pulse">
              알림 {unreadAlertCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-[#DFE3E8]">
          <div className="flex flex-col text-right">
            <span className="text-[13px] font-bold text-[#171C20] leading-tight">김관리 총괄</span>
            <span className="text-[11px] text-[#484555]">한빛시설관리</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#5736DD] flex items-center justify-center text-white shadow-sm ring-2 ring-indigo-200">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
