import React from 'react';
import { TranscriptSegment } from '../../types';
import Timestamp from './Timestamp';

interface TranscriptLineProps {
  segment: TranscriptSegment;
  isActive: boolean;
  isHighlighted: boolean;
  onSeek: (time: number) => void;
}

export const TranscriptLine: React.FC<TranscriptLineProps> = ({ segment, isActive, isHighlighted, onSeek }) => {
  return (
    <div 
      onClick={() => onSeek(segment.start_time)}
      className={`flex items-start group cursor-pointer transition-all duration-300 border-b border-zinc-900/50 ${
        isActive ? 'bg-carbon' : isHighlighted ? 'bg-accent/10' : 'hover:bg-zinc-900/30'
      }`}
    >
      <div className="w-20 flex-shrink-0 flex flex-col items-center py-6 border-r border-zinc-900">
        <Timestamp seconds={segment.start_time} className={isActive ? 'text-accent' : 'text-zinc-600'} />
      </div>

      <div className="flex-1 py-6 px-8 space-y-2">
        <div className="flex items-center gap-4">
          <span className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors ${isActive ? 'text-stark' : 'text-zinc-600'}`}>
            {segment.speaker}
          </span>
          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />}
        </div>
        <p className={`text-[14px] leading-relaxed font-medium transition-colors ${
          isActive ? 'text-stark' : 'text-zinc-500 group-hover:text-zinc-400'
        }`}>
          {segment.text}
        </p>
      </div>
    </div>
  );
};

export default TranscriptLine;