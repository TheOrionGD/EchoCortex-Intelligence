import React, { useEffect, useRef } from 'react';
import { TranscriptSegment } from '../../types';

interface TimelineProps {
  segments: TranscriptSegment[];
  onSeek: (time: number) => void;
  currentTime?: number;
  highlightedSegmentId?: string | null;
}

const TranscriptTimeline: React.FC<TimelineProps> = ({ segments, onSeek, currentTime = 0, highlightedSegmentId }) => {
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
    <div className="w-full bg-obsidian border border-zinc-900">
      {segments.map((segment, idx) => {
        const isActive = currentTime >= segment.start_time && currentTime <= segment.end_time;
        const isTarget = highlightedSegmentId === segment.id;
        
        return (
          <div 
            key={segment.id} 
            ref={el => { segmentRefs.current[segment.id] = el; }}
            onClick={() => onSeek(segment.start_time)}
            className={`flex items-start group cursor-pointer transition-all duration-200 border-b border-zinc-900/50 ${
              isActive 
                ? 'bg-carbon' 
                : isTarget 
                  ? 'bg-accent/5' 
                  : 'hover:bg-zinc-900/30'
            }`}
          >
            <div className="w-24 flex-shrink-0 flex flex-col items-center py-6 border-r border-zinc-900 relative">
              <div className={`text-[10px] font-mono tracking-tighter mb-1 transition-colors ${isActive ? 'text-accent' : 'text-zinc-600'}`}>
                {formatTime(segment.start_time)}
              </div>
              <div className={`w-0.5 h-full absolute bottom-0 bg-zinc-900 ${idx === segments.length - 1 ? 'hidden' : ''}`} />
              <div className={`w-2 h-2 rounded-full absolute top-[1.6rem] border-2 bg-obsidian z-10 ${isActive ? 'border-accent scale-150 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'border-zinc-800'}`} />
            </div>

            <div className="flex-1 py-6 px-10">
              <div className="flex items-center gap-4 mb-2">
                <span className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors ${isActive ? 'text-stark' : 'text-zinc-600'}`}>
                  {segment.speaker}
                </span>
                {isActive && (
                  <div className="flex gap-0.5">
                    <div className="w-1 h-2 bg-accent animate-pulse" />
                    <div className="w-1 h-3 bg-accent animate-pulse delay-75" />
                    <div className="w-1 h-2 bg-accent animate-pulse delay-150" />
                  </div>
                )}
              </div>
              <p className={`text-[14px] leading-relaxed font-medium transition-colors ${
                isActive ? 'text-stark' : 'text-zinc-500 group-hover:text-zinc-400'
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

export default TranscriptTimeline;