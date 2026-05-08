import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '../types';
import { ShieldCheck, Zap, Activity, Cpu, QrCode } from 'lucide-react';
import { getRateLimitStatus } from '../services/geminiService';
import { mongoDB } from '../services/mongodbAuthService';

interface ProfileProps {
  user: UserProfile;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const stats = getRateLimitStatus();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [scanPulse, setScanPulse] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(() => {
    return localStorage.getItem('echo_user_avatar');
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result?.toString();
        if (base64) {
          setAvatar(base64);
          localStorage.setItem('echo_user_avatar', base64);
          
          try {
            await mongoDB.updateAvatar(user.email, base64);
            const session = localStorage.getItem('mongodb_active_session');
            if (session) {
              const activeUser = JSON.parse(session);
              activeUser.avatar = base64;
              localStorage.setItem('mongodb_active_session', JSON.stringify(activeUser));
            }
          } catch (err) {
            console.error("Failed to sync avatar with MongoDB:", err);
          }

          window.dispatchEvent(new Event('echo_avatar_updated'));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateScan = () => {
    setScanPulse(true);
    setTimeout(() => {
      setScanPulse(false);
      setShowPaymentModal(false);
      alert("Neural handshake complete. Upgrade authorized.");
    }, 3000);
  };

  return (
    <div className="space-y-16 relative z-10 text-crystal font-inter pb-24">
       <header className="border-b border-slate/50 pb-10">
          <div className="flex items-center gap-3 text-cyan mb-2">
            <Cpu className="w-5 h-5 animate-pulse" />
            <span className="text-[10px] font-space uppercase tracking-[0.4em]">Enterprise Access Deck</span>
          </div>
          <h2 className="text-5xl font-space font-black tracking-tighter text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-crystal to-silver uppercase">
            Control Node
          </h2>
       </header>

       <div className="glass-panel p-12 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck className="w-48 h-48 text-cyan" />
          </div>
          <div className="absolute inset-0 bg-neural-gradient opacity-30 z-[-1]" />
          
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16 relative z-10">
             <div className="relative">
                <label htmlFor="profile-upload" className="w-32 h-32 bg-obsidian border border-cyan/30 rounded-xl flex items-center justify-center text-5xl font-black text-crystal shadow-neon-cyan overflow-hidden relative cursor-pointer hover:border-cyan transition-all group/avatar">
                   <input type="file" id="profile-upload" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                   {avatar ? (
                     <img src={avatar} alt="Profile Icon" className="w-full h-full object-cover relative z-10" />
                   ) : (
                     <>
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.2)_0%,transparent_70%)] animate-pulse" />
                       <div className="relative z-10">{user.name.split(' ').map(n => n[0]).join('')}</div>
                     </>
                   )}
                   <div className="absolute inset-0 bg-black/75 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity z-20 text-[10px] font-space uppercase tracking-widest text-cyan font-bold">
                     Override Icon
                   </div>
                </label>
                <div className="absolute -bottom-3 -right-3 bg-cyan p-2.5 rounded-full border-4 border-obsidian shadow-neon-cyan">
                   <Zap className="w-5 h-5 text-obsidian" />
                </div>
             </div>
             <div className="space-y-3 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                   <h3 className="text-4xl font-space font-black tracking-tight uppercase text-glow-cyan">{user.name}</h3>
                   <span className="px-3 py-1 bg-cyan/20 border border-cyan/40 text-cyan text-[9px] font-space font-bold uppercase tracking-[0.3em] rounded shadow-neon-cyan self-center">
                     Quantum Executive
                   </span>
                </div>
                <p className="text-silver font-space text-[12px] uppercase tracking-[0.3em] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan animate-pulse" /> {user.email}
                </p>
             </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 border-t border-slate/50 pt-10 relative z-10">
             <div className="space-y-4">
                <label className="text-[10px] font-space uppercase tracking-[0.4em] text-cyan">Authorized Nodes</label>
                <div className="flex flex-wrap gap-4">
                   <span className="px-4 py-2 bg-obsidian text-silver border border-slate/50 rounded text-[9px] font-space uppercase tracking-[0.2em]">Data Ingest</span>
                   <span className="px-4 py-2 bg-obsidian text-silver border border-slate/50 rounded text-[9px] font-space uppercase tracking-[0.2em]">Neural Engine</span>
                   <span className="px-4 py-2 bg-cyan/10 text-cyan border border-cyan/30 shadow-neon-cyan rounded text-[9px] font-space font-bold uppercase tracking-[0.2em]">Vector Operations</span>
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-space uppercase tracking-[0.4em] text-cyan">Processing Core</label>
                <div className="flex items-center gap-4 px-5 py-4 bg-obsidian border border-slate/50 rounded">
                   <Activity className="w-5 h-5 text-cyan animate-pulse-fast" />
                   <span className="text-xs font-space uppercase tracking-[0.2em] text-silver">{stats.activeModel}</span>
                </div>
             </div>
          </div>
       </div>

       {/* SaaS Subscription Billing Panel */}
       <div className="glass-panel p-12 rounded-2xl relative overflow-hidden mt-12">
          <header className="border-b border-slate/50 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
             <div>
                <h3 className="text-4xl font-space font-black tracking-tighter text-glow-violet text-transparent bg-clip-text bg-gradient-to-r from-crystal to-silver uppercase">Resource Allocation</h3>
                <p className="text-silver mt-2 font-space text-[10px] uppercase tracking-widest">Manage intelligence pipeline capacity.</p>
             </div>
             <span className="px-4 py-1.5 bg-violet/20 border border-violet/40 text-violet text-[10px] font-space font-bold uppercase tracking-[0.3em] rounded shadow-neon-violet">
               Tier: Intelligence Operator
             </span>
          </header>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
             {/* Base Tier */}
             <motion.div whileHover={{ scale: 1.02 }} className="p-8 bg-obsidian border border-slate/50 rounded-xl flex flex-col justify-between">
                <div>
                   <h4 className="text-xs font-space font-bold uppercase tracking-widest text-silver mb-2">Base Node</h4>
                   <p className="text-4xl font-space font-black text-crystal mb-6">$0 <span className="text-xs text-slate">/cycle</span></p>
                   <ul className="text-[10px] font-space text-silver space-y-3 uppercase tracking-widest">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-slate rounded-full"/> 2 GB Processing</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-slate rounded-full"/> Standard Network</li>
                   </ul>
                </div>
                <button className="w-full mt-8 py-4 bg-slate/20 text-slate rounded text-[10px] font-space uppercase tracking-[0.2em] font-bold cursor-not-allowed">Access Denied</button>
             </motion.div>

             {/* Pro Tier (Active) */}
             <motion.div whileHover={{ scale: 1.05 }} className="p-8 bg-cyan/10 border-2 border-cyan rounded-xl flex flex-col justify-between shadow-neon-cyan relative">
                <div className="absolute top-4 right-4 px-2 py-1 bg-cyan text-obsidian text-[8px] font-space font-black tracking-widest uppercase rounded shadow-[0_0_10px_rgba(0,240,255,0.8)] animate-pulse">ACTIVE</div>
                <div>
                   <h4 className="text-xs font-space font-bold uppercase tracking-widest text-cyan mb-2">Intelligence Operator</h4>
                   <p className="text-4xl font-space font-black text-crystal mb-6">$49 <span className="text-xs text-cyan">/cycle</span></p>
                   <ul className="text-[10px] font-space text-crystal space-y-3 uppercase tracking-widest">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan rounded-full shadow-neon-cyan"/> High-speed extraction</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan rounded-full shadow-neon-cyan"/> Neural search enabled</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan rounded-full shadow-neon-cyan"/> 50 GB Processing</li>
                   </ul>
                </div>
                <button className="w-full mt-8 py-4 bg-cyan text-obsidian rounded text-[10px] font-space uppercase tracking-[0.2em] font-black shadow-neon-cyan hover:bg-cyan/80 transition-colors">Current Allocation</button>
             </motion.div>

             {/* Enterprise Tier */}
             <motion.div whileHover={{ scale: 1.02 }} className="p-8 bg-obsidian border border-slate/50 rounded-xl flex flex-col justify-between hover:border-violet/50 transition-colors group">
                <div>
                   <h4 className="text-xs font-space font-bold uppercase tracking-widest text-violet group-hover:text-glow-violet mb-2">Neural Commander</h4>
                   <p className="text-4xl font-space font-black text-crystal mb-6">$199 <span className="text-xs text-slate">/cycle</span></p>
                   <ul className="text-[10px] font-space text-silver space-y-3 uppercase tracking-widest">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-violet rounded-full"/> Unlimited compute</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-violet rounded-full"/> Dedicated AI Core</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-violet rounded-full"/> Priority routing</li>
                   </ul>
                </div>
                <button onClick={() => setShowPaymentModal(true)} className="w-full mt-8 py-4 bg-slate/20 hover:bg-violet hover:text-crystal border border-transparent hover:border-violet/50 text-silver rounded text-[10px] font-space uppercase tracking-[0.2em] font-bold transition-all hover:shadow-neon-violet">Upgrade Override</button>
             </motion.div>
          </div>
       </div>

       {/* Holographic QR Payment Modal */}
       <AnimatePresence>
         {showPaymentModal && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 backdrop-blur-md p-4"
           >
             <motion.div 
               initial={{ scale: 0.9, y: 50 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 50 }}
               className="glass-panel border-cyan/50 rounded-2xl max-w-lg w-full overflow-hidden shadow-neon-cyan relative"
             >
               {scanPulse && (
                 <motion.div 
                   initial={{ top: '-10%' }}
                   animate={{ top: '110%' }}
                   transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
                   className="absolute left-0 right-0 h-4 bg-cyan/50 shadow-[0_0_30px_rgba(0,240,255,1)] z-20 pointer-events-none"
                 />
               )}
               <div className="p-10 text-center space-y-8 relative z-10">
                 <div className="flex justify-center">
                   <div className="w-20 h-20 rounded-full border-2 border-cyan flex items-center justify-center bg-cyan/10 shadow-neon-cyan">
                     <QrCode className="w-10 h-10 text-cyan animate-pulse-fast" />
                   </div>
                 </div>
                 
                 <div>
                   <h3 className="text-3xl font-space font-black text-glow-cyan uppercase tracking-tighter">Neural Commander</h3>
                   <p className="text-cyan/70 font-space text-[10px] mt-2 uppercase tracking-[0.4em]">Establish Handshake Protocol</p>
                 </div>

                 <div className="bg-obsidian/80 p-6 rounded-xl inline-block mx-auto border-2 border-cyan/30 shadow-neon-cyan relative">
                   <img 
                     src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ECHO_PROTOCOL_UPGRADE_199&color=00F0FF&bgcolor=1F2937" 
                     alt="Holographic QR" 
                     className="w-48 h-48 mix-blend-screen opacity-90"
                   />
                 </div>
                 
                 <p className="text-silver text-[10px] font-space uppercase tracking-[0.2em]">Scan to authorize resource expansion.</p>
               </div>

               <div className="flex border-t border-slate/50">
                 <button 
                   onClick={() => setShowPaymentModal(false)}
                   className="flex-1 py-6 text-[10px] font-space font-black uppercase tracking-[0.3em] text-slate hover:text-crystal hover:bg-slate/20 transition-all border-r border-slate/50"
                 >
                   Abort
                 </button>
                 <button 
                   onClick={simulateScan}
                   className="flex-1 py-6 text-[10px] font-space font-black uppercase tracking-[0.3em] text-cyan hover:bg-cyan/10 transition-all shadow-[inset_0_0_15px_rgba(0,240,255,0.2)]"
                 >
                   Initiate Scan
                 </button>
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};

export default Profile;