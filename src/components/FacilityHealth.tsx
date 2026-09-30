import React from 'react';
import { EQUIPMENT_CATEGORIES } from '../data/mockData';

interface FacilityHealthProps {
  onOpenDiagnostic: () => void;
}

export const FacilityHealth: React.FC<FacilityHealthProps> = ({ onOpenDiagnostic }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-bold text-[#171C20]">핵심 설비 상태</h2>
            <p className="text-[12px] text-[#484555] mt-0.5">전국 센서망 통신 및 수신 건전도</p>
          </div>
          <span className="text-[11px] text-[#006687] bg-[#C0E8FF]/60 px-2 py-0.5 rounded-full font-bold">
            정상률 95.8%
          </span>
        </div>

        {/* 5 Telemetry Rows */}
        <div className="flex flex-col gap-2.5 mt-3.5">
          {EQUIPMENT_CATEGORIES.map((eq) => {
            return (
              <div key={eq.id} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        eq.normalPercentage >= 95
                          ? 'bg-emerald-500'
                          : eq.normalPercentage >= 90
                          ? 'bg-emerald-500'
                          : 'bg-amber-500'
                      }`}
                    ></span>
                    <span className="font-semibold text-[#171C20]">{eq.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-numeric text-[#484555] text-[11px]">{eq.details}</span>
                    <span
                      className={`font-mono-numeric font-bold text-[12px] ${
                        eq.normalPercentage < 90 ? 'text-amber-700' : 'text-[#171C20]'
                      }`}
                    >
                      {eq.normalPercentage}%
                    </span>
                  </div>
                </div>

                <div className="w-full bg-[#EAEEF3] h-1.5 rounded-full overflow-hidden flex">
                  {eq.breakdown.map((b, idx) => (
                    <div
                      key={idx}
                      className={`${b.color} h-full transition-all duration-300`}
                      style={{ width: `${b.pct}%` }}
                      title={`${b.label}: ${b.count}`}
                    ></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#484555]">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">sync</span>
          센서 데이터 폴링 주기: 500ms
        </span>
        <button
          onClick={onOpenDiagnostic}
          className="text-[#5736DD] hover:underline font-bold transition-colors"
          type="button"
        >
          센서망 세부 진단 →
        </button>
      </div>
    </div>
  );
};
