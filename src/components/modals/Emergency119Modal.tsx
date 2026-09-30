import React, { useState } from 'react';
import { Site } from '../../types';

interface Emergency119ModalProps {
  site: Site | null;
  onClose: () => void;
}

export const Emergency119Modal: React.FC<Emergency119ModalProps> = ({ site, onClose }) => {
  const [transmitted, setTransmitted] = useState<boolean>(false);
  const [dispatchCaseId, setDispatchCaseId] = useState<string>('');
  const [etaSeconds, setEtaSeconds] = useState<number>(270); // 4분 30초

  const targetSite = site || {
    name: '한빛 B2 거점',
    subLocation: '지하 2층 4구역',
    address: '서울특별시 강남구 테헤란로 152 한빛타워',
    gps: { lat: 37.5002, lng: 127.0365 },
    currentTemp: 86.4,
    chargersTotal: 28,
    assignedManager: '박현장 책임',
    managerPhone: '010-4829-1923',
  };

  const handleTransmit = () => {
    setTransmitted(true);
    setDispatchCaseId(`119-EV-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-red-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#DB1660] to-[#90003A] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">e911_emergency</span>
            <div>
              <h3 className="text-[17px] font-extrabold tracking-tight">소방청 119 연계 긴급 재난 신고망</h3>
              <p className="text-white/80 text-[11px]">국가 소방안전 통합 플랫폼 표준 연계 프로토콜</p>
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
        <div className="p-5 flex flex-col gap-4">
          {!transmitted ? (
            <>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-3">
                <span className="material-symbols-outlined text-[#DB1660] text-[22px] shrink-0 mt-0.5">
                  warning
                </span>
                <div className="text-[12px] text-red-950 leading-relaxed">
                  <strong className="text-[#B1004A]">긴급 출동 자동 신고 데이터</strong>가 센서 텔레메트리로부터 자동 생성되었습니다. 전송 즉시 관할 소방서 지령실로 직결 전달됩니다.
                </div>
              </div>

              {/* Form Details */}
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div className="bg-[#F0F4F9] p-2.5 rounded-lg col-span-2">
                  <span className="text-[10px] font-bold text-[#484555]">발생 위치 및 상세 구역</span>
                  <div className="text-[13px] font-bold text-[#171C20] mt-0.5">
                    {targetSite.name} ({targetSite.subLocation})
                  </div>
                  <div className="text-[11px] text-[#484555] mt-0.5">{targetSite.address}</div>
                </div>

                <div className="bg-[#F0F4F9] p-2.5 rounded-lg">
                  <span className="text-[10px] font-bold text-[#484555]">GPS 좌표 (정밀 위치)</span>
                  <div className="font-mono-numeric text-[12px] font-bold text-[#171C20] mt-0.5">
                    {targetSite.gps.lat.toFixed(4)}N, {targetSite.gps.lng.toFixed(4)}E
                  </div>
                </div>

                <div className="bg-[#F0F4F9] p-2.5 rounded-lg">
                  <span className="text-[10px] font-bold text-[#484555]">배터리팩 센서 온도</span>
                  <div className="font-mono-numeric text-[13px] font-extrabold text-[#DB1660] mt-0.5">
                    {targetSite.currentTemp.toFixed(1)}℃ (열폭주 징후)
                  </div>
                </div>

                <div className="bg-[#F0F4F9] p-2.5 rounded-lg">
                  <span className="text-[10px] font-bold text-[#484555]">현장 안전 책임자</span>
                  <div className="text-[12px] font-bold text-[#171C20] mt-0.5">
                    {targetSite.assignedManager} ({targetSite.managerPhone})
                  </div>
                </div>

                <div className="bg-[#F0F4F9] p-2.5 rounded-lg">
                  <span className="text-[10px] font-bold text-[#484555]">소방 출동 추천 장비</span>
                  <div className="text-[11px] font-bold text-[#006687] mt-0.5">
                    화학소방차 + 이동형 소화수조
                  </div>
                </div>

                <div className="bg-[#F0F4F9] p-2.5 rounded-lg col-span-2">
                  <span className="text-[10px] font-bold text-[#484555]">소방 진입로 현장 자동 조치</span>
                  <div className="text-[11px] text-[#171C20] mt-0.5">
                    ✓ 테헤란로 서문 지하 전용 램프 게이트 원격 개방 완료<br />
                    ✓ 비상 방화 셔터 1단계 하강 및 대피 유도등 100% 점등
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[12px] font-bold rounded-lg transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleTransmit}
                  className="px-5 py-2.5 bg-[#DB1660] hover:bg-[#B1004A] text-white text-[13px] font-extrabold rounded-lg shadow-lg flex items-center gap-2 transition-all animate-pulse"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>소방청 119 긴급 지령망 전송</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <h4 className="text-[18px] font-extrabold text-slate-900">
                소방청 119 접수 완료 및 출동 지령 발령
              </h4>
              <p className="text-[12px] text-slate-600 max-w-sm">
                사건번호 <strong className="font-mono-numeric text-[#5736DD]">{dispatchCaseId}</strong>로 관할 강남소방서 현장대응단에 전송 완료되었습니다.
              </p>

              <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 my-2 flex items-center justify-around">
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-500">예상 도착 시간 (ETA)</span>
                  <span className="font-mono-numeric text-[20px] font-bold text-slate-900">
                    약 4분 30초
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-500">출동 지령 관할</span>
                  <span className="text-[14px] font-bold text-slate-900">강남소방서 역삼119안전센터</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-2 px-6 py-2 bg-slate-900 hover:bg-black text-white text-[13px] font-bold rounded-lg transition-colors"
              >
                관제 화면으로 복귀
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
