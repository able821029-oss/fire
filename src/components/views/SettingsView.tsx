import React, { useState } from 'react';

export const SettingsView: React.FC = () => {
  const [tempThreshold, setTempThreshold] = useState<number>(75.0);
  const [smokeSensitivity, setSmokeSensitivity] = useState<string>('high');
  const [autoTripEnabled, setAutoTripEnabled] = useState<boolean>(true);
  const [autoSirenEnabled, setAutoSirenEnabled] = useState<boolean>(true);
  const [pollingRate, setPollingRate] = useState<number>(500);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5] flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-bold text-[#171C20] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5736DD]">settings</span>
            <span>화재 방재 임계치 및 관제 시스템 설정</span>
          </h2>
          <p className="text-[12px] text-[#484555]">
            열화상 온도 임계치, MCCB 자동 트립 알고리즘, 소방청 119 API 연계 키 및 비상 방송 설정
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#5736DD] hover:bg-[#4418CC] text-white text-[12px] font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">save</span>
          <span>설정 저장</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-xl text-[12px] font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>관제 파라미터가 전체 8개 거점의 엣지 게이트웨이에 성공적으로 동기화되었습니다.</span>
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Thermal & Smoke Trigger */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8EEF5] flex flex-col gap-4">
          <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-red-600 text-[20px]">thermostat</span>
            <span>화재 감지 임계치 설정</span>
          </h3>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold text-slate-700 flex justify-between">
              <span>열화상 위험 경보 온도 (현재: {tempThreshold.toFixed(1)}℃)</span>
              <span className="text-[#DB1660] font-mono-numeric">{tempThreshold.toFixed(1)}℃</span>
            </label>
            <input
              type="range"
              min="50"
              max="90"
              step="0.5"
              value={tempThreshold}
              onChange={(e) => setTempThreshold(parseFloat(e.target.value))}
              className="w-full accent-[#5736DD] cursor-pointer"
            />
            <span className="text-[10px] text-slate-400">
              * 전기차 리튬이온 배터리 권고 안전 상한: 75.0℃ (소방방재청 권고치)
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">광전식 연기 센서 민감도</label>
            <select
              value={smokeSensitivity}
              onChange={(e) => setSmokeSensitivity(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg p-2 text-[12px] text-slate-900"
            >
              <option value="high">고감도 (훈소 화재 초기 0.5%/m 감지)</option>
              <option value="medium">표준 (1.0%/m 감지)</option>
              <option value="low">저감도 (환기 불량 구역용 1.5%/m)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">센서 텔레메트리 폴링 주기</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={pollingRate}
                onChange={(e) => setPollingRate(parseInt(e.target.value) || 500)}
                className="bg-slate-50 border border-slate-300 rounded-lg p-2 text-[12px] text-slate-900 w-28 font-mono-numeric"
              />
              <span className="text-[12px] text-slate-500">ms (밀리초)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Auto Actuation Rules */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E8EEF5] flex flex-col gap-4">
          <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-[20px]">smart_toy</span>
            <span>자동 비상 조치(Fail-Safe) 규칙</span>
          </h3>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="text-[13px] font-bold text-slate-900">MCCB 전원 자동 차단</div>
              <div className="text-[11px] text-slate-500">임계치 초과 3초 지속 시 원격 즉시 트립</div>
            </div>
            <input
              type="checkbox"
              checked={autoTripEnabled}
              onChange={() => setAutoTripEnabled(!autoTripEnabled)}
              className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="text-[13px] font-bold text-slate-900">피난 비상방송 자동 송출</div>
              <div className="text-[11px] text-slate-500">2단계 연기 및 열화상 동시 트리거 시 사이렌</div>
            </div>
            <input
              type="checkbox"
              checked={autoSirenEnabled}
              onChange={() => setAutoSirenEnabled(!autoSirenEnabled)}
              className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex flex-col gap-1 text-[11px]">
            <span className="font-bold text-red-900">소방청 119 API 연계망 상태</span>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              정상 연결 (API v2.4 TLS 1.3 암호화 활성)
            </div>
            <span className="text-slate-500">서버 주소: nfa-api.safety.go.kr / 토큰 인증 완료</span>
          </div>
        </div>
      </div>
    </div>
  );
};
