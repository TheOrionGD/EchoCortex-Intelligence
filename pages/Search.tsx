import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Loader2, ArrowUpRight, Network, Fingerprint, Database } from 'lucide-react';
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
    <div className="space-y-16 relative z-10 text-crystal font-inter pb-24">
       <header className="border-b border-slate/50 pb-10">
          <div className="flex items-center gap-3 text-cyan mb-2">
            <Network className="w-5 h-5 animate-pulse" />
            <span className="text-[10px] font-space uppercase tracking-[0.4em]">Vector Database Access</span>
          </div>
          <h2 className="text-5xl font-space font-black tracking-tighter text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-crystal to-silver uppercase">
            Neural Recall
          </h2>
       </header>

       <div className="relative group max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-cyan/5 rounded-2xl blur-xl transition-all group-focus-within:bg-cyan/10" />
          <div className="relative flex items-center bg-obsidian/80 backdrop-blur-md border border-slate/50 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] group-focus-within:border-cyan transition-colors">
            <div className="pl-8 pr-4">
               <SearchIcon className="w-6 h-6 text-slate group-focus-within:text-cyan group-focus-within:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all" />
            </div>
            <input 
              type="text" 
              placeholder="INPUT SEMANTIC QUERY..." 
              defaultValue={query} 
              onKeyDown={(e) => { if (e.key === 'Enter') onSearch(e.currentTarget.value); }} 
              className="w-full py-8 pr-8 bg-transparent text-xl text-crystal focus:outline-none font-space uppercase tracking-widest placeholder:text-slate" 
            />
            {isSearching && (
               <div className="pr-8 flex items-center gap-3">
                 <span className="text-[9px] font-space text-cyan uppercase tracking-[0.2em] animate-pulse">Scanning Vectors</span>
                 <Loader2 className="w-6 h-6 text-cyan animate-spin" />
               </div>
            )}
          </div>
       </div>

       <div className="space-y-8 max-w-4xl mx-auto">
          {results.length > 0 && (
             <div className="flex items-center gap-3 text-[10px] font-space uppercase tracking-[0.3em] text-silver mb-8">
               <Database className="w-4 h-4 text-cyan" />
               Found {results.length} Semantic Matches
             </div>
          )}
          
          <AnimatePresence>
            {results.map((res, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                onClick={() => onJumpToSegment(res.meetingId, res.segment.id)} 
                className="glass-panel p-10 rounded-2xl cursor-pointer group transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-cyan/0 group-hover:bg-cyan/5 transition-colors pointer-events-none" />
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-3">
                     <Fingerprint className="w-5 h-5 text-slate group-hover:text-cyan transition-colors" />
                     <span className="text-[10px] font-space uppercase tracking-[0.3em] text-silver group-hover:text-crystal transition-colors">
                       {meetings.find(m => m.id === res.meetingId)?.title}
                     </span>
                  </div>
                  <span className="text-[10px] font-space uppercase tracking-[0.3em] text-cyan font-bold bg-cyan/10 px-3 py-1 rounded border border-cyan/20 shadow-neon-cyan">
                    Match: {Math.round(res.score * 100)}%
                  </span>
                </div>
                
                <blockquote className="text-xl font-inter text-crystal leading-relaxed mb-10 opacity-80 group-hover:opacity-100 transition-opacity relative z-10">
                  "{res.segment.text}"
                </blockquote>
                
                <div className="flex items-center justify-between text-[9px] font-space uppercase tracking-[0.3em] text-slate pt-6 border-t border-slate/50 relative z-10">
                  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate group-hover:bg-cyan transition-colors"/> ID: {res.segment.speaker}</span>
                  <span className="text-cyan group-hover:text-glow-cyan transition-all flex items-center gap-2">
                    Extract Context <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
       </div>
    </div>
  );
};

export default Search;