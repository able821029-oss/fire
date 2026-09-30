import React, { useState } from 'react';
import { SOP_STEPS } from '../../data/mockData';

interface SOPModalProps {
  onClose: () => void;
}

export const SOPModal: React.FC<SOPModalProps> = ({ onClose }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    '0-0': true,
    '0-1': true,
    '0-2': true,
    '1-0': true,
    '1-1': false,
    '1-2': true,
  });

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2C3135] to-[#171C20] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#FFD9DE]">menu_book</span>
            <div>
              <h3 className="text-[17px] font-bold tracking-tight">
                소방청 연계 표준 재난 대응 매뉴얼 (SOP)
              </h3>
              <p className="text-white/70 text-[11px]">전기차 충전시설 화재안전 성능기준(NFPC 605) 준수 절차</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex flex-col gap-4 text-slate-800">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-600 text-[20px]">timer</span>
            <div className="text-[12px] text-amber-900 leading-snug">
              <strong>화재 골든타임 5분 원칙</strong>: 전기차 배터리 열폭주는 초기 3~5분 내 전원 차폐 및 질식소화포 밀폐가 전소 확산 방지의 핵심입니다.
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {SOP_STEPS.map((step, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#5736DD] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                        {step.step}
                      </span>
                      <h4 className="text-[13px] font-bold text-slate-900">{step.title}</h4>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        step.status === '완료'
                          ? 'bg-emerald-100 text-emerald-800'
                          : step.status === '진행중'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 pl-1">
                    {step.actions.map((act, aIdx) => {
                      const key = `${idx}-${aIdx}`;
                      const isChecked = !!checkedItems[key];
                      return (
                        <label
                          key={aIdx}
                          className="flex items-start gap-2 text-[12px] text-slate-700 cursor-pointer hover:text-slate-950"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCheck(key)}
                            className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          />
                          <span className={isChecked ? 'line-through text-slate-400' : ''}>
                            {act}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">최근 개정: 2026년 3월 소방청 지침 준수</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-[12px] font-bold rounded-lg transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
