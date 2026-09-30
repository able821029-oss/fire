import React from 'react';

interface MetricCardsProps {
  onCardClick?: (type: 'sites' | 'chargers' | 'normal' | 'caution' | 'critical') => void;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ onCardClick }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-5 gap-3.5 w-full">
      {/* Block 1: Operating Sites */}
      <div
        onClick={() => onCardClick?.('sites')}
        className="bg-white rounded-xl p-3.5 shadow-sm border border-[#E8EEF5] flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between text-[#484555]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[19px] text-[#5736DD]">apartment</span>
            <span className="text-[11px] font-bold text-[#484555] tracking-wider uppercase">운영 현장</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#006687]"></span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <span className="font-mono-numeric text-[26px] font-bold text-[#171C20] tracking-tight">
            08<span className="text-[14px] font-normal text-[#484555] ml-0.5">곳</span>
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EAEEF3] text-[#006687] font-semibold tracking-tight">
            전국 8개소 가동
          </span>
        </div>
        <div className="w-full bg-[#E4E9ED] h-1.5 rounded-full mt-2.5 overflow-hidden">
          <div className="bg-[#5736DD] h-full rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
        </div>
      </div>

      {/* Block 2: Registered Chargers */}
      <div
        onClick={() => onCardClick?.('chargers')}
        className="bg-white rounded-xl p-3.5 shadow-sm border border-[#E8EEF5] flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between text-[#484555]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[19px] text-[#006687]">bolt</span>
            <span className="text-[11px] font-bold text-[#484555] tracking-wider uppercase">등록 충전기</span>
          </div>
          <span className="text-[10px] font-medium text-[#484555]">총합계</span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <span className="font-mono-numeric text-[26px] font-bold text-[#171C20] tracking-tight">
            148<span className="text-[14px] font-normal text-[#484555] ml-0.5">기</span>
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#E4E9ED] text-[#484555] font-medium">
            완속 96 · 급속 52
          </span>
        </div>
        <div className="w-full bg-[#E4E9ED] h-1.5 rounded-full mt-2.5 overflow-hidden flex">
          <div className="bg-[#006687] h-full" style={{ width: '64.8%' }} title="완속 96기 (64.8%)"></div>
          <div className="bg-[#2FC6FF] h-full" style={{ width: '35.2%' }} title="급속 52기 (35.2%)"></div>
        </div>
      </div>

      {/* Block 3: Normal Status */}
      <div
        onClick={() => onCardClick?.('normal')}
        className="bg-emerald-500/10 rounded-xl p-3.5 shadow-sm border border-emerald-500/20 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between text-emerald-800">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[19px] text-emerald-600">check_circle</span>
            <span className="text-[11px] tracking-wider uppercase font-bold text-emerald-900">정상 가동</span>
          </div>
          <span className="text-[11px] bg-emerald-600/15 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
            92.6%
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <span className="font-mono-numeric text-[26px] font-bold text-emerald-950 tracking-tight">
            137<span className="text-[14px] text-emerald-800 font-normal ml-0.5">기</span>
          </span>
          <div className="flex items-center text-[11px] text-emerald-700 font-semibold">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            <span>+2기 정상 복구</span>
          </div>
        </div>
        <div className="w-full bg-emerald-200/50 h-1.5 rounded-full mt-2.5 overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '92.6%' }}></div>
        </div>
      </div>

      {/* Block 4: Caution Status */}
      <div
        onClick={() => onCardClick?.('caution')}
        className="bg-amber-500/10 rounded-xl p-3.5 shadow-sm border border-amber-500/20 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between text-amber-900">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[19px] text-amber-600">warning</span>
            <span className="text-[11px] tracking-wider uppercase font-bold text-amber-900">주의 관측</span>
          </div>
          <span className="text-[11px] bg-amber-500/20 text-amber-900 px-2 py-0.5 rounded-full font-bold">
            5.4%
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <span className="font-mono-numeric text-[26px] font-bold text-amber-950 tracking-tight">
            08<span className="text-[14px] text-amber-800 font-normal ml-0.5">기</span>
          </span>
          <span className="text-[11px] text-amber-800 font-medium tracking-tight">
            통신지연 5 · 점검 3
          </span>
        </div>
        <div className="w-full bg-amber-200/50 h-1.5 rounded-full mt-2.5 overflow-hidden">
          <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: '5.4%' }}></div>
        </div>
      </div>

      {/* Block 5: Critical Hazard / Emergency */}
      <div
        onClick={() => onCardClick?.('critical')}
        className="bg-gradient-to-br from-[#FF4D6D] to-[#E62E5C] text-white rounded-xl p-3.5 shadow-lg shadow-rose-500/20 flex flex-col justify-between hover:brightness-105 transition-all cursor-pointer relative overflow-hidden group ring-2 ring-red-400/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-white animate-pulse">
              local_fire_department
            </span>
            <span className="text-[11px] text-white font-extrabold tracking-wider uppercase">긴급 차단</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black/25 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span className="text-[10px] text-white font-bold">즉시 대응</span>
          </div>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <span className="font-mono-numeric text-[26px] font-extrabold text-white tracking-tight">
            03<span className="text-[14px] text-white/80 font-normal ml-0.5">기</span>
          </span>
          <span className="text-[11px] bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold backdrop-blur-xs">
            현장 출동 1건
          </span>
        </div>
        <div className="w-full bg-white/30 h-1.5 rounded-full mt-2.5 overflow-hidden">
          <div className="bg-white h-full rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
        </div>
      </div>
    </section>
  );
};
