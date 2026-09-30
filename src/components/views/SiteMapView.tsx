import React, { useState } from 'react';
import { Site } from '../../types';

interface SiteMapViewProps {
  sites: Site[];
  onSelectSite: (site: Site) => void;
  onOpenEmergency: (site: Site) => void;
}

export const SiteMapView: React.FC<SiteMapViewProps> = ({ sites, onSelectSite, onOpenEmergency }) => {
  const [selectedFloor, setSelectedFloor] = useState<'B1' | 'B2' | 'B3'>('B2');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('hanbit-b2');

  const currentSite = sites.find((s) => s.id === selectedSiteId) || sites[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5] flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-bold text-[#171C20] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5736DD]">map</span>
            <span>전국 현장 상세 지도 및 층별 도면 관제</span>
          </h2>
          <p className="text-[12px] text-[#484555]">
            거점 사업소별 충전기 베이 배치도, 방화 셔터 위치, 질식소화포 레일 및 센서 좌표
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Site Selector */}
          <select
            value={selectedSiteId}
            onChange={(e) => setSelectedSiteId(e.target.value)}
            className="bg-[#F0F4F9] border border-[#DFE3E8] rounded-lg px-3 py-1.5 text-[13px] font-bold text-[#171C20] focus:outline-none"
          >
            {sites.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.status === 'critical' ? '긴급 경보' : s.status === 'caution' ? '주의' : '정상'})
              </option>
            ))}
          </select>

          {/* Floor selector */}
          <div className="inline-flex p-0.5 bg-[#EAEEF3] rounded-lg">
            {(['B1', 'B2', 'B3'] as const).map((floor) => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`px-3 py-1 rounded text-[12px] font-bold transition-all ${
                  selectedFloor === floor
                    ? 'bg-[#5736DD] text-white shadow-xs'
                    : 'text-[#484555] hover:text-[#171C20]'
                }`}
              >
                지하 {floor}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Blueprint & Bay Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Interactive Floor Blueprint (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-slate-900">
                {currentSite.name} - 지하 {selectedFloor} 충전 베이 도면
              </span>
              {currentSite.status === 'critical' && selectedFloor === 'B2' && (
                <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                  배터리팩 이상 발열 감지구역 (07번)
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 font-mono-numeric">도면 축척 1:150 CAD Ver 2.4</span>
          </div>

          {/* Blueprint Canvas */}
          <div className="relative w-full h-[480px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 p-4">
            {/* Grid CAD overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            ></div>

            {/* Architecture Outline */}
            <svg className="absolute inset-0 w-full h-full text-indigo-500/40 pointer-events-none" fill="none">
              {/* Outer boundary */}
              <rect x="20" y="20" width="94%" height="90%" stroke="currentColor" strokeWidth="2" />
              {/* Pillar grid */}
              <circle cx="120" cy="100" r="8" fill="rgba(255,255,255,0.1)" stroke="currentColor" />
              <circle cx="280" cy="100" r="8" fill="rgba(255,255,255,0.1)" stroke="currentColor" />
              <circle cx="440" cy="100" r="8" fill="rgba(255,255,255,0.1)" stroke="currentColor" />
              <circle cx="120" cy="240" r="8" fill="rgba(255,255,255,0.1)" stroke="currentColor" />
              <circle cx="280" cy="240" r="8" fill="rgba(255,255,255,0.1)" stroke="currentColor" />
              <circle cx="440" cy="240" r="8" fill="rgba(255,255,255,0.1)" stroke="currentColor" />
              <circle cx="120" cy="380" r="8" fill="rgba(255,255,255,0.1)" stroke="currentColor" />
              <circle cx="280" cy="380" r="8" fill="rgba(255,255,255,0.1)" stroke="currentColor" />
              <circle cx="440" cy="380" r="8" fill="rgba(255,255,255,0.1)" stroke="currentColor" />
              {/* Ramp Entry text */}
              <text x="35" y="440" fill="#94a3b8" fontSize="12" fontWeight="bold">소방 진입 램프 (WEST GATE)</text>
              <line x1="20" y1="420" x2="160" y2="420" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            {/* Charging bays */}
            <div className="absolute top-12 left-12 right-12 grid grid-cols-4 gap-3 z-10">
              {[
                { bay: '01', type: '급속 100kW', status: 'normal', car: 'GV60 (충전완료)' },
                { bay: '02', type: '급속 100kW', status: 'normal', car: '아이오닉5 (충전중)' },
                { bay: '03', type: '완속 7kW', status: 'normal', car: 'EV6 (충전중)' },
                { bay: '04', type: '완속 7kW', status: 'normal', car: '빈 자리 (대기)' },
                { bay: '05', type: '완속 7kW', status: 'normal', car: '테슬라 모델Y' },
                { bay: '06', type: '완속 7kW', status: 'normal', car: '니로 EV' },
                {
                  bay: '07',
                  type: '급속 200kW',
                  status: selectedFloor === 'B2' && currentSite.id === 'hanbit-b2' ? 'critical' : 'normal',
                  car: 'EV 차량 이상발열 (86.4℃)',
                },
                { bay: '08', type: '완속 7kW', status: 'caution', car: '점검 대기' },
              ].map((b) => (
                <div
                  key={b.bay}
                  className={`p-3 rounded-lg border flex flex-col justify-between transition-all ${
                    b.status === 'critical'
                      ? 'bg-red-950/80 border-red-500 shadow-lg shadow-red-500/40 ring-2 ring-red-400 animate-pulse'
                      : b.status === 'caution'
                      ? 'bg-amber-950/60 border-amber-500'
                      : 'bg-slate-900/80 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-numeric text-[13px] font-bold text-white">
                      BAY #{b.bay}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        b.status === 'critical'
                          ? 'bg-red-500 text-white'
                          : b.status === 'caution'
                          ? 'bg-amber-500 text-black'
                          : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {b.status === 'critical' ? '열폭주 경보' : b.status === 'caution' ? '통신 점검' : '정상'}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="text-[10px] text-slate-400">{b.type}</div>
                    <div
                      className={`text-[11px] font-bold mt-0.5 truncate ${
                        b.status === 'critical' ? 'text-red-400' : 'text-slate-200'
                      }`}
                    >
                      {b.car}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Status bar inside map */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md rounded-lg p-2.5 border border-slate-700 flex items-center justify-between text-[11px] text-slate-300">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> 07번 하부 소화포 대기
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span> 방화셔터 1~4번 정상
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 스프링클러 배관 0.82MPa
                </span>
              </div>
              {currentSite.status === 'critical' && (
                <button
                  onClick={() => onOpenEmergency(currentSite)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded font-bold transition-colors"
                >
                  07번 원격 제어
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Site Details and Safety Assets (1 Col) */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5] flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <h3 className="text-[15px] font-bold text-slate-900">현장 방재 설비 현황</h3>

            <div className="bg-[#F0F4F9] p-3 rounded-lg flex flex-col gap-1">
              <span className="text-[10px] font-bold text-[#484555]">거점 상세 위치</span>
              <span className="text-[13px] font-bold text-slate-900">{currentSite.address}</span>
              <span className="text-[11px] text-slate-500">
                지하 {selectedFloor}층 전기차 전용 구역 ({currentSite.chargersTotal}기 수용)
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-600 text-[18px]">layers</span>
                  <div>
                    <div className="text-[12px] font-bold text-slate-900">천장형 자동 질식소화포</div>
                    <div className="text-[10px] text-slate-500">베이 01~08 상부 레일형</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  정상 대기
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-[18px]">water_drop</span>
                  <div>
                    <div className="text-[12px] font-bold text-slate-900">하부 수조 및 주수 배관</div>
                    <div className="text-[10px] text-slate-500">배터리팩 하부 3방향 노즐</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  0.82 MPa
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-600 text-[18px]">air</span>
                  <div>
                    <div className="text-[12px] font-bold text-slate-900">제연설비 & 배연팬</div>
                    <div className="text-[10px] text-slate-500">시간당 12,000 m³ 배기능력</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  연동 준비
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-600 text-[18px]">power</span>
                  <div>
                    <div className="text-[12px] font-bold text-slate-900">원격 전원 차단기(MCCB)</div>
                    <div className="text-[10px] text-slate-500">PLC 연동 300ms 내 트립</div>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    currentSite.breakerStatus === '자동 트립 완료'
                      ? 'text-red-700 bg-red-100'
                      : 'text-emerald-700 bg-emerald-100'
                  }`}
                >
                  {currentSite.breakerStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <button
              onClick={() => onOpenEmergency(currentSite)}
              className="w-full py-2.5 bg-[#5736DD] hover:bg-[#4418CC] text-white text-[12px] font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">settings_remote</span>
              <span>해당 거점 원격 제어판 열기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
