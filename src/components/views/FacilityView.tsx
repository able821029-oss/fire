import React, { useState } from 'react';
import { EQUIPMENT_CATEGORIES } from '../../data/mockData';

export const FacilityView: React.FC = () => {
  const [selectedEqId, setSelectedEqId] = useState<string>('eq-temp');

  const selectedCategory =
    EQUIPMENT_CATEGORIES.find((c) => c.id === selectedEqId) || EQUIPMENT_CATEGORIES[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5] flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-bold text-[#171C20] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5736DD]">precision_manufacturing</span>
            <span>전국 소방 및 방재 설비 정밀 상태 진단</span>
          </h2>
          <p className="text-[12px] text-[#484555]">
            열화상 센서, 광전식 연기 감지기, PLC 차단기, AI CCTV, LTE 통신망 실시간 헬스체크
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#EAEEF3] px-3 py-1.5 rounded-lg">
          <span className="text-[12px] font-bold text-[#006687]">종합 설비 건전도: 95.8%</span>
        </div>
      </div>

      {/* Equipment category pills */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {EQUIPMENT_CATEGORIES.map((eq) => {
          const isSelected = selectedEqId === eq.id;
          return (
            <div
              key={eq.id}
              onClick={() => setSelectedEqId(eq.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-indigo-50/80 border-[#5736DD] shadow-sm ring-2 ring-indigo-200'
                  : 'bg-white border-[#E8EEF5] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-900 truncate">{eq.name.split(' ')[0]}</span>
                <span className="font-mono-numeric text-[13px] font-bold text-indigo-700">
                  {eq.normalPercentage}%
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden flex">
                {eq.breakdown.map((b, i) => (
                  <div key={i} className={`${b.color} h-full`} style={{ width: `${b.pct}%` }}></div>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 truncate">{eq.details}</div>
            </div>
          );
        })}
      </div>

      {/* Detailed Diagnostic Box */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8EEF5] flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-[16px] font-bold text-slate-900">{selectedCategory.name} 세부 상태</h3>
            <p className="text-[12px] text-slate-500">{selectedCategory.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
              정상 {selectedCategory.normalCount}기
            </span>
            {selectedCategory.cautionCount > 0 && (
              <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                주의 {selectedCategory.cautionCount}기
              </span>
            )}
            {selectedCategory.faultCount > 0 && (
              <span className="text-[11px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold">
                단선/장애 {selectedCategory.faultCount}기
              </span>
            )}
          </div>
        </div>

        {/* Live Device List Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { tag: '01', site: '한빛 B2 거점', status: 'critical', val: '86.4℃ (위험)', note: '차단 완료 / 질식소화포 대기' },
            { tag: '02', site: '센터 P2 주차동', status: 'caution', val: '응답 지연 (142ms)', note: '보조망 전환 진행중' },
            { tag: '03', site: '한빛 B1 완속', status: 'normal', val: '32.1℃ (정상)', note: '정상 주기 보고' },
            { tag: '04', site: '서부 환승센터', status: 'normal', val: '34.5℃ (정상)', note: '정상 주기 보고' },
            { tag: '05', site: '강남 센터', status: 'normal', val: '29.8℃ (정상)', note: '정상 주기 보고' },
            { tag: '06', site: '공영주차타워', status: 'normal', val: '31.4℃ (정상)', note: '내일 정기점검 예정' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-800">{item.site}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    item.status === 'critical'
                      ? 'bg-red-500 text-white animate-pulse'
                      : item.status === 'caution'
                      ? 'bg-amber-500 text-black'
                      : 'bg-emerald-500 text-white'
                  }`}
                >
                  {item.status === 'critical' ? '긴급 이상' : item.status === 'caution' ? '주의' : '정상'}
                </span>
              </div>
              <div className="my-2">
                <div className="font-mono-numeric text-[13px] font-extrabold text-slate-900">{item.val}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{item.note}</div>
              </div>
              <button className="w-full py-1 text-[11px] font-semibold bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-100 transition-colors">
                원격 진단 명령 전송
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
