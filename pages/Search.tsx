import React from 'react';
import { Search as SearchIcon, Loader2, ArrowUpRight } from 'lucide-react';
import { Meeting, TranscriptSegment } from '../types.ts';

interface SearchProps {
  query: string;
  results: { meetingId: string, segment: TranscriptSegment, score: number }[];
  isSearching: boolean;
  onSearch: (q: string) => void;
  onJumpToSegment: (mid: string, sid: string | undefined) => void;
  meetings: Meeting[];
}

const Search: React.FC<SearchProps> = ({ query, results, isSearching, onSearch, onJumpToSegment, meetings }) => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700">
       <header className="border-b border-zinc-800 pb-10">
          <h2 className="text-4xl font-semibold tracking-tighter text-zinc-100">Semantic Recall</h2>
          <p className="text-zinc-500 mt-4 font-serif italic text-base leading-relaxed">Retrieve excerpts using meaning-based vector queries.</p>
       </header>
       <div className="relative group max-w-3xl">
          <SearchIcon className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-700 group-focus-within:text-zinc-300 transition-colors" />
          <input 
            type="text" 
            placeholder="Search intent..." 
            defaultValue={query} 
            onKeyDown={(e) => { if (e.key === 'Enter') onSearch(e.currentTarget.value); }} 
            className="w-full pl-20 pr-10 py-8 bg-zinc-950 border border-zinc-800 rounded-sm text-xl text-zinc-200 focus:outline-none focus:border-zinc-600 transition-all font-serif italic shadow-2xl" 
          />
          {isSearching && <Loader2 className="absolute right-8 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-500 animate-spin" />}
       </div>
       <div className="space-y-12 max-w-4xl">
          {results.map((res, idx) => (
            <div key={idx} onClick={() => onJumpToSegment(res.meetingId, res.segment.id)} className="p-12 bg-zinc-900/30 border border-zinc-800 rounded-sm hover:border-zinc-700 cursor-pointer group transition-all shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400/40" />
              <div className="flex items-center justify-between mb-10">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600">{meetings.find(m => m.id === res.meetingId)?.title}</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400/50 font-black">Score: {Math.round(res.score * 100)}%</span>
              </div>
              <blockquote className="text-2xl font-serif italic text-zinc-200 leading-relaxed mb-10 opacity-80 group-hover:opacity-100 transition-opacity">"{res.segment.text}"</blockquote>
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-600 pt-10 border-t border-zinc-900"><span>Speaker: {res.segment.speaker}</span><span className="text-zinc-700 group-hover:text-zinc-300 transition-colors flex items-center gap-2">Recall Context <ArrowUpRight className="w-4 h-4" /></span></div>
            </div>
          ))}
       </div>
    </div>
  );
};

export default Search;