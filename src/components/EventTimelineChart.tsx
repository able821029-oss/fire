import React, { useState } from 'react';
import { TimelineDataPoint } from '../types';
import { TIMELINE_24H } from '../data/mockData';

interface EventTimelineChartProps {
  onSelectHour?: (point: TimelineDataPoint) => void;
}

export const EventTimelineChart: React.FC<EventTimelineChartProps> = ({ onSelectHour }) => {
  const [viewMode, setViewMode] = useState<'24h' | '6h'>('24h');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(8); // default hover on peak (14:00)

  const activeData = viewMode === '24h' ? TIMELINE_24H : TIMELINE_24H.slice(-4);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8EEF5] flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-bold text-[#171C20]">24시간 이벤트 추이</h2>
            <p className="text-[12px] text-[#484555] mt-0.5">시간대별 이상 온도·통신 장애·조치 발생량</p>
          </div>
          <div className="inline-flex p-0.5 bg-[#EAEEF3] rounded-lg text-[10px]">
            <button
              onClick={() => setViewMode('24h')}
              className={`px-2 py-0.5 rounded font-bold transition-all ${
                viewMode === '24h'
                  ? 'bg-white text-[#171C20] shadow-xs'
                  : 'text-[#484555] hover:text-[#171C20]'
              }`}
              type="button"
            >
              24시간
            </button>
            <button
              onClick={() => setViewMode('6h')}
              className={`px-2 py-0.5 rounded font-bold transition-all ${
                viewMode === '6h'
                  ? 'bg-white text-[#171C20] shadow-xs'
                  : 'text-[#484555] hover:text-[#171C20]'
              }`}
              type="button"
            >
              6시간
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 mt-3 text-[11px] font-bold text-[#484555]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#DB1660]"></span>
            <span>온도 이상</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
            <span>통신 지연</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#7054F7]"></span>
            <span>점검/조치</span>
          </div>
        </div>

        {/* Telemetry SVG Bar Chart */}
        <div className="relative w-full h-[160px] mt-2 flex items-end">
          <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 320 130">
            {/* Gridlines */}
            <line x1="0" y1="20" x2="320" y2="20" stroke="#EAEEF3" strokeDasharray="3 3" strokeWidth="1" />
            <line x1="0" y1="60" x2="320" y2="60" stroke="#EAEEF3" strokeDasharray="3 3" strokeWidth="1" />
            <line x1="0" y1="100" x2="320" y2="100" stroke="#EAEEF3" strokeWidth="1" />

            {/* Bars */}
            {/* 00:00 (x=15) */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(0)}
              onClick={() => onSelectHour?.(TIMELINE_24H[0])}
            >
              <rect x="15" y="92" width="10" height="8" rx="2" fill="#7054F7" />
            </g>

            {/* 04:00 (x=55) */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(2)}
              onClick={() => onSelectHour?.(TIMELINE_24H[2])}
            >
              <rect x="55" y="86" width="10" height="14" rx="2" fill="#7054F7" />
            </g>

            {/* 06:00 (x=95) */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(3)}
              onClick={() => onSelectHour?.(TIMELINE_24H[3])}
            >
              <rect x="95" y="90" width="10" height="10" rx="2" fill="#F59E0B" />
            </g>

            {/* 08:00 (x=135) Peak Comm */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(4)}
              onClick={() => onSelectHour?.(TIMELINE_24H[4])}
            >
              <rect x="135" y="74" width="10" height="26" rx="2" fill="#F59E0B" />
              <rect x="135" y="62" width="10" height="10" rx="2" fill="#7054F7" />
            </g>

            {/* 10:00 (x=175) */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(5)}
              onClick={() => onSelectHour?.(TIMELINE_24H[5])}
            >
              <rect x="175" y="80" width="10" height="20" rx="2" fill="#7054F7" />
            </g>

            {/* 12:00 (x=215) */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(6)}
              onClick={() => onSelectHour?.(TIMELINE_24H[6])}
            >
              <rect x="215" y="85" width="10" height="15" rx="2" fill="#F59E0B" />
            </g>

            {/* 13:00 (x=255) */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(7)}
              onClick={() => onSelectHour?.(TIMELINE_24H[7])}
            >
              <rect x="255" y="75" width="10" height="25" rx="2" fill="#7054F7" />
            </g>

            {/* 14:00 ACTIVE SPIKE (x=295) */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(8)}
              onClick={() => onSelectHour?.(TIMELINE_24H[8])}
            >
              <rect x="295" y="30" width="12" height="70" rx="2" fill="#DB1660" />
              <rect x="295" y="15" width="12" height="12" rx="2" fill="#F59E0B" />

              {/* Highlight ping indicator */}
              <circle cx="301" cy="12" r="4" fill="#DB1660" className="animate-ping" />
              <circle cx="301" cy="12" r="3" fill="#DB1660" />
            </g>
          </svg>

          {/* Interactive Tooltip Overlay */}
          {hoveredIndex === 8 ? (
            <div className="absolute -top-1 right-2 bg-[#2C3135] text-white px-2.5 py-1 rounded-md shadow-lg text-[10px] pointer-events-none border border-slate-700">
              <span className="font-extrabold text-[#FFB2BF]">14:00 피크</span>: 온도 2건 · 지연 1건
            </div>
          ) : hoveredIndex !== null && TIMELINE_24H[hoveredIndex] ? (
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-[#2C3135] text-white px-2.5 py-1 rounded-md shadow-lg text-[10px] pointer-events-none border border-slate-700 whitespace-nowrap">
              <span className="font-bold text-slate-200">{TIMELINE_24H[hoveredIndex].hour}</span>: 점검{' '}
              {TIMELINE_24H[hoveredIndex].maintenance}건 · 지연{' '}
              {TIMELINE_24H[hoveredIndex].commDelays}건
            </div>
          ) : null}
        </div>

        {/* Time Axis Labels */}
        <div className="flex justify-between text-[10px] font-mono-numeric text-[#484555] mt-1 px-1">
          <span>00:00</span>
          <span>04:00</span>
          <span>08:00</span>
          <span>12:00</span>
          <span className="font-bold text-[#DB1660]">14:00 (현재)</span>
        </div>
      </div>

      <div className="mt-3 p-2 bg-[#F0F4F9] rounded-lg flex items-center justify-between text-[11px] border border-slate-100">
        <span className="text-[#484555]">지난 24시간 누적 경보:</span>
        <span className="font-mono-numeric font-bold text-[#171C20]">
          14건 <span className="font-normal text-[#484555]">(조치 완료 11건 / 잔여 3건)</span>
        </span>
      </div>
    </div>
  );
};
