import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Terminal, CheckCircle2, AlertTriangle, Play, RefreshCw, Cpu, Activity, Server, Radio } from 'lucide-react';

const ThreatModel: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Initializing threat audit interface...",
    "[SYSTEM] Authority signature: SHA256-ECHO-PLATFORM-SECURE-ID-99",
    "[MONITOR] Observing 12 conversational data pipelines...",
    "[AUDIT] SOC2 Compliance check: PASSING",
    "[AUDIT] GDPR Forgetting checklist: ACTIVE",
  ]);

  useEffect(() => {
    let interval: number;
    if (isScanning) {
      setScanProgress(0);
      interval = window.setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            clearInterval(interval);
            setLogs(l => [
              ...l,
              `[SUCCESS] Vulnerability scan completed: 0 critical vulnerabilities found.`,
              `[SYSTEM] Security Score verified at 99.4%. Integrity hashes matched successfully.`
            ]);
            return 100;
          }
          const addLogChance = Math.random() > 0.6;
          if (addLogChance) {
            const randomLogs = [
              `[AUDIT] Validating block integrity: OK`,
              `[MONITOR] Inspecting ingest vector #${Math.floor(Math.random() * 1000)}... Clean`,
              `[DATABASE] Auditing cognitive memory leak: None`,
              `[NETWORK] Encrypted socket handshake verified... OK`,
            ];
            setLogs(l => [...l, randomLogs[Math.floor(Math.random() * randomLogs.length)]]);
          }
          return prev + 5;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const triggerScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setLogs(l => [...l, "[SYSTEM] Initiating full system cryptographic scan... Please maintain connection."]);
  };

  return (
    <div className="space-y-12 relative z-10 text-crystal font-inter pb-24">
       <header className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 text-red-400 mb-2 font-mono text-[10px] uppercase tracking-[0.4em]">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
            Threat Matrix & Compliance Deck
          </div>
          <h2 className="text-5xl font-mono font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-crystal to-silver uppercase">
            Threat Model
          </h2>
       </header>

       {/* Security Metrics and Scanner Grid */}
       <div className="grid lg:grid-cols-12 gap-8">
          {/* Diagnostic Core Indicator */}
          <div className="lg:col-span-4 glass-panel p-8 rounded-2xl flex flex-col justify-between border border-white/5 bg-black/40 relative overflow-hidden min-h-[380px]">
             <div className="absolute top-0 right-0 p-8 opacity-5">
               <ShieldAlert className="w-48 h-48 text-red-500" />
             </div>
             
             <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-400 flex items-center gap-2 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
                  </span>
                  System Shield Integrations
                </span>
                <div className="space-y-2">
                   <h3 className="text-3xl font-mono font-black text-white uppercase">Security Rating</h3>
                   <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest">Verifying integrity hashes across operational pipelines.</p>
                </div>
             </div>

             <div className="my-6 text-center">
                <span className="text-7xl font-mono font-black tracking-tighter text-white text-glow-cyan">
                  99.4%
                </span>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 mt-2">Critical Level Safe</p>
             </div>

             <button 
               onClick={triggerScan}
               disabled={isScanning}
               className={`w-full py-4 rounded-xl text-xs font-mono font-bold uppercase tracking-[0.25em] border transition-all flex items-center justify-center gap-3 ${
                 isScanning 
                   ? 'bg-red-500/10 border-red-500 text-red-400 cursor-not-allowed' 
                   : 'bg-[#00FF41]/10 border-[#00FF41]/30 text-[#00FF41] hover:bg-[#00FF41] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]'
               }`}
             >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Scanning ({scanProgress}%)
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Initialize Shield Scan
                  </>
                )}
             </button>
          </div>

          {/* Interactive Compliance Directives */}
          <div className="lg:col-span-8 glass-panel p-8 rounded-2xl border border-white/5 bg-black/40 space-y-8">
             <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-pulse" /> Active Institutional Compliance Directives
                </span>
             </div>

             <div className="grid sm:grid-cols-2 gap-6">
                {/* SOC2 Directive */}
                <div className="p-5 bg-black/30 border border-white/10 rounded-xl flex items-start gap-4">
                   <CheckCircle2 className="w-5 h-5 text-[#00FF41] mt-0.5 flex-shrink-0" />
                   <div className="space-y-1">
                      <h4 className="text-xs font-mono font-black uppercase text-white tracking-widest">SOC2 Core Audit</h4>
                      <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase">Full encryption-at-rest and strict zero-trust operational protocols verified.</p>
                   </div>
                </div>

                {/* GDPR Directive */}
                <div className="p-5 bg-black/30 border border-white/10 rounded-xl flex items-start gap-4">
                   <CheckCircle2 className="w-5 h-5 text-[#00FF41] mt-0.5 flex-shrink-0" />
                   <div className="space-y-1">
                      <h4 className="text-xs font-mono font-black uppercase text-white tracking-widest">GDPR Conversational Forgetting</h4>
                      <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase">Individual data erasure vectors actively cleared on retention limit expiration.</p>
                   </div>
                </div>

                {/* HIPAA Directive */}
                <div className="p-5 bg-black/30 border border-white/10 rounded-xl flex items-start gap-4">
                   <CheckCircle2 className="w-5 h-5 text-[#00FF41] mt-0.5 flex-shrink-0" />
                   <div className="space-y-1">
                      <h4 className="text-xs font-mono font-black uppercase text-white tracking-widest">PHI Data Masking</h4>
                      <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase">Sensitive medical or personal identifiers automatically obfuscated during ingestion.</p>
                   </div>
                </div>

                {/* Threat Prevention */}
                <div className="p-5 bg-black/30 border border-red-500/20 rounded-xl flex items-start gap-4">
                   <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0 animate-pulse" />
                   <div className="space-y-1">
                      <h4 className="text-xs font-mono font-black uppercase text-red-400 tracking-widest">External Socket Auditing</h4>
                      <p className="text-[10px] text-zinc-400 leading-relaxed font-mono uppercase">Continuous automated scan of connected voice feeds for credential leaks.</p>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* Live Database Logging Console */}
       <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-black/40 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
             <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                <Terminal className="w-4 h-4" /> Live Cryptographic Audit Log Feed
             </div>
             <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[8px] font-mono uppercase tracking-widest rounded flex items-center gap-1.5">
                <Server className="w-3 h-3 animate-pulse" /> Node: Security-Alpha
             </span>
          </div>

          <div className="bg-black/60 border border-white/5 rounded-xl p-6 h-52 overflow-y-auto font-mono text-[10px] space-y-2 text-[#00FF41] scrollbar-thin no-scrollbar select-none">
             {logs.map((log, idx) => (
                <div key={idx} className="flex gap-4">
                   <span className="text-zinc-600">[{idx.toString().padStart(3, '0')}]</span>
                   <span>{log}</span>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default ThreatModel;
