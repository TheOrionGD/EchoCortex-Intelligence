import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Link2, Settings, RefreshCw, BarChart2 } from 'lucide-react';

const SynapseHub: React.FC = () => {
  const [jiraConnected, setJiraConnected] = useState(false);
  const [slackConnected, setSlackConnected] = useState(true);
  const [githubConnected, setGithubConnected] = useState(false);

  const metrics = [
    { service: 'Hugging Face Whisper STT', status: 'Optimal', latency: '420ms', throughput: '98.5%' },
    { service: 'Sentence-Transformers Embedding', status: 'Optimal', latency: '35ms', throughput: '99.9%' },
    { service: 'Groq Llama 3.1 8B Inference', status: 'Optimal', latency: '120ms', throughput: '97.2%' },
    { service: 'Hugging Face MMS TTS Synthesis', status: 'Optimal', latency: '310ms', throughput: '99.2%' },
  ];

  return (
    <div className="space-y-12 relative z-10 text-crystal font-inter pb-24">
       <header className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 text-cyan-400 mb-2 font-mono text-[10px] uppercase tracking-[0.4em]">
            <Zap className="w-5 h-5 animate-pulse" />
            External Connectors & Decoupled Integrations Node
          </div>
          <h2 className="text-5xl font-mono font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-crystal to-silver uppercase">
            Synapse Hub
          </h2>
       </header>

       {/* Connectors Grid */}
       <div className="grid md:grid-cols-3 gap-8">
          {/* Jira Connector */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 bg-black/40 space-y-4 flex flex-col justify-between">
             <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">Atlassian Node</span>
                <h3 className="text-lg font-mono font-black text-white uppercase">Jira Issues</h3>
                <p className="text-[10px] text-zinc-400 font-mono leading-relaxed uppercase">Sync action-item commitments as formal development backlog tickets.</p>
             </div>
             <button 
               onClick={() => setJiraConnected(!jiraConnected)}
               className={`w-full mt-4 py-3 rounded text-[10px] font-mono font-bold uppercase tracking-widest border transition-all ${
                 jiraConnected 
                   ? 'bg-[#00FF41]/10 border-[#00FF41] text-[#00FF41]' 
                   : 'bg-black border-white/10 text-zinc-400 hover:border-white/20'
               }`}
             >
                {jiraConnected ? 'Sync Active' : 'Establish Handshake'}
             </button>
          </div>

          {/* Slack Connector */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 bg-black/40 space-y-4 flex flex-col justify-between">
             <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">Communication Node</span>
                <h3 className="text-lg font-mono font-black text-white uppercase">Slack Channel</h3>
                <p className="text-[10px] text-zinc-400 font-mono leading-relaxed uppercase">Push extracted decisions and meeting alerts directly to dedicated project feeds.</p>
             </div>
             <button 
               onClick={() => setSlackConnected(!slackConnected)}
               className={`w-full mt-4 py-3 rounded text-[10px] font-mono font-bold uppercase tracking-widest border transition-all ${
                 slackConnected 
                   ? 'bg-[#00FF41]/10 border-[#00FF41] text-[#00FF41]' 
                   : 'bg-black border-white/10 text-zinc-400 hover:border-white/20'
               }`}
             >
                {slackConnected ? 'Sync Active' : 'Establish Handshake'}
             </button>
          </div>

          {/* Contact Administration */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 bg-black/40 space-y-4 flex flex-col justify-between">
             <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#39FF14]">Support Node</span>
                <h3 className="text-lg font-mono font-black text-white uppercase">Contact Admin</h3>
                <p className="text-[10px] text-zinc-400 font-mono leading-relaxed uppercase">Reach out directly to Godfrey at the core administrative division.</p>
             </div>
             <a 
               href="mailto:godfrey.prof@gmail.com"
               className="w-full text-center mt-4 py-3 rounded text-[10px] font-mono font-bold uppercase tracking-widest border border-white/10 text-zinc-400 bg-black hover:border-[#39FF14] hover:text-[#39FF14] transition-all"
             >
                Contact to Administration
             </a>
          </div>
       </div>

       {/* Real-time Telemetry Latencies */}
       <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-black/40 space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 flex items-center gap-2 border-b border-white/10 pb-4">
             <BarChart2 className="w-4 h-4 animate-pulse" /> Active API Telemetry & Pipeline Diagnostics
          </span>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {metrics.map((met, idx) => (
                <div key={idx} className="p-5 bg-black/30 border border-white/5 rounded-xl space-y-3 relative overflow-hidden group hover:border-cyan-500/25 transition-all">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                      <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-[10px] font-mono font-black uppercase text-zinc-400 leading-tight">{met.service}</h4>
                      <p className="text-xl font-mono font-bold text-white tracking-tight">{met.latency}</p>
                   </div>
                   <div className="flex justify-between items-center text-[8px] font-mono uppercase tracking-widest">
                      <span className="text-[#00FF41]">{met.status}</span>
                      <span className="text-zinc-500">Uptime: {met.throughput}</span>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default SynapseHub;
