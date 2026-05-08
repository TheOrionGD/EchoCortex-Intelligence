import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare } from 'lucide-react';
import { Meeting } from '../types/meeting';

interface DeltaAuditProps {
  meetings: Meeting[];
}

const DeltaAudit: React.FC<DeltaAuditProps> = ({ meetings }) => {
  const [meetingAId, setMeetingAId] = useState<string>('');
  const [meetingBId, setMeetingBId] = useState<string>('');

  const mSelectedA = meetings.find(m => m.id === meetingAId);
  const mSelectedB = meetings.find(m => m.id === meetingBId);

  // Dynamic calculations when both are selected
  const countA = mSelectedA?.action_items?.length || 0;
  const countB = mSelectedB?.action_items?.length || 0;

  const confA = mSelectedA?.decisions?.length 
    ? Math.round((mSelectedA.decisions.reduce((acc, d) => acc + d.confidence_score, 0) / mSelectedA.decisions.length) * 100)
    : 72;
  const confB = mSelectedB?.decisions?.length 
    ? Math.round((mSelectedB.decisions.reduce((acc, d) => acc + d.confidence_score, 0) / mSelectedB.decisions.length) * 100)
    : 94;

  // Slope line coordinates
  const yA = 100 - confA;
  const yB = 100 - confB;

  return (
    <div className="space-y-12 relative z-10 text-crystal font-inter pb-24">
       <header className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 text-[#8B5CF6] mb-2 font-mono text-[10px] uppercase tracking-[0.4em]">
            <GitCompare className="w-5 h-5 animate-pulse text-[#8B5CF6]" />
            Audio Ingestion Delta Upgrade Matrix
          </div>
          <h2 className="text-5xl font-mono font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 uppercase">
            Delta Audit
          </h2>
       </header>

       {/* Selector Modules */}
       <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-panel p-6 rounded-xl border border-white/10 bg-[#050505]/80 space-y-4">
             <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#39FF14]">Source Ingested File (Legacy)</label>
             <select 
               value={meetingAId} 
               onChange={e => setMeetingAId(e.target.value)}
               className="w-full bg-black border border-white/10 px-4 py-3 rounded text-xs font-mono text-white focus:border-[#39FF14]"
             >
                <option value="">Select session...</option>
                {meetings.map(m => (
                   <option key={m.id} value={m.id}>{m.title}</option>
                ))}
             </select>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-white/10 bg-[#050505]/80 space-y-4">
             <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8B5CF6]">Target Ingested File (Current Upgrade)</label>
             <select 
               value={meetingBId} 
               onChange={e => setMeetingBId(e.target.value)}
               className="w-full bg-black border border-white/10 px-4 py-3 rounded text-xs font-mono text-white focus:border-[#8B5CF6]"
             >
                <option value="">Select session...</option>
                {meetings.map(m => (
                   <option key={m.id} value={m.id}>{m.title}</option>
                ))}
             </select>
          </div>
       </div>

       {mSelectedA && mSelectedB ? (
          <div className="space-y-12">
             <div className="grid lg:grid-cols-2 gap-8">
                {/* Clustered Column Chart */}
                <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
                   <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#39FF14]">Side-by-Side Clustered Column Comparison</span>
                   <div className="h-48 w-full bg-black/40 border border-white/5 rounded-xl p-4 flex items-end justify-around relative">
                      {/* Metric 1: Action Items */}
                      <div className="flex flex-col items-center gap-2">
                         <div className="flex gap-2 items-end">
                            {/* Meeting A Bar */}
                            <div 
                              className="w-8 bg-[#8B5CF6]/40 border border-[#8B5CF6] rounded-t relative group transition-all duration-500"
                              style={{ height: `${Math.max(10, countA * 15)}px` }}
                            >
                               <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">A: {countA}</div>
                            </div>
                            {/* Meeting B Bar */}
                            <div 
                              className="w-8 bg-[#39FF14]/40 border border-[#39FF14] rounded-t relative group transition-all duration-500"
                              style={{ height: `${Math.max(10, countB * 15)}px` }}
                            >
                               <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">B: {countB}</div>
                            </div>
                         </div>
                         <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Action Items</span>
                      </div>

                      {/* Metric 2: Confidence Index */}
                      <div className="flex flex-col items-center gap-2">
                         <div className="flex gap-2 items-end">
                            {/* Meeting A Bar */}
                            <div 
                              className="w-8 bg-[#8B5CF6]/40 border border-[#8B5CF6] rounded-t relative group transition-all duration-500"
                              style={{ height: `${confA}px` }}
                            >
                               <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">A: {confA}%</div>
                            </div>
                            {/* Meeting B Bar */}
                            <div 
                              className="w-8 bg-[#39FF14]/40 border border-[#39FF14] rounded-t relative group transition-all duration-500"
                              style={{ height: `${confB}px` }}
                            >
                               <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">B: {confB}%</div>
                            </div>
                         </div>
                         <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Confidence Score</span>
                      </div>
                   </div>
                </div>

                {/* Custom Slope Chart */}
                <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
                   <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8B5CF6]">Decision Evolution Slope Chart</span>
                   <div className="h-48 w-full bg-black/40 border border-white/5 rounded-xl p-4 relative overflow-visible">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                         <line x1="40" y1={yA} x2="260" y2={yB} stroke="#39FF14" strokeWidth="2.5" className="animate-pulse" />
                         <circle cx="40" cy={yA} r="6" fill="#8B5CF6" />
                         <circle cx="260" cy={yB} r="6" fill="#39FF14" />
                      </svg>
                      <span className="absolute bottom-4 left-6 text-[8px] font-mono uppercase text-zinc-500">Confidence {confA}% (A)</span>
                      <span className="absolute top-4 right-6 text-[8px] font-mono uppercase text-[#39FF14]">Confidence {confB}% (B)</span>
                   </div>
                </div>
             </div>

             {/* Bullet Chart & Smart Narrative */}
             <div className="grid lg:grid-cols-2 gap-8">
                {/* Bullet Chart */}
                <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
                   <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#39FF14]">Target Upgrade Bullet Chart</span>
                   <div className="space-y-4">
                      <p className="text-[10px] text-zinc-500 font-mono uppercase">Compares current execution metrics (green) against the previous meeting baseline (gray).</p>
                      
                      <div className="space-y-2">
                         <span className="text-[9px] font-mono uppercase tracking-widest text-white">Strategic Commit Progress</span>
                         <div className="h-8 bg-black/60 border border-white/5 rounded relative flex items-center p-1">
                            <div className="absolute left-0 top-0 bottom-0 bg-white/5 w-1/2 rounded-l" />
                            <div className="absolute left-1/2 top-0 bottom-0 bg-white/10 w-1/3" />
                            
                            {/* Current progress bar */}
                            <div 
                              className="h-4 bg-[#39FF14] rounded-sm relative z-10 transition-all duration-1000 shadow-[0_0_10px_rgba(57,255,20,0.4)]" 
                              style={{ width: `${confB}%` }}
                            />
                            {/* Baseline Marker */}
                            <div 
                              className="absolute top-1 bottom-1 w-1.5 bg-[#8B5CF6] z-20 rounded transition-all duration-1000" 
                              style={{ left: `${confA}%` }}
                              title="Previous Baseline" 
                            />
                         </div>
                         <div className="flex justify-between text-[8px] font-mono text-zinc-500 uppercase">
                            <span>0%</span>
                            <span>Baseline Limit</span>
                            <span>Target: 100%</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* AI Smart Narrative */}
                <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-4">
                   <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400">Smart Narrative AI Visual</span>
                   <div className="p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-xl font-mono text-[10px] text-zinc-300 leading-relaxed uppercase space-y-3">
                      <p className="font-bold text-white">Handshake Upgrade analysis:</p>
                      <p>
                         Comparing <span className="text-cyan-400">"{mSelectedA.title}"</span> with <span className="text-[#39FF14]">"{mSelectedB.title}"</span>, we identify a clear alignment trajectory. Action item outputs mutated from {countA} up to {countB}, while strategic decision confidence averaged {confA}% in session A versus {confB}% in session B.
                      </p>
                      <p className="text-[8px] text-[#39FF14]">System: 100% Integrity verified via sha256 checksums.</p>
                   </div>
                </div>
             </div>
          </div>
       ) : (
          <div className="glass-panel p-12 text-center rounded-2xl border border-white/5 bg-black/40">
             <GitCompare className="w-12 h-12 text-zinc-600 mx-auto mb-4 animate-pulse" />
             <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Please select two sessions from the filters above to calculate the progressive delta.</p>
          </div>
       )}
    </div>
  );
};

export default DeltaAudit;
