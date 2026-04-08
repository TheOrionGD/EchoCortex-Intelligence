import React from 'react';
import { Cpu, Activity, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Meeting } from '../types.ts';

interface IntelligenceProps {
  meetings: Meeting[];
  onJumpToSegment: (mid: string, sid: string | undefined) => void;
}

const Intelligence: React.FC<IntelligenceProps> = ({ meetings, onJumpToSegment }) => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700">
       <header className="border-b border-zinc-800 pb-10">
          <h2 className="text-4xl font-semibold tracking-tighter text-zinc-100">Institutional Commitments</h2>
          <p className="text-zinc-500 mt-4 font-serif italic text-base leading-relaxed">System-wide relational mapping of identified commitments.</p>
       </header>

       <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-10">
             <h3 className="text-[11px] font-mono uppercase tracking-[0.4em] text-zinc-600 flex items-center gap-3"><Cpu className="w-5 h-5" /> Responsibility Matrix</h3>
             <div className="space-y-px bg-zinc-800 border border-zinc-800 rounded-sm overflow-hidden shadow-2xl">
                {meetings.flatMap(m => m.action_items.map(a => ({ ...a, mt: m.title }))).map((item, i) => (
                  <div key={i} onClick={() => onJumpToSegment(item.meeting_id, item.source_segment_id)} className="bg-obsidian p-10 hover:bg-zinc-900 transition-colors cursor-pointer group">
                     <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-700 mb-5 italic border-b border-zinc-900 pb-4">Artifact: {item.mt}</div>
                     <p className="text-xl font-medium text-zinc-200 mb-8 tracking-tight group-hover:text-zinc-100 transition-colors">{item.description}</p>
                     <div className="flex items-center justify-between"><span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/60 font-bold">Node: {item.owner}</span><ArrowUpRight className="w-5 h-5 text-zinc-800 group-hover:text-cyan-400 transition-all" /></div>
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-10">
             <h3 className="text-[11px] font-mono uppercase tracking-[0.4em] text-zinc-600 flex items-center gap-3"><Activity className="w-5 h-5" /> Logical Truth Matrix</h3>
             <div className="space-y-px bg-zinc-800 border border-zinc-800 rounded-sm overflow-hidden shadow-2xl">
                {meetings.flatMap(m => m.decisions.map(d => ({ ...d, mt: m.title }))).map((item, i) => (
                  <div key={i} onClick={() => onJumpToSegment(item.meeting_id, item.source_segment_id)} className="bg-zinc-900/20 p-10 hover:bg-zinc-900 transition-colors cursor-pointer border-l-4 border-l-amber-400/30">
                     <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-700 mb-5 italic border-b border-zinc-900 pb-4">{item.mt}</div>
                     <p className="text-lg font-serif italic text-zinc-300 leading-relaxed mb-8">"{item.summary}"</p>
                     <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-zinc-600 font-bold"><ShieldCheck className="w-4 h-4 text-zinc-700" /> Confidence: {(item.confidence_score * 100).toFixed(0)}%</div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

export default Intelligence;