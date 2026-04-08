
import React, { useEffect, useRef } from 'react';
import { TranscriptSegment } from '../types';

interface TimelineProps {
  segments: TranscriptSegment[];
  onSeek: (time: number) => void;
  currentTime?: number;
  highlightedSegmentId?: string | null;
}

const Timeline: React.FC<TimelineProps> = ({ segments, onSeek, currentTime = 0, highlightedSegmentId }) => {
  const segmentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (highlightedSegmentId && segmentRefs.current[highlightedSegmentId]) {
      segmentRefs.current[highlightedSegmentId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [highlightedSegmentId]);

  return (
    <div className="w-full space-y-px">
      {segments.map((segment) => {
        const isActive = currentTime >= segment.start_time && currentTime <= segment.end_time;
        const isTarget = highlightedSegmentId === segment.id;
        
        return (
          <div 
            key={segment.id} 
            ref={el => { segmentRefs.current[segment.id] = el; }}
            onClick={() => onSeek(segment.start_time)}
            className={`flex items-start group cursor-pointer transition-colors duration-200 py-3 px-4 border-l-2 ${
              isActive 
                ? 'bg-zinc-800/50 border-cyan-400/70' 
                : isTarget 
                  ? 'bg-amber-400/10 border-amber-400/50' 
                  : 'border-transparent hover:bg-zinc-900/50'
            }`}
          >
            <div className="w-16 flex-shrink-0 font-mono text-[11px] text-zinc-500 pt-0.5 tracking-tighter">
              {formatTime(segment.start_time)}
            </div>
            
            <div className="w-32 flex-shrink-0 flex items-center gap-2 pr-4">
              <span className={`text-[10px] font-bold uppercase tracking-widest truncate ${
                isActive ? 'text-zinc-100' : 'text-zinc-500'
              }`}>
                {segment.speaker}
              </span>
            </div>

            <div className="flex-1">
              <p className={`text-[13px] leading-relaxed font-serif ${
                isActive ? 'text-zinc-100' : 'text-zinc-400 group-hover:text-zinc-300'
              }`}>
                {segment.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
