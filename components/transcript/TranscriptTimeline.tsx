import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
    <div className="w-full bg-obsidian/50 border border-slate/50 rounded-xl overflow-hidden backdrop-blur-md">
      {segments.map((segment, idx) => {
        const isActive = currentTime >= segment.start_time && currentTime <= segment.end_time;
        const isTarget = highlightedSegmentId === segment.id;
        
        return (
          <motion.div 
            whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.4)" }}
            key={segment.id} 
            ref={el => { segmentRefs.current[segment.id] = el; }}
            onClick={() => onSeek(segment.start_time)}
            className={`flex items-start group cursor-pointer transition-all duration-300 border-b border-slate/30 relative overflow-hidden ${
              isActive 
                ? 'bg-cyan/5' 
                : isTarget 
                  ? 'bg-violet/10 border-violet/30' 
                  : 'bg-transparent'
            }`}
          >
            {isActive && (
              <div className="absolute left-0 top-0 w-1 h-full bg-cyan shadow-[0_0_15px_rgba(0,240,255,1)]" />
            )}
            
            <div className="w-24 flex-shrink-0 flex flex-col items-center py-6 border-r border-slate/30 relative">
              <div className={`text-[10px] font-space tracking-widest mb-1 transition-colors ${isActive ? 'text-cyan font-bold text-glow-cyan' : 'text-slate'}`}>
                {formatTime(segment.start_time)}
              </div>
              <div className={`w-[1px] h-full absolute bottom-0 bg-slate/30 ${idx === segments.length - 1 ? 'hidden' : ''}`} />
              <div className={`w-2.5 h-2.5 rounded-full absolute top-[1.6rem] border-2 bg-obsidian z-10 transition-all ${isActive ? 'border-cyan scale-125 shadow-neon-cyan' : 'border-slate/50'}`} />
            </div>

            <div className="flex-1 py-6 px-10">
              <div className="flex items-center gap-4 mb-2">
                <span className={`text-[9px] font-space font-black uppercase tracking-[0.3em] transition-colors ${isActive ? 'text-crystal' : 'text-slate'}`}>
                  {segment.speaker}
                </span>
                {isActive && (
                  <div className="flex gap-1">
                    <div className="w-1.5 h-2 bg-cyan shadow-neon-cyan animate-pulse" />
                    <div className="w-1.5 h-3 bg-cyan shadow-neon-cyan animate-pulse delay-75" />
                    <div className="w-1.5 h-2 bg-cyan shadow-neon-cyan animate-pulse delay-150" />
                  </div>
                )}
              </div>
              <p className={`text-[13px] leading-relaxed font-inter transition-colors ${
                isActive ? 'text-crystal' : 'text-silver group-hover:text-crystal'
              }`}>
                {segment.text}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TranscriptTimeline;