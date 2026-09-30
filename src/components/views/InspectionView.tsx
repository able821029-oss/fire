import React, { useState } from 'react';

export const InspectionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'schedule'>('checklist');

  const checklist = [
    { id: 1, item: '급속충전기 커넥터 및 케이블 절연 저항 측정 (기준: 5MΩ 이상)', status: '양호', checker: '이소방 주임', date: '2026-09-29' },
    { id: 2, item: '열화상 감시 카메라 렌즈 클리닝 및 광축 정렬 확인', status: '양호', checker: '박현장 책임', date: '2026-09-28' },
    { id: 3, item: '천장형 질식소화포 자동 투하 레일 기동 시험 (무부하 롤러 점검)', status: '양호', checker: '박현장 책임', date: '2026-09-25' },
    { id: 4, item: '하부 주수 소화배관 감압밸브 압력 게이지 점검 (0.8MPa)', status: '점검필요', checker: '이소방 주임', date: '2026-09-30' },
    { id: 5, item: 'PLC 원격 MCCB 트립 코일 동작 및 상태 피드백 핑 시험', status: '지연관측', checker: '정운영 과장', date: '2026-09-30' },
    { id: 6, item: '지하 주차장 배연 댐퍼 개폐 연동 및 급배기 팬 정격 풍량 측정', status: '양호', checker: '김안전 대리', date: '2026-09-27' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5] flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-bold text-[#171C20] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5736DD]">assignment_turned_in</span>
            <span>법정 정기 점검 및 유지보수 조치 대장</span>
          </h2>
          <p className="text-[12px] text-[#484555]">
            전기안전관리법 및 소방시설법에 의거한 분기/월간 법정 안전 점검 관리
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3.5 py-1.5 bg-[#5736DD] text-white text-[12px] font-bold rounded-lg shadow-sm hover:bg-[#4418CC] transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>새 점검 일지 등록</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
            activeTab === 'checklist' ? 'bg-[#5736DD] text-white' : 'bg-white text-slate-700 border'
          }`}
        >
          정기 점검 체크리스트
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
            activeTab === 'schedule' ? 'bg-[#5736DD] text-white' : 'bg-white text-slate-700 border'
          }`}
        >
          월간 점검 캘린더
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8EEF5] overflow-hidden">
        <table className="w-full text-left text-[12px]">
          <thead className="bg-[#F8FAFC] border-b border-[#E8EEF5] text-slate-500 font-bold uppercase text-[10px]">
            <tr>
              <th className="py-3 px-4">번호</th>
              <th className="py-3 px-4">법정 점검 항목</th>
              <th className="py-3 px-4">점검 결과</th>
              <th className="py-3 px-4">점검 책임자</th>
              <th className="py-3 px-4">최근 점검일</th>
              <th className="py-3 px-4 text-right">점검표 보기</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {checklist.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-mono-numeric text-slate-500">{c.id}</td>
                <td className="py-3 px-4 font-bold text-slate-900">{c.item}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.status === '양호'
                        ? 'bg-emerald-100 text-emerald-800'
                        : c.status === '점검필요'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-700">{c.checker}</td>
                <td className="py-3 px-4 font-mono-numeric text-slate-500">{c.date}</td>
                <td className="py-3 px-4 text-right">
                  <button className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-bold">
                    상세 서명 확인
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
