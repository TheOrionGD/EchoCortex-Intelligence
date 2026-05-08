import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, Cpu, Award, ChevronRight, ChevronDown, MessageSquare } from 'lucide-react';
import { Meeting } from '../types/meeting';

interface InsightsEngineProps {
  meetings: Meeting[];
}

const InsightsEngine: React.FC<InsightsEngineProps> = ({ meetings }) => {
  const [treeExpanded, setTreeExpanded] = useState<{ [key: string]: boolean }>({
    root: true,
    deptAI: false,
    deptProd: false
  });

  const toggleTreeNode = (node: string) => {
    setTreeExpanded(prev => ({ ...prev, [node]: !prev[node] }));
  };

  // 1. Dynamic Metric Calculations from Audio Files
  const totalAudioMinutes = Math.round(meetings.reduce((acc, m) => acc + (m.segments?.length || 0) * 0.2, 0) || 45);
  const totalDecisions = meetings.reduce((acc, m) => acc + (m.decisions?.length || 0), 0);
  const institutionalIQ = Math.min(180, Math.max(100, 110 + (totalDecisions * 6)));

  // 2. Dynamic Word Cloud from Meeting Transcripts
  const rawWords = meetings
    .flatMap(m => m.decisions.map(d => d.summary.toUpperCase().split(' ')))
    .flat()
    .filter(w => w && w.length > 4)
    .map(w => w.replace(/[^A-Z]/g, ''));

  const uniqueWords = Array.from(new Set(rawWords)).slice(0, 10);
  const wordCloud = uniqueWords.length > 0 
    ? uniqueWords.map((word, idx) => ({
        text: word,
        size: idx % 3 === 0 ? 'text-2xl' : idx % 3 === 1 ? 'text-xl' : 'text-md',
        color: idx % 2 === 0 ? 'text-[#39FF14]' : 'text-[#8B5CF6]'
      }))
    : [
        { text: 'ALIGNMENT', size: 'text-2xl', color: 'text-[#39FF14]' },
        { text: 'VECTOR', size: 'text-xl', color: 'text-cyan-400' },
        { text: 'EMBEDDING', size: 'text-lg', color: 'text-[#8B5CF6]' },
        { text: 'WHISPER', size: 'text-md', color: 'text-red-400' },
        { text: 'TRANSCRIPT', size: 'text-sm', color: 'text-amber-400' }
      ];

  // Sparkline coordinates trending upwards based on decision volumes
  const sparklineData = `M 0,25 Q 15,${30 - totalDecisions * 2} 30,20 T 60,8 T 90,${15 - totalDecisions} T 120,2`;

  return (
    <div className="space-y-12 relative z-10 text-crystal font-inter pb-24">
       <header className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 text-[#39FF14] mb-2 font-mono text-[10px] uppercase tracking-[0.4em]">
            <BarChart3 className="w-5 h-5 animate-pulse text-[#39FF14]" />
            Audio File Embedding Analytics Index
          </div>
          <h2 className="text-5xl font-mono font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 uppercase">
            Insights Engine
          </h2>
       </header>

       {/* Live Audio Embedding KPI Cards */}
       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Institutional IQ Gauge */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 flex justify-between items-center relative overflow-hidden shadow-[0_0_20px_rgba(139,92,246,0.05)]">
             <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8B5CF6]">Institutional IQ</span>
                <p className="text-5xl font-mono font-black text-white">{institutionalIQ}</p>
                <p className="text-[9px] font-mono text-[#39FF14] uppercase tracking-widest flex items-center gap-1">
                   <TrendingUp className="w-3.5 h-3.5" /> Derived from {totalDecisions} live decisions
                </p>
             </div>
             <div className="w-32 h-12 flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 120 30">
                   <path d={sparklineData} fill="none" stroke="#8B5CF6" strokeWidth="2.5" className="animate-pulse" />
                </svg>
             </div>
          </div>

          {/* Ingested Duration */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 flex justify-between items-center relative overflow-hidden shadow-[0_0_20px_rgba(57,255,20,0.05)]">
             <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#39FF14]">Processed Audio</span>
                <p className="text-5xl font-mono font-black text-white">{totalAudioMinutes}m</p>
                <p className="text-[9px] font-mono text-[#39FF14] uppercase tracking-widest flex items-center gap-1">
                   <TrendingUp className="w-3.5 h-3.5" /> Summed transcript chunks
                </p>
             </div>
             <div className="w-32 h-12 flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 120 30">
                   <path d="M 0,20 Q 30,5 60,15 T 120,2" fill="none" stroke="#39FF14" strokeWidth="2.5" />
                </svg>
             </div>
          </div>
       </div>

       {/* Ribbon Flow */}
       <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
          <div>
             <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#39FF14] flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Multi-Departmental Knowledge Ribbon Flow (Rank over time)
             </span>
             <p className="text-xs text-zinc-500 font-mono uppercase mt-1">Tracks rank transitions and computational volumes of core business divisions.</p>
          </div>

          <div className="relative h-48 w-full bg-black/40 border border-white/5 rounded-xl overflow-hidden p-4">
             <svg className="w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none">
                <path d="M 0,20 C 100,20 150,80 300,80 C 450,80 500,20 600,20 L 600,45 C 500,45 450,105 300,105 C 150,105 100,45 0,45 Z" fill="#39FF14" opacity="0.2" stroke="#39FF14" strokeWidth="1.5" />
                <path d="M 0,70 C 100,70 150,20 300,20 C 450,20 500,80 600,80 L 600,105 C 500,105 450,45 300,45 C 150,45 100,95 0,95 Z" fill="#8B5CF6" opacity="0.2" stroke="#8B5CF6" strokeWidth="1.5" />
             </svg>
             <div className="absolute top-4 left-6 flex flex-col justify-between h-40 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                <span>Cycle Alpha</span>
                <span>Cycle Beta</span>
             </div>
             <div className="absolute top-4 right-6 flex flex-col justify-between h-40 text-right text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                <span>1st: Core AI</span>
                <span>2nd: Product</span>
             </div>
          </div>
       </div>

       <div className="grid lg:grid-cols-2 gap-8">
          {/* Decomposition Tree */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
             <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8B5CF6] flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#8B5CF6]" /> Goal Decomposition Tree
             </span>

             <div className="space-y-4 pt-2 font-mono">
                <div 
                  onClick={() => toggleTreeNode('root')}
                  className="p-4 bg-black/60 border border-[#8B5CF6]/30 hover:border-[#8B5CF6] rounded-xl flex items-center justify-between cursor-pointer transition-all"
                >
                   <div className="space-y-1">
                      <span className="text-[8px] uppercase tracking-widest text-zinc-500">Corporate Goal</span>
                      <p className="text-xs text-white uppercase font-bold">Consolidate Institutional Memory Systems</p>
                   </div>
                   {treeExpanded.root ? <ChevronDown className="w-4 h-4 text-white" /> : <ChevronRight className="w-4 h-4 text-white" />}
                </div>

                <AnimatePresence>
                   {treeExpanded.root && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-8 space-y-4 overflow-hidden"
                      >
                         <div className="space-y-2">
                            <div 
                              onClick={() => toggleTreeNode('deptAI')}
                              className="p-3 bg-black/40 border border-white/5 hover:border-cyan-500 rounded-lg flex items-center justify-between cursor-pointer transition-all"
                            >
                               <span className="text-xs text-cyan-400">Core AI & Research</span>
                               {treeExpanded.deptAI ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                            </div>
                            {treeExpanded.deptAI && (
                               <div className="pl-6 space-y-2 text-[10px] text-zinc-400">
                                  {meetings.slice(0, 2).map((m, idx) => (
                                     <div key={idx} className="p-2 bg-black/20 rounded border border-white/5 uppercase">
                                        Session Target: {m.title}
                                     </div>
                                  ))}
                                  {meetings.length === 0 && (
                                     <div className="p-2 bg-black/20 rounded border border-white/5">No active sessions located.</div>
                                  )}
                               </div>
                            )}
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </div>

          {/* Word Cloud */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
             <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#39FF14] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#39FF14]" /> Dynamic Transcript Word Cloud
             </span>

             <div className="bg-black/60 border border-white/10 rounded-xl p-8 h-[250px] flex flex-wrap gap-4 items-center justify-center overflow-hidden select-none">
                {wordCloud.map((key, idx) => (
                   <motion.span 
                     key={idx}
                     whileHover={{ scale: 1.2, color: '#39FF14' }}
                     className={`font-mono uppercase font-black cursor-pointer transition-colors tracking-widest ${key.size} ${key.color}`}
                   >
                      {key.text}
                   </motion.span>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

export default InsightsEngine;
