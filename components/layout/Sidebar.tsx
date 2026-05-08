import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Layers, 
  Search, 
  User, 
  Lock, 
  Power,
  Cpu,
  Sparkles,
  TrendingUp,
  Activity,
  ShieldAlert,
  BarChart3,
  GitCompare,
  Network,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { ViewState } from '../../types/meeting';
import { UserProfile } from '../../types';
import { getRateLimitStatus } from '../../services/geminiService';

interface SidebarProps {
  user: UserProfile;
  viewState: ViewState;
  setViewState: (view: ViewState) => void;
  onLogout: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, viewState, setViewState, onLogout, isMobileOpen = false, onMobileClose }) => {
  const stats = getRateLimitStatus();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(() => {
    return localStorage.getItem('echo_user_avatar');
  });

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    const handleAvatarUpdate = () => {
      setAvatar(localStorage.getItem('echo_user_avatar'));
    };
    window.addEventListener('echo_avatar_updated', handleAvatarUpdate);
    return () => window.removeEventListener('echo_avatar_updated', handleAvatarUpdate);
  }, []);

  const NavButton = ({ id, icon: Icon, label }: { id: ViewState, icon: any, label: string }) => {
    const isActive = viewState === id || (id === 'dashboard' && viewState === 'meeting');
    return (
      <button 
        onClick={() => {
          setViewState(id);
          if (isMobile && onMobileClose) {
            onMobileClose();
          }
        }}
        className={`w-full flex items-center transition-all duration-300 group relative overflow-hidden ${
          isHovered ? 'px-6 py-4 gap-4' : 'px-0 py-4 justify-center gap-0'
        } ${
          isActive 
            ? 'bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400'
            : 'text-zinc-400 hover:bg-white/5 hover:text-white'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <Icon className={`w-5 h-5 transition-all duration-500 ${isActive ? 'scale-110 text-cyan-400' : 'group-hover:text-cyan-400'}`} />
        <span className={`text-xs font-mono font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
          isActive ? 'text-white' : ''
        } ${isHovered ? 'opacity-100 block' : 'opacity-0 hidden'}`}>{label}</span>
      </button>
    );
  };

  return (
    <>
      {isMobile && isMobileOpen && (
        <div 
          onClick={onMobileClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      <motion.aside 
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        animate={{ 
          x: isMobile ? (isMobileOpen ? 0 : -288) : 0,
          width: isMobile ? 288 : (isHovered ? 288 : 80)
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="fixed left-0 top-0 h-full z-40 flex flex-col glass-panel border-r border-white/10 bg-black/95 shadow-[4px_0_24px_rgba(0,0,0,0.5)]"
      >
      {/* Neural Core Header */}
      <div className="pt-8 pb-8 px-6 flex items-center gap-4 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="flex items-center gap-4 relative z-10 w-full">
          <motion.img 
            src="/logo.png"
            alt="Echo Logo"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 object-contain rounded-xl border border-[#39FF14]/30 shadow-[0_0_15px_rgba(57,255,20,0.2)] flex-shrink-0"
          />
          <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
            <h1 className="font-mono font-black tracking-tighter text-2xl uppercase text-white leading-none">
              ECHO
            </h1>
            <p className="text-[8px] font-mono tracking-[0.3em] mt-1 text-[#00FF41] font-bold uppercase flex items-center gap-1">
              <Activity className="w-2.5 h-2.5 animate-pulse" /> Core Online
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto pt-6 pb-6 space-y-1">
        <div className={`px-6 mb-2 flex items-center gap-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden mb-0'}`}>
          <Activity className="w-3 h-3 text-zinc-600" />
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold">Core Modules</p>
        </div>
        
        <NavButton id="dashboard" icon={Terminal} label="Command Center" />
        <NavButton id="create" icon={Cpu} label="Data Ingestion" />
        <NavButton id="intelligence" icon={Layers} label="Truth Matrix" />
        <NavButton id="search" icon={Search} label="Recall Engine" />

        <div className={`px-6 mt-6 mb-2 flex items-center gap-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden mb-0'}`}>
          <Sparkles className="w-3 h-3 text-zinc-600" />
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold">Insights & Audits</p>
        </div>

        <NavButton id="insights" icon={BarChart3} label="Insights Engine" />
        <NavButton id="delta-audit" icon={GitCompare} label="Delta Audit" />
        <NavButton id="entity-graph" icon={Network} label="Entity Graph" />
        <NavButton id="compliance-vault" icon={ShieldCheck} label="Compliance Vault" />
        <NavButton id="synapse-hub" icon={Zap} label="Synapse Hub" />

        <div className={`px-6 mt-6 mb-2 flex items-center gap-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden mb-0'}`}>
          <Lock className="w-3 h-3 text-zinc-600" />
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold">Access Controls</p>
        </div>

        <NavButton id="profile" icon={User} label="Profile Override" />
        {user.role === 'admin' && (
          <NavButton id="admin" icon={Lock} label="System Config" />
        )}

        {/* Tactical Pipeline Status */}
        <div className={`px-5 py-5 mt-8 mx-4 rounded-xl glass-panel border-white/10 relative overflow-hidden group transition-all duration-300 bg-black/40 ${
          isHovered ? 'opacity-100 block' : 'opacity-0 hidden'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">Pipeline Status</span>
            </div>
            <motion.span 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded"
            >
              ACTIVE
            </motion.span>
          </div>
          
          <div className="space-y-3 relative z-10">
            <div>
              <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest mb-1.5 text-zinc-400">
                <span>Vector Load</span>
                <span className="text-cyan-400">{stats.totalMinutesProcessed}%</span>
              </div>
              <div className="w-full bg-black h-1.5 rounded-full overflow-hidden border border-white/10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.totalMinutesProcessed}%` }}
                  className="bg-cyan-400 h-full" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Profile */}
      <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
        {isHovered ? (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#00FF41]/30 bg-[#00FF41]/10 text-[#00FF41] overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-xs font-inter font-bold tracking-tight text-white">{user.name}</p>
                <p className="text-[9px] font-mono uppercase tracking-widest text-[#00FF41] flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" /> Verified
                </p>
              </div>
            </div>
            <button 
              onClick={onLogout} 
              className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
            >
              <Power className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button 
              onClick={onLogout} 
              className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
            >
              <Power className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  </>
);
};

export default Sidebar;