import React, { useState } from 'react';
import { Incident } from '../types';

interface IncidentQueueProps {
  incidents: Incident[];
  onAcknowledge: (id: string) => void;
  onAcknowledgeAll: () => void;
  onCallManager: (incident: Incident) => void;
  onCutPower: (incident: Incident) => void;
  onAssignManager: (incident: Incident) => void;
  onReconnectNetwork: (incident: Incident) => void;
  onOpenChecklist: (incident: Incident) => void;
  onOpenEmergency119: () => void;
  onOpenDispatcherModal: () => void;
}

export const IncidentQueue: React.FC<IncidentQueueProps> = ({
  incidents,
  onAcknowledge,
  onAcknowledgeAll,
  onCallManager,
  onCutPower,
  onAssignManager,
  onReconnectNetwork,
  onOpenChecklist,
  onOpenEmergency119,
  onOpenDispatcherModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'caution'>('all');

  const filteredIncidents = incidents.filter((inc) => {
    if (filter === 'all') return true;
    if (filter === 'critical') return inc.level === 'critical';
    if (filter === 'caution') return inc.level === 'caution';
    return true;
  });

  const activeCount = incidents.filter((i) => !i.confirmed).length;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5] flex flex-col justify-between h-full">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-bold text-[#171C20]">실시간 경보 대기열</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FFD9DE] text-[#90003A] font-bold">
              {activeCount}건 처리중
            </span>
          </div>
          <div className="inline-flex p-0.5 bg-[#EAEEF3] rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-white text-[#171C20] shadow-xs'
                  : 'text-[#484555] hover:text-[#171C20]'
              }`}
              type="button"
            >
              전체
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                filter === 'critical'
                  ? 'bg-white text-[#B1004A] shadow-xs'
                  : 'text-[#484555] hover:text-[#171C20]'
              }`}
              type="button"
            >
              긴급
            </button>
            <button
              onClick={() => setFilter('caution')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                filter === 'caution'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-[#484555] hover:text-[#171C20]'
              }`}
              type="button"
            >
              주의
            </button>
          </div>
        </div>

        {/* Incident Cards Stack */}
        <div className="flex flex-col gap-2.5 mt-3 max-h-[440px] overflow-y-auto pr-1">
          {filteredIncidents.map((inc) => {
            if (inc.level === 'critical') {
              return (
                <div
                  key={inc.id}
                  className={`rounded-xl p-3 shadow-xs flex flex-col gap-2 transition-all ${
                    inc.confirmed
                      ? 'bg-red-50/60 border border-red-200 opacity-80'
                      : 'bg-red-500/10 border border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-[#DB1660] text-white text-[10px] font-extrabold animate-pulse">
                        {inc.levelLabel}
                      </span>
                      <span className="text-[13px] text-[#171C20] font-bold">{inc.siteName}</span>
                    </div>
                    <span className="font-mono-numeric text-[11px] text-[#B1004A] font-bold">
                      {inc.timeAgo}
                    </span>
                  </div>

                  <div>
                    <p className="text-[13px] text-[#171C20] font-bold leading-tight">{inc.title}</p>
                    <p className="text-[11px] text-[#484555] mt-0.5">{inc.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] bg-white/80 px-2 py-1 rounded border border-red-100">
                    <span className="text-[#484555]">
                      담당: <strong className="text-[#171C20]">{inc.manager}</strong>
                    </span>
                    <span className="text-[#B1004A] font-semibold">{inc.managerStatus}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 mt-0.5">
                    <button
                      onClick={() => onAcknowledge(inc.id)}
                      className={`py-1 text-[11px] rounded font-semibold shadow-xs transition-colors ${
                        inc.confirmed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-white hover:bg-slate-100 text-[#171C20]'
                      }`}
                      type="button"
                    >
                      {inc.confirmed ? '✓ 확인완료' : '경보 확인'}
                    </button>
                    <button
                      onClick={() => onCallManager(inc)}
                      className="py-1 bg-white hover:bg-slate-100 text-[#171C20] text-[11px] rounded font-semibold shadow-xs flex items-center justify-center gap-1 transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px] text-[#5736DD]">call</span>
                      현장 통화
                    </button>
                    <button
                      onClick={() => onCutPower(inc)}
                      className={`py-1 text-white text-[11px] rounded font-bold shadow-xs transition-colors ${
                        inc.powerCut
                          ? 'bg-slate-700 hover:bg-slate-800'
                          : 'bg-[#B1004A] hover:bg-[#DB1660]'
                      }`}
                      type="button"
                    >
                      {inc.powerCut ? '차단 완료됨' : '전원 차단'}
                    </button>
                  </div>
                </div>
              );
            }

            if (inc.level === 'caution') {
              return (
                <div
                  key={inc.id}
                  className="bg-amber-500/10 border border-amber-300 rounded-xl p-3 shadow-xs flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-amber-500 text-amber-950 text-[10px] font-bold">
                        {inc.levelLabel}
                      </span>
                      <span className="text-[13px] text-[#171C20] font-bold">{inc.siteName}</span>
                    </div>
                    <span className="font-mono-numeric text-[11px] text-[#484555]">{inc.timeAgo}</span>
                  </div>

                  <div>
                    <p className="text-[13px] text-[#171C20] font-semibold">{inc.title}</p>
                    <p className="text-[11px] text-[#484555] mt-0.5">{inc.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] bg-white/80 px-2 py-1 rounded border border-amber-200">
                    <span className="text-[#484555]">
                      담당: <span className="text-[#B1004A] font-bold">{inc.manager}</span>
                    </span>
                    <span className="text-[#484555]">{inc.managerStatus}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 mt-0.5">
                    <button
                      onClick={() => onAssignManager(inc)}
                      className="py-1 bg-white hover:bg-slate-100 text-[#171C20] text-[11px] rounded font-semibold shadow-xs transition-colors"
                      type="button"
                    >
                      담당자 자동 배정
                    </button>
                    <button
                      onClick={() => onReconnectNetwork(inc)}
                      className="py-1 bg-[#006687] text-white hover:bg-[#004D66] text-[11px] rounded font-semibold shadow-xs transition-colors"
                      type="button"
                    >
                      통신망 재접속
                    </button>
                  </div>
                </div>
              );
            }

            // Maintenance
            return (
              <div
                key={inc.id}
                className="bg-[#F0F4F9] border border-slate-200 rounded-xl p-3 shadow-xs flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-[#C0E8FF] text-[#001E2B] text-[10px] font-bold">
                      {inc.levelLabel}
                    </span>
                    <span className="text-[13px] text-[#171C20] font-bold">{inc.siteName}</span>
                  </div>
                  <span className="font-mono-numeric text-[11px] text-[#484555]">{inc.timeAgo}</span>
                </div>

                <div>
                  <p className="text-[13px] text-[#171C20] font-medium">{inc.title}</p>
                  <p className="text-[11px] text-[#484555] mt-0.5">{inc.description}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] bg-white px-2 py-1 rounded border border-slate-200">
                  <span className="text-[#484555]">
                    담당: <strong className="text-[#171C20]">{inc.manager}</strong>
                  </span>
                  <span className="text-[#484555]">{inc.managerStatus}</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mt-0.5">
                  <button
                    onClick={() => onOpenChecklist(inc)}
                    className="py-1 bg-white hover:bg-slate-100 text-[#171C20] text-[11px] rounded font-medium shadow-xs transition-colors"
                    type="button"
                  >
                    사전 체크리스트
                  </button>
                  <button
                    onClick={() => onOpenChecklist(inc)}
                    className="py-1 bg-white hover:bg-slate-100 text-[#171C20] text-[11px] rounded font-medium shadow-xs transition-colors"
                    type="button"
                  >
                    일정 변경
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Operations Bar */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
        <button
          onClick={onAcknowledgeAll}
          className="flex-1 py-2 px-1.5 bg-[#EAEEF3] hover:bg-[#DFE3E8] text-[#171C20] text-[12px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">done_all</span>
          <span>경보 일괄 확인</span>
        </button>

        <button
          onClick={onOpenDispatcherModal}
          className="flex-1 py-2 px-1.5 bg-[#EAEEF3] hover:bg-[#DFE3E8] text-[#171C20] text-[12px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">person_add</span>
          <span>당직자 배정</span>
        </button>

        <button
          onClick={onOpenEmergency119}
          className="py-2 px-3 bg-[#DB1660] hover:bg-[#B1004A] text-white text-[12px] font-extrabold rounded-lg shadow-md hover:shadow-lg flex items-center gap-1.5 transition-all animate-pulse"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">e911_emergency</span>
          <span>소방청 119</span>
        </button>
      </div>
    </div>
  );
};
