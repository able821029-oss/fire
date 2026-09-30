import React, { useState } from 'react';

interface TechnicianModalProps {
  onClose: () => void;
  onAssignSuccess: (techName: string) => void;
}

export const TechnicianModal: React.FC<TechnicianModalProps> = ({ onClose, onAssignSuccess }) => {
  const [selectedTech, setSelectedTech] = useState<string>('tech-1');

  const technicians = [
    {
      id: 'tech-1',
      name: '박현장 책임',
      role: '소방방재 전문기사 1급',
      phone: '010-4829-1923',
      location: '한빛타워 B2 (현장 상주)',
      status: '현장 긴급 출동중',
      eta: '즉시 (현장 위치)',
    },
    {
      id: 'tech-2',
      name: '이소방 주임',
      role: '전기안전관리자',
      phone: '010-7711-2098',
      location: '인천 권역 당직실',
      status: '출동 대기',
      eta: '도보 3분',
    },
    {
      id: 'tech-3',
      name: '정운영 과장',
      role: '기계설비유지관리자',
      phone: '010-5512-3401',
      location: '서부 환승센터 관제실',
      status: '출동 대기',
      eta: '차량 8분',
    },
    {
      id: 'tech-4',
      name: '김안전 대리',
      role: '소방안전관리자 2급',
      phone: '010-3342-9981',
      location: '본사 안전상황실',
      status: '원격 관제 지원',
      eta: '상황실 모니터링',
    },
  ];

  const handleAssign = () => {
    const tech = technicians.find((t) => t.id === selectedTech);
    if (tech) {
      onAssignSuccess(tech.name);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5736DD] to-[#7054F7] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">person_add</span>
            <div>
              <h3 className="text-[16px] font-bold">당직 안전관리자 긴급 배정</h3>
              <p className="text-white/80 text-[11px]">관할 거점 현장 인근 기술 인력 즉시 호출</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* List */}
        <div className="p-4 flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
          {technicians.map((tech) => (
            <div
              key={tech.id}
              onClick={() => setSelectedTech(tech.id)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedTech === tech.id
                  ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-200'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px] ${
                    selectedTech === tech.id ? 'bg-[#5736DD] text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tech.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[13px] text-slate-900">{tech.name}</span>
                    <span className="text-[11px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                      {tech.role}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {tech.location} · {tech.phone}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-indigo-700">{tech.eta}</span>
                <div className="text-[10px] text-slate-400">{tech.status}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-[12px] font-bold rounded-lg"
          >
            취소
          </button>
          <button
            onClick={handleAssign}
            className="px-5 py-2 bg-[#5736DD] hover:bg-[#4418CC] text-white text-[12px] font-bold rounded-lg shadow-md"
          >
            담당자 즉시 배정 및 비상호출
          </button>
        </div>
      </div>
    </div>
  );
};
