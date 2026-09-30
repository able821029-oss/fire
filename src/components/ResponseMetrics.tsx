import React from 'react';

interface ResponseMetricsProps {
  onOpenSOP: () => void;
  onOpenDispatch: () => void;
}

export const ResponseMetrics: React.FC<ResponseMetricsProps> = ({ onOpenSOP, onOpenDispatch }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-bold text-[#171C20]">오늘의 대응 지표</h2>
            <p className="text-[12px] text-[#484555] mt-0.5">관제 대응 골든타임 준수율 및 조치 속도</p>
          </div>
          <span className="material-symbols-outlined text-[#5736DD] text-[20px]">verified</span>
        </div>

        <div className="grid grid-cols-12 gap-3 mt-3.5 items-center">
          {/* Circular Compliance Meter */}
          <div className="col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <path
                  className="text-[#EAEEF3]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                {/* Progress Ring (86%) */}
                <path
                  className="text-[#006687]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="86, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-mono-numeric text-[19px] font-bold text-[#171C20]">86%</span>
                <span className="text-[10px] font-bold text-[#484555]">준수율</span>
              </div>
            </div>
            <span className="text-[10px] text-[#006687] font-bold mt-1 text-center">
              목표 85% 초과 달성
            </span>
          </div>

          {/* Key Supporting Metrics */}
          <div className="col-span-7 flex flex-col gap-1.5">
            <div className="bg-[#F0F4F9] p-2 rounded-lg flex items-center justify-between border border-slate-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#484555]">평균 확인 시간</span>
                <span className="font-mono-numeric text-[13px] font-bold text-[#171C20]">3분 12초</span>
              </div>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
                골든타임 이내
              </span>
            </div>

            <div className="bg-[#F0F4F9] p-2 rounded-lg flex items-center justify-between border border-slate-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#484555]">평균 현장 조치</span>
                <span className="font-mono-numeric text-[13px] font-bold text-[#171C20]">18분</span>
              </div>
              <span className="text-[10px] text-[#484555] bg-[#EAEEF3] px-1.5 py-0.5 rounded font-semibold">
                출동 기준
              </span>
            </div>

            <div
              onClick={onOpenDispatch}
              className="bg-[#F0F4F9] hover:bg-red-50 cursor-pointer p-2 rounded-lg flex items-center justify-between border border-slate-100 transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-[10px] text-[#DB1660] font-bold">미배정 업무</span>
                <span className="font-mono-numeric text-[13px] font-bold text-[#DB1660]">1건</span>
              </div>
              <span className="text-[10px] bg-[#DB1660] text-white px-1.5 py-0.5 rounded font-bold animate-pulse">
                즉시 배정 요망
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol SOP Trigger Button */}
      <button
        onClick={onOpenSOP}
        className="w-full mt-3 py-2.5 px-3 bg-[#2C3135] hover:bg-black text-white rounded-lg font-bold text-[12px] flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
        type="button"
      >
        <span className="material-symbols-outlined text-[16px] text-[#FFD9DE]">menu_book</span>
        <span>소방청 연계 표준 재난 대응 매뉴얼 (SOP)</span>
      </button>
    </div>
  );
};
