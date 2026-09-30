import React from 'react';

export const ReportsView: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5] flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-bold text-[#171C20] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5736DD]">description</span>
            <span>전기차 화재 안전 및 관제 성과 보고서</span>
          </h2>
          <p className="text-[12px] text-[#484555]">
            골든타임 준수율, 사고 예방 분석, 설비 가동률 및 소방청 제출용 공인 리포트
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-3.5 py-1.5 bg-[#5736DD] text-white text-[12px] font-bold rounded-lg shadow-sm hover:bg-[#4418CC] transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">print</span>
          <span>보고서 인쇄 / PDF 저장</span>
        </button>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5]">
          <span className="text-[11px] font-bold text-slate-500">당월 화재 사전 차단율</span>
          <div className="font-mono-numeric text-[26px] font-bold text-emerald-600 mt-1">100.0%</div>
          <span className="text-[10px] text-slate-400">열폭주 2건 초기 진화 및 차폐 성공</span>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5]">
          <span className="text-[11px] font-bold text-slate-500">평균 경보 인지 시간</span>
          <div className="font-mono-numeric text-[26px] font-bold text-indigo-600 mt-1">48초</div>
          <span className="text-[10px] text-emerald-600 font-bold">법정 기준 180초 대비 73% 단축</span>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5]">
          <span className="text-[11px] font-bold text-slate-500">원격 전원 차단 신뢰도</span>
          <div className="font-mono-numeric text-[26px] font-bold text-slate-900 mt-1">99.8%</div>
          <span className="text-[10px] text-slate-400">PLC/MCCB 연동 시험 150회 기준</span>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5]">
          <span className="text-[11px] font-bold text-slate-500">소방청 119 데이터 전송 정합도</span>
          <div className="font-mono-numeric text-[26px] font-bold text-[#DB1660] mt-1">100%</div>
          <span className="text-[10px] text-slate-400">GPS 및 현장 화재제원 누락 없음</span>
        </div>
      </div>

      {/* Monthly Report Summary */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8EEF5] flex flex-col gap-4">
        <h3 className="text-[16px] font-bold text-slate-900">2026년 9월 종합 안전 진단 총평</h3>
        <div className="text-[13px] text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
          <p className="mb-2">
            <strong>1. 총괄 현황:</strong> 2026년 9월 당월 한빛타워 B2 거점 및 7개 거점에서 총 148기의 완·급속 충전 시설을 24시간 실시간 무인 모니터링하였습니다.
          </p>
          <p className="mb-2">
            <strong>2. 특이 사항 및 긴급 대응:</strong> 9월 30일 14:30경 한빛타워 B2 거점 충전기 07번 하부 배터리팩에서 86.4℃ 이상 열화상 감지 및 1차 광전식 연기 센서가 작동하여, 시스템에 의해 300ms 이내 MCCB 원격 트립이 성공적으로 이루어졌습니다.
          </p>
          <p>
            <strong>3. 결론 및 권고:</strong> 지하 2층 전기차 충전 구역의 질식소화포 대기 상태와 소방청 119 출동 연계 프로세스가 즉각 작동하여 인명 및 건물 시설 피해 없이 안전하게 통제되었습니다.
          </p>
        </div>
      </div>
    </div>
  );
};
