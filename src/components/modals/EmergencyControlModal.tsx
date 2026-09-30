import React, { useState } from 'react';
import { Site } from '../../types';

interface EmergencyControlModalProps {
  site: Site;
  onClose: () => void;
  onOpen119: () => void;
  onUpdateSite: (updated: Site) => void;
}

export const EmergencyControlModal: React.FC<EmergencyControlModalProps> = ({
  site,
  onClose,
  onOpen119,
  onUpdateSite,
}) => {
  const [breakerTripped, setBreakerTripped] = useState<boolean>(site.breakerStatus === '자동 트립 완료');
  const [blanketDeployed, setBlanketDeployed] = useState<boolean>(false);
  const [ventilationHigh, setVentilationHigh] = useState<boolean>(site.ventilationActive);
  const [delugeValveReady, setDelugeValveReady] = useState<boolean>(site.sprinklerReady);
  const [broadcastActive, setBroadcastActive] = useState<boolean>(false);
  const [simulatedTemp, setSimulatedTemp] = useState<number>(site.currentTemp);

  const toggleBreaker = () => {
    const next = !breakerTripped;
    setBreakerTripped(next);
    onUpdateSite({
      ...site,
      breakerStatus: next ? '자동 트립 완료' : '정상 가동',
    });
  };

  const toggleBlanket = () => {
    setBlanketDeployed((prev) => !prev);
    if (!blanketDeployed) {
      // temperature drops slightly
      setSimulatedTemp((prev) => Math.max(68, +(prev - 5.2).toFixed(1)));
    }
  };

  const toggleVentilation = () => {
    const next = !ventilationHigh;
    setVentilationHigh(next);
    onUpdateSite({ ...site, ventilationActive: next });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#DB1660] to-[#B1004A] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[22px]">emergency</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[17px] font-extrabold tracking-tight">원격 비상 제어 및 상세 관제</h3>
                <span className="bg-black/30 px-2 py-0.5 rounded text-[11px] font-bold">긴급 1등급</span>
              </div>
              <p className="text-white/85 text-[12px]">{site.name} ({site.subLocation}) · {site.address}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex flex-col gap-4 text-slate-800">
          {/* Top Real-time Telemetry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Thermal Sensor Box */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-red-800">열화상 측정 온도</span>
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              </div>
              <div className="flex items-baseline gap-1 my-1">
                <span className="font-mono-numeric text-[32px] font-extrabold text-[#DB1660]">
                  {simulatedTemp.toFixed(1)}
                </span>
                <span className="text-[16px] font-bold text-[#DB1660]">℃</span>
                <span className="text-[11px] font-semibold text-red-700 ml-auto bg-red-200/60 px-2 py-0.5 rounded">
                  임계치 75℃ 초과
                </span>
              </div>
              <span className="text-[11px] text-slate-500">감지 위치: 충전기 07번 배터리팩 하부</span>
            </div>

            {/* Smoke & Gas Sensor Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-800">연기·가스 농도</span>
                <span className="text-[11px] font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
                  광전식 2단계
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-1">
                <span className="font-mono-numeric text-[32px] font-extrabold text-amber-900">420</span>
                <span className="text-[14px] font-bold text-amber-800">ppm</span>
                <span className="text-[11px] font-semibold text-amber-800 ml-auto bg-amber-200/60 px-2 py-0.5 rounded">
                  경보 레벨 2
                </span>
              </div>
              <span className="text-[11px] text-slate-500">배연 댐퍼 연동 배출 중</span>
            </div>

            {/* Fire Suppression Pipe Pressure */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-800">소화 배관 가압 압력</span>
                <span className="text-[11px] font-bold bg-blue-200 text-blue-900 px-1.5 py-0.5 rounded">
                  정상 유지
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-1">
                <span className="font-mono-numeric text-[32px] font-extrabold text-blue-900">0.82</span>
                <span className="text-[14px] font-bold text-blue-800">MPa</span>
                <span className="text-[11px] font-semibold text-blue-800 ml-auto bg-blue-200/60 px-2 py-0.5 rounded">
                  기준: 0.7~0.9
                </span>
              </div>
              <span className="text-[11px] text-slate-500">충전 구역 전용 하부 노즐 가압완료</span>
            </div>
          </div>

          {/* Thermal Camera Simulation Graphic */}
          <div className="bg-slate-900 rounded-xl p-4 text-white flex flex-col gap-2 relative overflow-hidden border border-slate-700">
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-[12px] font-bold">열화상 실시간 스트리밍 - CAM-04 (지하 2층 4구역)</span>
              </div>
              <span className="font-mono-numeric text-[11px] text-slate-300">FPS: 30 · AI HEAT-MAP ON</span>
            </div>

            {/* Visual Heatmap Box */}
            <div className="relative w-full h-[150px] bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center border border-slate-800">
              {/* Gridlines */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              ></div>

              {/* Vehicle Silhouette and Hotspot */}
              <div className="relative z-10 flex flex-col items-center">
                {/* EV Car outline */}
                <svg className="w-48 h-20 text-slate-600" fill="currentColor" viewBox="0 0 100 50">
                  <path d="M 10 35 L 20 20 L 45 15 L 75 15 L 90 28 L 95 38 L 85 38 C 85 43, 75 43, 75 38 L 30 38 C 30 43, 20 43, 20 38 L 10 38 Z" opacity="0.4" />
                </svg>

                {/* Hotspot Radial Heat */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full pointer-events-none animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(235,40,90,0.85) 0%, rgba(255,140,0,0.6) 45%, rgba(255,220,0,0.2) 70%, transparent 100%)',
                    filter: 'blur(8px)',
                  }}
                ></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <span className="font-mono-numeric text-[14px] font-extrabold text-white bg-black/60 px-2 py-0.5 rounded shadow">
                    MAX {simulatedTemp.toFixed(1)}℃
                  </span>
                  <span className="text-[10px] text-yellow-300 font-bold drop-shadow">배터리 하부 팩 #07</span>
                </div>
              </div>

              {/* Thermal Scale Bar on Right */}
              <div className="absolute right-3 top-3 bottom-3 w-4 rounded overflow-hidden flex flex-col border border-white/20">
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-orange-500"></div>
                <div className="flex-1 bg-yellow-400"></div>
                <div className="flex-1 bg-green-500"></div>
                <div className="flex-1 bg-blue-600"></div>
              </div>
            </div>
          </div>

          {/* Interactive Remote Actuators */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[14px] font-bold text-slate-900">원격 비상 조치 액추에이터 제어</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* 1. MCCB Power Breaker */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-red-600">power_settings_new</span>
                    <span className="text-[13px] font-bold text-slate-900">MCCB 메인 차단기</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {breakerTripped ? '전원 차폐 완료 (안전)' : '현재 전원 공급중 (위험)'}
                  </span>
                </div>
                <button
                  onClick={toggleBreaker}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all shadow-xs ${
                    breakerTripped
                      ? 'bg-slate-800 text-white hover:bg-slate-700'
                      : 'bg-red-600 text-white hover:bg-red-700 animate-pulse'
                  }`}
                >
                  {breakerTripped ? '재공급 대기' : '원격 즉시 차단'}
                </button>
              </div>

              {/* 2. Automated Fire Blanket */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-orange-600">layers</span>
                    <span className="text-[13px] font-bold text-slate-900">천장형 질식소화포</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {blanketDeployed ? '질식소화포 투하 및 밀폐 완료' : '투하 레일 대기 상태'}
                  </span>
                </div>
                <button
                  onClick={toggleBlanket}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all shadow-xs ${
                    blanketDeployed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  {blanketDeployed ? '전개 완료됨' : '원격 자동 전개'}
                </button>
              </div>

              {/* 3. Forced Ventilation */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-blue-600">air</span>
                    <span className="text-[13px] font-bold text-slate-900">지하 배연 환기팬</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {ventilationHigh ? '100% 강제 배기 모드 가동중' : '일반 순환 모드 (50%)'}
                  </span>
                </div>
                <button
                  onClick={toggleVentilation}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all shadow-xs ${
                    ventilationHigh
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {ventilationHigh ? '배기 가동중' : '100% 강제 가동'}
                </button>
              </div>

              {/* 4. Siren & Evacuation Broadcast */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-purple-600">campaign</span>
                    <span className="text-[13px] font-bold text-slate-900">피난 사이렌 & 비상방송</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {broadcastActive ? '지하 1~3층 경보 방송 송출중' : '대기 상태'}
                  </span>
                </div>
                <button
                  onClick={() => setBroadcastActive(!broadcastActive)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all shadow-xs ${
                    broadcastActive
                      ? 'bg-purple-600 text-white animate-pulse'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {broadcastActive ? '방송 중지' : '비상방송 송출'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[12px] text-slate-500">
            현장 출동: <strong className="text-slate-800">{site.assignedManager}</strong> ({site.managerPhone})
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-[12px] font-bold rounded-lg transition-colors"
            >
              닫기
            </button>
            <button
              onClick={() => {
                onClose();
                onOpen119();
              }}
              className="px-4 py-2 bg-[#DB1660] hover:bg-[#B1004A] text-white text-[12px] font-extrabold rounded-lg shadow-md flex items-center gap-1.5 transition-colors animate-pulse"
            >
              <span className="material-symbols-outlined text-[16px]">e911_emergency</span>
              <span>소방청 119 즉시 연계 신고</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
