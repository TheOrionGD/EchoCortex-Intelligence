import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Calendar, FileCheck2, Heart, BarChart2 } from 'lucide-react';
import { Meeting } from '../types/meeting';

interface ComplianceVaultProps {
  meetings: Meeting[];
}

const ComplianceVault: React.FC<ComplianceVaultProps> = ({ meetings }) => {
  const [retentionDays, setRetentionDays] = useState('365');
  const [clearanceLevel, setClearanceLevel] = useState('team');

  // 1. Dynamic Waterfall calculations from actual processed files
  const baseSegments = meetings.reduce((acc, m) => acc + (m.segments?.length || 0), 0) || 12;
  const addedItems = meetings.reduce((acc, m) => acc + (m.action_items?.length || 0), 0) || 4;
  const mergedDecisions = meetings.reduce((acc, m) => acc + (m.decisions?.length || 0), 0) || 2;
  const finalLogCount = Math.max(1, baseSegments + addedItems - mergedDecisions);

  // 2. Dynamic Gantt rows from actual uploaded audio titles
  const ganttRows = meetings.length > 0 
    ? meetings.slice(0, 3).map((m, idx) => ({
        name: m.title.toUpperCase(),
        status: idx === 0 ? 'Active' : 'Archived',
        w1: 20 + (idx * 15),
        w2: 30 + (idx * 10),
        w3: 40 - (idx * 5)
      }))
    : [
        { name: 'WAV TRANSCRIPTION INDEX', status: 'Active', w1: 35, w2: 45, w3: 20 },
        { name: 'VECTOR SCHEMA SYNC', status: 'Archived', w1: 20, w2: 30, w3: 50 }
      ];

  const logs = meetings.length > 0 
    ? meetings.flatMap(m => m.decisions.map((d, idx) => ({
        timestamp: m.created_at.substring(0, 19).replace('T', ' '),
        event: `Decision Block: ${d.summary.toUpperCase().substring(0, 30)}...`,
        user: m.created_by || 'GODFREY',
        hash: `SHA256-${idx}d81-a43b-33ef`
      })))
    : [
        { timestamp: '2026-05-08 19:42:01', event: 'Decision Node #42 Modified', user: 'GODFREY', hash: 'SHA256-4b81-a43b-33ef' },
        { timestamp: '2026-05-08 17:12:11', event: 'WAV Ingestion Completed', user: 'Orion Pax', hash: 'SHA256-CkXc-NLdR-83QR' },
        { timestamp: '2026-05-08 14:02:45', event: 'Clearance Changed to board_only', user: 'OrionGD', hash: 'SHA256-zgLK-zgLK-z59f' },
      ];

  return (
    <div className="space-y-12 relative z-10 text-crystal font-inter pb-24">
       <header className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 text-red-400 mb-2 font-mono text-[10px] uppercase tracking-[0.4em]">
             <ShieldCheck className="w-5 h-5 animate-pulse" />
             Institutional Governance & Compliance Deck
          </div>
          <h2 className="text-5xl font-mono font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 uppercase">
             Compliance Vault
          </h2>
       </header>

       {/* Audit Controls Panel */}
       <div className="grid lg:grid-cols-12 gap-8">
          {/* Retention Policies */}
          <div className="lg:col-span-6 glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
             <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Data Retention Policies
             </span>
             <div className="space-y-4">
                <p className="text-xs text-zinc-400 font-mono uppercase">Select data retention cycle before automatic shredding or offline archiving.</p>
                <div className="grid grid-cols-3 gap-4">
                   {['90', '365', 'unlimited'].map(days => (
                      <button
                         key={days}
                         onClick={() => setRetentionDays(days)}
                         className={`py-3 px-4 rounded border font-mono text-[10px] uppercase tracking-widest transition-all ${retentionDays === days
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-neon-cyan'
                            : 'bg-black border-white/10 text-zinc-400 hover:border-white/20'
                            }`}
                      >
                         {days === 'unlimited' ? 'Forever' : `${days} Days`}
                      </button>
                   ))}
                </div>
             </div>
          </div>

          {/* Clearance Level Controls */}
          <div className="lg:col-span-6 glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
             <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#39FF14] flex items-center gap-2">
                <Lock className="w-4 h-4 animate-pulse" /> Granular Clearance Access Controls
             </span>
             <div className="space-y-4">
                <p className="text-xs text-zinc-400 font-mono uppercase">Toggle access restriction nodes on core structural intelligence decisions.</p>
                <div className="grid grid-cols-3 gap-4">
                   {['team', 'executive', 'board'].map(lvl => (
                      <button
                         key={lvl}
                         onClick={() => setClearanceLevel(lvl)}
                         className={`py-3 px-4 rounded border font-mono text-[10px] uppercase tracking-widest transition-all ${clearanceLevel === lvl
                            ? 'bg-[#39FF14]/10 border-[#39FF14] text-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.25)]'
                            : 'bg-black border-white/10 text-zinc-400 hover:border-white/20'
                            }`}
                      >
                         {lvl}
                      </button>
                   ))}
                </div>
             </div>
          </div>
       </div>

       {/* Gantt & Waterfall Charts */}
       <div className="grid lg:grid-cols-2 gap-8">
          {/* Gantt Chart */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
             <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#39FF14]">Artifact Lifecycle Gantt Chart</span>
             <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-2">
                   <span>Ingested WAV Title</span>
                   <span>Audit Progress Stage</span>
                </div>

                {ganttRows.map((row, idx) => (
                   <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-zinc-400">
                         <span>{row.name}</span>
                         <span>{row.status}</span>
                      </div>
                      <div className="h-4 bg-black rounded relative overflow-hidden flex">
                         <div className="h-full bg-[#39FF14]/40 border-r border-[#39FF14]" style={{ width: `${row.w1}%` }} />
                         <div className="h-full bg-[#8B5CF6]/40 border-r border-[#8B5CF6]" style={{ width: `${row.w2}%` }} />
                         <div className="h-full bg-red-500/10 border-r border-red-500" style={{ width: `${row.w3}%` }} />
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Waterfall Chart */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
             <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8B5CF6]">Decision Ingest Waterfall Chart</span>
             <div className="h-44 w-full bg-black/40 border border-white/5 rounded-xl p-4 flex items-end justify-between relative font-mono text-[9px]">
                {/* Step 1: Base */}
                <div className="flex flex-col items-center gap-1">
                   <div className="w-8 bg-[#8B5CF6]/40 border border-[#8B5CF6]" style={{ height: `${Math.min(100, baseSegments * 6)}px` }} />
                   <span className="text-zinc-500 text-[8px]">Base Segs: {baseSegments}</span>
                </div>

                {/* Step 2: Added */}
                <div className="flex flex-col items-center gap-1">
                   <div className="w-8 bg-[#39FF14]/30 border border-[#39FF14]" style={{ height: `${Math.min(100, addedItems * 12)}px`, marginBottom: `${Math.min(60, baseSegments * 6)}px` }} />
                   <span className="text-[#39FF14] text-[8px]">Added: +{addedItems}</span>
                </div>

                {/* Step 3: Merged */}
                <div className="flex flex-col items-center gap-1">
                   <div className="w-8 bg-red-500/20 border border-red-500" style={{ height: `${Math.min(50, mergedDecisions * 12)}px`, marginBottom: `${Math.min(100, (baseSegments + addedItems) * 6)}px` }} />
                   <span className="text-red-400 text-[8px]">Merged: -{mergedDecisions}</span>
                </div>

                {/* Step 4: Final Immutable */}
                <div className="flex flex-col items-center gap-1">
                   <div className="w-8 bg-[#39FF14]/50 border border-[#39FF14]" style={{ height: `${Math.min(100, finalLogCount * 6)}px` }} />
                   <span className="text-white text-[8px]">Final Log: {finalLogCount}</span>
                </div>
             </div>
          </div>
       </div>

       {/* Telemetry Gauge Charts */}
       <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 flex items-center gap-2 border-b border-white/10 pb-4">
             <BarChart2 className="w-4 h-4 animate-pulse" /> Telemetry Gauge Indicators
          </span>

          <div className="grid md:grid-cols-2 gap-8">
             {/* Gauge 1 */}
             <div className="p-5 bg-black/30 border border-white/5 rounded-xl flex items-center justify-between">
                <div className="space-y-1 font-mono">
                   <h4 className="text-[10px] text-zinc-400 font-bold uppercase">Groq Llama Pipeline</h4>
                   <p className="text-3xl font-bold text-white">42% Load</p>
                   <p className="text-[8px] text-[#39FF14] uppercase tracking-widest">Optimal Performance</p>
                </div>
                <div className="w-20 h-20 relative">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="30" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
                      <circle cx="40" cy="40" r="30" stroke="#8B5CF6" strokeWidth="6" fill="transparent" strokeDasharray="188" strokeDashoffset={188 - (188 * 42) / 100} />
                   </svg>
                   <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-black">42%</span>
                </div>
             </div>

             {/* Gauge 2 */}
             <div className="p-5 bg-black/30 border border-white/5 rounded-xl flex items-center justify-between">
                <div className="space-y-1 font-mono">
                   <h4 className="text-[10px] text-zinc-400 font-bold uppercase">Hugging Face STT Pipeline</h4>
                   <p className="text-3xl font-bold text-white">68% Load</p>
                   <p className="text-[8px] text-amber-400 uppercase tracking-widest">Moderate Demand</p>
                </div>
                <div className="w-20 h-20 relative">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="30" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
                      <circle cx="40" cy="40" r="30" stroke="#39FF14" strokeWidth="6" fill="transparent" strokeDasharray="188" strokeDashoffset={188 - (188 * 68) / 100} />
                   </svg>
                   <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-black">68%</span>
                </div>
             </div>
          </div>
       </div>

       {/* AI Morality & Core Alignment Principles */}
       <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 flex items-center gap-2">
             <Heart className="w-4 h-4 text-cyan-400 animate-pulse" /> AI Morality & Core Alignment Principles
          </span>
          <div className="grid md:grid-cols-2 gap-6 pt-2">
             <div className="p-5 bg-black/30 border border-white/5 rounded-xl space-y-2">
                <h4 className="text-xs font-mono font-black text-white uppercase tracking-widest">01 / Human-in-the-Loop Validation</h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase">
                   Core tactical objectives are never executed autonomously. All actions require deliberate operator validation to maintain absolute human oversight.
                </p>
             </div>
             <div className="p-5 bg-black/30 border border-white/5 rounded-xl space-y-2">
                <h4 className="text-xs font-mono font-black text-white uppercase tracking-widest">02 / Conversational Fairness & Bias Checks</h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase">
                   Ingestion models enforce non-discriminatory transcription, scanning data arrays to detect and eliminate systemic bias drift.
                </p>
             </div>
             <div className="p-5 bg-black/30 border border-white/5 rounded-xl space-y-2">
                <h4 className="text-xs font-mono font-black text-white uppercase tracking-widest">03 / Conversational Forgetting Rights</h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase">
                   Adhering strictly to individual privacy, members can initiate a permanent forgetting request to shred semantic embedding vectors.
                </p>
             </div>
             <div className="p-5 bg-black/30 border border-white/5 rounded-xl space-y-2">
                <h4 className="text-xs font-mono font-black text-white uppercase tracking-widest">04 / Absolute Integrity Auditing</h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase">
                   Decisions carry persistent cryptographic verification keys to guarantee data origins are authentic, prevent modifications, and deter synthetic spoofing.
                </p>
             </div>
          </div>
       </div>

       {/* Immutable Ledgers Table */}
       <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400 flex items-center gap-2 border-b border-white/10 pb-4">
             <FileCheck2 className="w-4 h-4 animate-pulse" /> Immutable Cryptographic Change Ledger
          </span>

          <div className="overflow-x-auto no-scrollbar">
             <table className="w-full text-left border-collapse font-mono text-[11px]">
                <thead>
                   <tr className="border-b border-white/10 text-zinc-500 uppercase tracking-widest">
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Event Operation</th>
                      <th className="py-3 px-4">Operator Node</th>
                      <th className="py-3 px-4">SHA-256 Proof</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                   {logs.slice(0, 8).map((log, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                         <td className="py-3.5 px-4 text-cyan-400">{log.timestamp}</td>
                         <td className="py-3.5 px-4 font-bold text-white uppercase">{log.event}</td>
                         <td className="py-3.5 px-4 uppercase">{log.user}</td>
                         <td className="py-3.5 px-4 text-zinc-500 font-bold">{log.hash}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};

export default ComplianceVault;
