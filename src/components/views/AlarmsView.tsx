import React, { useState } from 'react';
import { Incident } from '../../types';

interface AlarmsViewProps {
  incidents: Incident[];
  onAcknowledge: (id: string) => void;
  onOpen119: () => void;
}

export const AlarmsView: React.FC<AlarmsViewProps> = ({ incidents, onAcknowledge, onOpen119 }) => {
  const [search, setSearch] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const allLogs = [
    ...incidents,
    {
      id: 'hist-01',
      level: 'normal' as any,
      levelLabel: '해제 완료',
      siteId: 'hanbit-b1',
      siteName: '한빛 B1',
      timeAgo: '3시간 전',
      timestamp: '11:20:10',
      title: '충전기 02번 일시적 온도 상승 후 정상화',
      description: '단순 과부하 차단 후 안전 확인 완료',
      manager: '김안전 대리',
      managerStatus: '조치 완료',
      actionsDone: ['현장 육안 확인', '차단기 복귀'],
      powerCut: false,
      confirmed: true,
    },
    {
      id: 'hist-02',
      level: 'maintenance' as any,
      levelLabel: '정기 점검',
      siteId: 'seobu-transit',
      siteName: '서부 환승센터',
      timeAgo: '5시간 전',
      timestamp: '09:15:00',
      title: '스프링클러 유수검지장치 압력 시험',
      description: '정기 분기 시험 정상 통과',
      manager: '정운영 과장',
      managerStatus: '기록 저장',
      actionsDone: ['압력 0.85MPa 기록'],
      powerCut: false,
      confirmed: true,
    },
  ];

  const filtered = allLogs.filter((log) => {
    const matchSearch =
      log.siteName.toLowerCase().includes(search.toLowerCase()) ||
      log.title.toLowerCase().includes(search.toLowerCase()) ||
      log.manager.toLowerCase().includes(search.toLowerCase());
    const matchLevel = filterLevel === 'all' || log.level === filterLevel;
    return matchSearch && matchLevel;
  });

  const exportCSV = () => {
    const headers = 'ID,거점명,경보등급,발생시각,제목,담당자,확인상태\n';
    const rows = filtered
      .map(
        (r) =>
          `"${r.id}","${r.siteName}","${r.levelLabel}","${r.timestamp}","${r.title}","${r.manager}","${
            r.confirmed ? '완료' : '미확인'
          }"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `EV-FIREGUARD-Alarms-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5] flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-bold text-[#171C20] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#DB1660]">warning</span>
            <span>화재 및 센서 경보·이벤트 통합 이력</span>
          </h2>
          <p className="text-[12px] text-[#484555]">
            전국 거점 실시간 발생 경보 로그, 조치 이력 및 소방청 연계 발령 내역
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[12px] font-bold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>CSV 내보내기</span>
          </button>
          <button
            onClick={onOpen119}
            className="px-3.5 py-1.5 bg-[#DB1660] hover:bg-[#B1004A] text-white text-[12px] font-bold rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">e911_emergency</span>
            <span>119 긴급 신고</span>
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-xl p-3 shadow-sm border border-[#E8EEF5] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="거점명, 제목, 담당자 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#F0F4F9] border border-[#DFE3E8] rounded-lg px-3 py-1.5 pl-8 text-[12px] text-slate-900 focus:outline-none w-64"
            />
            <span className="material-symbols-outlined absolute left-2 top-2 text-slate-400 text-[16px]">
              search
            </span>
          </div>

          <div className="inline-flex p-0.5 bg-[#EAEEF3] rounded-lg text-[11px] font-bold">
            <button
              onClick={() => setFilterLevel('all')}
              className={`px-2.5 py-1 rounded ${filterLevel === 'all' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}
            >
              전체
            </button>
            <button
              onClick={() => setFilterLevel('critical')}
              className={`px-2.5 py-1 rounded ${filterLevel === 'critical' ? 'bg-white shadow-xs text-red-600' : 'text-slate-600'}`}
            >
              긴급
            </button>
            <button
              onClick={() => setFilterLevel('caution')}
              className={`px-2.5 py-1 rounded ${filterLevel === 'caution' ? 'bg-white shadow-xs text-amber-600' : 'text-slate-600'}`}
            >
              주의
            </button>
            <button
              onClick={() => setFilterLevel('maintenance')}
              className={`px-2.5 py-1 rounded ${filterLevel === 'maintenance' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-600'}`}
            >
              점검
            </button>
          </div>
        </div>

        <span className="text-[12px] text-slate-500 font-mono-numeric">
          총 <strong className="text-slate-800">{filtered.length}</strong>건의 이벤트 조회됨
        </span>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8EEF5] overflow-hidden">
        <table className="w-full text-left text-[12px]">
          <thead className="bg-[#F8FAFC] border-b border-[#E8EEF5] text-slate-500 font-bold uppercase text-[10px]">
            <tr>
              <th className="py-3 px-4">등급</th>
              <th className="py-3 px-4">발생 거점</th>
              <th className="py-3 px-4">경보 내용</th>
              <th className="py-3 px-4">발생 시각</th>
              <th className="py-3 px-4">지정 담당자</th>
              <th className="py-3 px-4">조치 상태</th>
              <th className="py-3 px-4 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.level === 'critical'
                        ? 'bg-red-100 text-red-700 font-extrabold animate-pulse'
                        : log.level === 'caution'
                        ? 'bg-amber-100 text-amber-800'
                        : log.level === 'maintenance'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {log.levelLabel}
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-slate-900">{log.siteName}</td>
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-800">{log.title}</div>
                  <div className="text-[11px] text-slate-500">{log.description}</div>
                </td>
                <td className="py-3 px-4 font-mono-numeric text-slate-600">
                  {log.timestamp} <span className="text-[10px] text-slate-400">({log.timeAgo})</span>
                </td>
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-800">{log.manager}</div>
                  <div className="text-[10px] text-slate-400">{log.managerStatus}</div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      log.confirmed ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {log.confirmed ? '✓ 조치/확인' : '미확인 (대응중)'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  {!log.confirmed ? (
                    <button
                      onClick={() => onAcknowledge(log.id)}
                      className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-[11px] font-bold"
                    >
                      확인
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400">완료됨</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
