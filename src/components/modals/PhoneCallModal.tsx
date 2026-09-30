import React, { useState, useEffect } from 'react';
import { Incident } from '../../types';

interface PhoneCallModalProps {
  incident: Incident;
  onClose: () => void;
}

export const PhoneCallModal: React.FC<PhoneCallModalProps> = ({ incident, onClose }) => {
  const [callStatus, setCallStatus] = useState<'calling' | 'connected' | 'ended'>('calling');
  const [callSeconds, setCallSeconds] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCallStatus('connected');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: any;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatSec = (total: number) => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-slate-900 rounded-3xl max-w-sm w-full p-6 text-white shadow-2xl border border-slate-700 flex flex-col items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-3xl font-extrabold text-indigo-400 mt-2 shadow-inner">
          {incident.manager[0]}
        </div>

        <div className="text-center">
          <h3 className="text-[18px] font-bold">{incident.manager}</h3>
          <p className="text-[12px] text-slate-400 mt-0.5">{incident.siteName} 안전책임</p>
          <p className="text-[11px] text-indigo-400 mt-1">
            {callStatus === 'calling'
              ? '연결 시도 중...'
              : callStatus === 'connected'
              ? `통화 중 (${formatSec(callSeconds)})`
              : '통화 종료'}
          </p>
        </div>

        {callStatus === 'connected' && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-[12px] text-slate-300 w-full leading-relaxed">
            <span className="text-emerald-400 font-bold">박현장:</span> &ldquo;네, 상황실 보고 받았습니다! 지하 2층 4구역 현장 도착 30초 전이며 질식소화포 투하 위치 확인 중입니다. 119 신고 준비 부탁드립니다!&rdquo;
          </div>
        )}

        <div className="flex items-center gap-6 mt-2">
          <button
            onClick={() => {
              setCallStatus('ended');
              setTimeout(onClose, 500);
            }}
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            title="통화 종료"
          >
            <span className="material-symbols-outlined text-[28px]">call_end</span>
          </button>
        </div>
      </div>
    </div>
  );
};
