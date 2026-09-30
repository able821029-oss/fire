import React, { useState } from 'react';

interface SensorDiagnosticModalProps {
  onClose: () => void;
}

export const SensorDiagnosticModal: React.FC<SensorDiagnosticModalProps> = ({ onClose }) => {
  const [filterType, setFilterType] = useState<string>('all');

  const sensors = [
    { id: 'SN-TH-01', site: '한빛 B2', type: '열화상 센서', value: '86.4℃', status: 'critical', ping: '3.4ms', rssi: '-62dBm', battery: 'AC 상시' },
    { id: 'SN-SM-04', site: '한빛 B2', type: '광전식 연기', value: '420ppm', status: 'critical', ping: '4.1ms', rssi: '-58dBm', battery: '98%' },
    { id: 'SN-PL-02', site: '센터 P2', type: 'PLC 게이트웨이', value: '통신 지연', status: 'caution', ping: '142ms', rssi: '-89dBm', battery: 'AC 상시' },
    { id: 'SN-TH-12', site: '한빛 B1', type: '열화상 센서', value: '32.1℃', status: 'normal', ping: '4.0ms', rssi: '-54dBm', battery: 'AC 상시' },
    { id: 'SN-SM-18', site: '서부 환승', type: '광전식 연기', value: '정상 (0ppm)', status: 'normal', ping: '3.8ms', rssi: '-51dBm', battery: '100%' },
    { id: 'SN-CT-03', site: '강남 센터', type: '지능형 CCTV AI', value: '불꽃 미검출', status: 'normal', ping: '5.2ms', rssi: '-66dBm', battery: 'PoE 상시' },
    { id: 'SN-BR-08', site: '공영주차타워', type: 'MCCB 제어기', value: '정상 통전', status: 'normal', ping: '4.4ms', rssi: '-60dBm', battery: 'AC 상시' },
    { id: 'SN-TS-01', site: '테스트장', type: '온·습도 센서', value: '오프라인', status: 'offline', ping: 'TIMEOUT', rssi: '-99dBm', battery: '점검' },
  ];

  const filtered = filterType === 'all' ? sensors : sensors.filter((s) => s.status === filterType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#006687] to-[#004D66] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">network_check</span>
            <div>
              <h3 className="text-[17px] font-bold">전국 센서망 통신 및 수신 건전도 세부 진단</h3>
              <p className="text-white/80 text-[11px]">IIoT 센서 노드 150기 실시간 핑, 패킷 수신율, 전원 상태</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg text-[12px] font-bold ${
                filterType === 'all' ? 'bg-[#006687] text-white' : 'bg-white text-slate-700 border'
              }`}
            >
              전체 센서 ({sensors.length})
            </button>
            <button
              onClick={() => setFilterType('critical')}
              className={`px-3 py-1 rounded-lg text-[12px] font-bold ${
                filterType === 'critical' ? 'bg-red-600 text-white' : 'bg-white text-red-600 border'
              }`}
            >
              이상/위험 ({sensors.filter((s) => s.status === 'critical').length})
            </button>
            <button
              onClick={() => setFilterType('caution')}
              className={`px-3 py-1 rounded-lg text-[12px] font-bold ${
                filterType === 'caution' ? 'bg-amber-600 text-white' : 'bg-white text-amber-700 border'
              }`}
            >
              주의 ({sensors.filter((s) => s.status === 'caution').length})
            </button>
            <button
              onClick={() => setFilterType('normal')}
              className={`px-3 py-1 rounded-lg text-[12px] font-bold ${
                filterType === 'normal' ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-700 border'
              }`}
            >
              정상 ({sensors.filter((s) => s.status === 'normal').length})
            </button>
          </div>
          <span className="text-[11px] text-slate-500 font-mono-numeric">폴링 주기: 500ms · 지터: &lt;1.2ms</span>
        </div>

        {/* Table */}
        <div className="overflow-y-auto p-4">
          <table className="w-full text-[12px] text-left">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">센서 ID</th>
                <th className="py-2.5 px-3">설치 거점</th>
                <th className="py-2.5 px-3">센서 종류</th>
                <th className="py-2.5 px-3">현재 측정값</th>
                <th className="py-2.5 px-3">응답 핑</th>
                <th className="py-2.5 px-3">수신 강도</th>
                <th className="py-2.5 px-3">전원</th>
                <th className="py-2.5 px-3">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono-numeric font-bold text-slate-900">{s.id}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-800">{s.site}</td>
                  <td className="py-2.5 px-3 text-slate-600">{s.type}</td>
                  <td className="py-2.5 px-3 font-mono-numeric font-bold">
                    <span
                      className={
                        s.status === 'critical'
                          ? 'text-red-600'
                          : s.status === 'caution'
                          ? 'text-amber-700'
                          : 'text-slate-900'
                      }
                    >
                      {s.value}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono-numeric text-slate-600">{s.ping}</td>
                  <td className="py-2.5 px-3 font-mono-numeric text-slate-500">{s.rssi}</td>
                  <td className="py-2.5 px-3 text-slate-600">{s.battery}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.status === 'critical'
                          ? 'bg-red-100 text-red-700'
                          : s.status === 'caution'
                          ? 'bg-amber-100 text-amber-800'
                          : s.status === 'normal'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {s.status === 'critical'
                        ? '긴급 경보'
                        : s.status === 'caution'
                        ? '주의'
                        : s.status === 'normal'
                        ? '정상'
                        : '점검'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-[12px] font-bold rounded-lg"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
