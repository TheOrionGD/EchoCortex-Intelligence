import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Clock, ArrowUpRight, Zap, Trophy, Target, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { Meeting } from '../types.ts';

interface DashboardProps {
  meetings: Meeting[];
  onSelectMeeting: (id: string) => void;
  onDeleteMeeting: (id: string) => void;
  onInitiateCapture: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ meetings, onSelectMeeting, onDeleteMeeting, onInitiateCapture }) => {

  const level = 4;
  const xp = 8500;
  const nextLevelXp = 10000;
  const progress = (xp / nextLevelXp) * 100;

  return (
    <div className="space-y-8 relative z-10 text-crystal font-inter pb-24">
      {/* Hero Section */}
      <section className="glass-panel p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-neural-gradient opacity-50 z-[-1]" />
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-violet/20 rounded-full blur-[100px] pointer-events-none" />
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-cyan mb-2">
              <Terminal className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-space uppercase tracking-[0.4em]">Command Bridge active</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-space font-bold tracking-tighter uppercase text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-crystal to-silver">
              ECHO SYSTEM
            </h2>
            <p className="font-medium text-sm leading-relaxed max-w-xl text-silver">
              Enterprise intelligence pipeline is running at optimal capacity. Tactical data extraction from {meetings.length} vectors complete.
            </p>
          </div>
          <button onClick={onInitiateCapture} className="btn-tactical text-lg uppercase tracking-wider py-4 px-8 shadow-neon-cyan bg-cyan/10 border-cyan text-cyan hover:bg-cyan hover:text-obsidian group">
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="w-5 h-5 group-hover:animate-bounce" /> Execute Capture
            </span>
          </button>
        </header>
      </section>

      {/* Institutional Operational Onboarding Guide */}
      <section className="glass-panel p-8 rounded-2xl border border-white/10 bg-[#050505]/90 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#39FF14]/5 rounded-full blur-3xl" />
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 text-[#39FF14]">
             <Cpu className="w-5 h-5 animate-pulse" />
             <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Operational Onboarding Handbook</span>
          </div>
          <h3 className="text-3xl font-mono font-black uppercase tracking-tight text-white">How to Operate Echo</h3>
          <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest max-w-2xl">Follow this cryptographic walkthrough to unlock and navigate the entire decentralized institutional pipeline.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* Step 1 */}
           <div className="p-5 bg-black/40 border border-white/5 hover:border-[#39FF14]/30 rounded-xl space-y-3 transition-all group">
              <span className="text-xs font-mono font-black text-[#39FF14] bg-[#39FF14]/10 px-2 py-1 rounded">STAGE 01</span>
              <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Ingest Audio/Text</h4>
              <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase">
                 Go to <span className="text-[#39FF14]">Data Ingestion</span>, record your live session, or upload a conversation file to serialize to Base64.
              </p>
           </div>

           {/* Step 2 */}
           <div className="p-5 bg-black/40 border border-white/5 hover:border-[#8B5CF6]/30 rounded-xl space-y-3 transition-all group">
              <span className="text-xs font-mono font-black text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-1 rounded">STAGE 02</span>
              <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Transcribe & Index</h4>
              <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase">
                 Hugging Face Whisper extracts transcripts and Sentence-Transformers convert speech text into 384-dimensional vectors.
              </p>
           </div>

           {/* Step 3 */}
           <div className="p-5 bg-black/40 border border-white/5 hover:border-cyan-500/30 rounded-xl space-y-3 transition-all group">
              <span className="text-xs font-mono font-black text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">STAGE 03</span>
              <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Inspect Truth Matrix</h4>
              <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase">
                 Open <span className="text-cyan-400">Truth Matrix</span> to query decision confidence scores and individual commitments mapped to team nodes.
              </p>
           </div>

           {/* Step 4 */}
           <div className="p-5 bg-black/40 border border-white/5 hover:border-red-500/30 rounded-xl space-y-3 transition-all group">
              <span className="text-xs font-mono font-black text-red-400 bg-red-500/10 px-2 py-1 rounded">STAGE 04</span>
              <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Governance Vault</h4>
              <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase">
                 Navigate <span className="text-red-400">Compliance Vault</span> to verify secure SHA-256 ledgers and track active Groq capacity meters.
              </p>
           </div>
        </div>
      </section>

      {/* Gamification Dashboard */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* XP & Level */}
        <motion.div whileHover={{ y: -5 }} className="glass-panel p-6 rounded-xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="font-space uppercase text-xs tracking-widest text-silver">Neural Commander</span>
            </div>
            <span className="font-space font-bold text-2xl text-amber-400">LVL {level}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-silver">
              <span>{xp} XP</span>
              <span>{nextLevelXp} XP</span>
            </div>
            <div className="h-2 bg-obsidian rounded-full overflow-hidden border border-slate/30">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.5)]" 
              />
            </div>
          </div>
        </motion.div>

        {/* System Health / Stats */}
        <motion.div whileHover={{ y: -5 }} className="glass-panel p-6 rounded-xl flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-sage" />
              <span className="font-space uppercase text-xs tracking-widest text-silver">Processing Efficiency</span>
            </div>
            <span className="font-space font-bold text-4xl text-sage text-glow-sage">98.4%</span>
          </div>
          <Cpu className="w-12 h-12 text-sage/20" />
        </motion.div>

        {/* Daily Missions */}
        <motion.div whileHover={{ y: -5 }} className="glass-panel p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-violet" />
            <span className="font-space uppercase text-xs tracking-widest text-silver">Active Objectives</span>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm">
              <div className="w-4 h-4 rounded border border-cyan flex items-center justify-center bg-cyan/20">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 bg-cyan rounded-sm" />
              </div>
              <span className="text-silver">Process 3 meetings (3/3)</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <div className="w-4 h-4 rounded border border-slate flex items-center justify-center" />
              <span className="text-slate">Generate strategic report (0/1)</span>
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Meeting Pipeline */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-cyan border-b border-slate/50 pb-2">
          <Database className="w-5 h-5" />
          <h3 className="text-sm font-space uppercase tracking-[0.3em]">Intelligence Pipeline</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {meetings.map((m, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={m.id} 
              onClick={() => onSelectMeeting(m.id)} 
              className="glass-panel p-6 rounded-xl flex flex-col lg:flex-row lg:items-center justify-between group cursor-pointer hover:border-cyan/50 hover:bg-slate/20 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all" />
              
              <div className="flex items-start lg:items-center gap-8 pl-4">
                <div className="hidden sm:block text-center border-r border-slate/30 pr-6">
                  <p className="text-[10px] font-space uppercase tracking-widest mb-1 text-slate">ID</p>
                  <p className="text-xl font-space text-silver group-hover:text-cyan transition-colors">
                    {meetings.length - idx}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[10px] font-space uppercase tracking-widest text-silver">
                    <Clock className="w-3 h-3 text-cyan" />
                    {new Date(m.start_time).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}
                  </div>
                  <h4 className="text-xl font-bold font-space uppercase text-crystal group-hover:text-glow-cyan transition-all">
                    {m.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4">
                     <span className="flex items-center gap-1 text-[10px] font-space uppercase tracking-wider text-sage bg-sage/10 px-2 py-1 rounded border border-sage/20">
                        <Target className="w-3 h-3" /> {m.action_items.length} Tasks
                     </span>
                     <span className="flex items-center gap-1 text-[10px] font-space uppercase tracking-wider text-violet bg-violet/10 px-2 py-1 rounded border border-violet/20">
                        <ShieldAlert className="w-3 h-3" /> {m.decisions.length} Decisions
                     </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-6 lg:mt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="p-3 bg-cyan/10 border border-cyan text-cyan rounded-full hover:bg-cyan hover:text-obsidian transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <ArrowUpRight className="w-5 h-5" />
                 </div>
              </div>
            </motion.div>
          ))}
          {meetings.length === 0 && (
             <div className="glass-panel p-20 text-center rounded-xl flex flex-col items-center justify-center">
               <Database className="w-12 h-12 mb-4 text-slate animate-pulse-fast" />
               <p className="font-space text-xs uppercase tracking-[0.4em] text-silver">No intel in vector space.</p>
             </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;