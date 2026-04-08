import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TranscriptSegment } from '../../types';

interface SearchResultItemProps {
  meetingTitle: string;
  segment: TranscriptSegment;
  score: number;
  onClick: () => void;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ meetingTitle, segment, score, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="p-10 bg-obsidian border border-zinc-900 hover:border-accent/40 cursor-pointer group transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between mb-8">
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600">{meetingTitle}</span>
        <span className="text-[9px] font-mono uppercase tracking-widest text-accent font-bold">Relational_Score: {Math.round(score * 100)}%</span>
      </div>

      <blockquote className="text-xl font-medium text-stark leading-relaxed mb-8 transition-opacity">
        "{segment.text}"
      </blockquote>

      <div className="flex items-center justify-between pt-8 border-t border-zinc-900">
        <div className="flex items-center gap-6">
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Node: {segment.speaker}</span>
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-700 italic">Index: {segment.id.slice(-4)}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-700 group-hover:text-stark transition-colors uppercase tracking-widest">
          Recall Context <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;