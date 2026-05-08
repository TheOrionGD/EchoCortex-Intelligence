import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, ArrowUpRight, ShieldCheck, Target } from 'lucide-react';
import { Meeting } from '../types.ts';

interface IntelligenceProps {
  meetings: Meeting[];
  onJumpToSegment: (mid: string, sid: string | undefined) => void;
}

const Intelligence: React.FC<IntelligenceProps> = ({ meetings, onJumpToSegment }) => {
  return (
    <div className="space-y-16 relative z-10 text-crystal font-inter pb-24">
       <header className="border-b border-slate/50 pb-10">
          <div className="flex items-center gap-3 text-cyan mb-2">
            <Activity className="w-5 h-5 animate-pulse" />
            <span className="text-[10px] font-space uppercase tracking-[0.4em]">System-wide Truth Matrix</span>
          </div>
          <h2 className="text-5xl font-space font-black tracking-tighter text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-crystal to-silver uppercase">
            Intelligence Matrix
          </h2>
       </header>

       <div className="grid lg:grid-cols-2 gap-12">
          {/* Tactical Responsibility Matrix */}
          <div className="space-y-8">
             <div className="flex items-center gap-3 text-[10px] font-space font-bold uppercase tracking-[0.4em] text-sage">
               <Target className="w-5 h-5" /> Tactical Responsibility Matrix
             </div>
             <div className="space-y-4">
                {meetings.flatMap(m => m.action_items.map(a => ({ ...a, mt: m.title }))).map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    onClick={() => onJumpToSegment(item.meeting_id, item.source_segment_id)} 
                    className="glass-panel p-8 rounded-xl hover:border-sage hover:bg-sage/5 transition-all cursor-pointer group shadow-[inset_0_0_15px_rgba(74,222,128,0.05)] relative overflow-hidden"
                  >
                     <div className="absolute left-0 top-0 w-1 h-full bg-sage opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="text-[9px] font-space font-bold uppercase tracking-[0.3em] text-silver mb-4 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" /> Vector: {item.mt}
                     </div>
                     <p className="text-lg font-medium text-crystal mb-8 group-hover:text-glow-sage transition-all">{item.description}</p>
                     <div className="flex items-center justify-between text-[9px] font-space font-bold uppercase tracking-[0.3em]">
                       <span className="text-sage bg-sage/10 px-3 py-1 rounded shadow-[0_0_10px_rgba(74,222,128,0.3)]">Node: {item.owner}</span>
                       <ArrowUpRight className="w-5 h-5 text-slate group-hover:text-sage transition-all" />
                     </div>
                  </motion.div>
                ))}
                {meetings.flatMap(m => m.action_items).length === 0 && (
                   <div className="glass-panel p-16 rounded-xl text-center text-slate font-space text-[10px] uppercase tracking-[0.3em]">
                     No tactical vectors found.
                   </div>
                )}
             </div>
          </div>

          {/* Logical Truth Matrix */}
          <div className="space-y-8">
             <div className="flex items-center gap-3 text-[10px] font-space font-bold uppercase tracking-[0.4em] text-violet">
               <ShieldCheck className="w-5 h-5" /> Logical Truth Matrix
             </div>
             <div className="space-y-4">
                {meetings.flatMap(m => m.decisions.map(d => ({ ...d, mt: m.title }))).map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    onClick={() => onJumpToSegment(item.meeting_id, item.source_segment_id)} 
                    className="glass-panel p-8 rounded-xl hover:border-violet hover:bg-violet/5 transition-all cursor-pointer group shadow-[inset_0_0_15px_rgba(139,92,246,0.05)] relative overflow-hidden"
                  >
                     <div className="absolute right-0 top-0 w-1 h-full bg-violet opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="text-[9px] font-space font-bold uppercase tracking-[0.3em] text-silver mb-4 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" /> Source: {item.mt}
                     </div>
                     <p className="text-xl font-medium text-crystal leading-relaxed mb-8 group-hover:text-glow-violet transition-all">"{item.summary}"</p>
                     <div className="flex items-center justify-between text-[9px] font-space font-bold uppercase tracking-[0.3em]">
                       <span className="text-violet bg-violet/10 px-3 py-1 rounded shadow-[0_0_10px_rgba(139,92,246,0.3)] flex items-center gap-2">
                         <Activity className="w-3 h-3" /> Confidence: {(item.confidence_score * 100).toFixed(0)}%
                       </span>
                       <ArrowUpRight className="w-5 h-5 text-slate group-hover:text-violet transition-all" />
                     </div>
                  </motion.div>
                ))}
                {meetings.flatMap(m => m.decisions).length === 0 && (
                   <div className="glass-panel p-16 rounded-xl text-center text-slate font-space text-[10px] uppercase tracking-[0.3em]">
                     No truth logic found.
                   </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );
};

export default Intelligence;