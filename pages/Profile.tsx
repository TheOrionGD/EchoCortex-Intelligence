import React from 'react';
import { UserProfile } from '../types';
import { SYSTEM_LOGO_URL } from '../constants/branding.ts';
import { ShieldCheck } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 max-w-3xl">
       <header className="border-b border-zinc-800 pb-10">
          <h2 className="text-4xl font-semibold tracking-tighter text-zinc-100">Personnel Identity Profile</h2>
          <p className="text-zinc-500 mt-4 font-serif italic text-base leading-relaxed">System-assigned node credentials.</p>
       </header>

       <div className="p-16 border border-zinc-800 rounded-sm bg-zinc-900/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <img src={SYSTEM_LOGO_URL} alt="Background Logo" className="w-48 h-48 object-contain" />
          </div>
          
          <div className="flex items-center gap-12 mb-20 relative z-10">
             <div className="relative group">
                <div className="w-32 h-32 bg-zinc-950 border border-zinc-800 rounded-sm flex items-center justify-center text-5xl font-bold text-zinc-200 shadow-inner overflow-hidden">
                  {user.avatar ? (
                    <span className="group-hover:opacity-0 transition-opacity">{user.avatar}</span>
                  ) : (
                    <img src={SYSTEM_LOGO_URL} alt="Brand Avatar" className="w-full h-full object-cover grayscale opacity-50" />
                  )}
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <ShieldCheck className="w-12 h-12 text-stark" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-accent p-1.5 rounded-full border-2 border-obsidian">
                   <ShieldCheck className="w-3 h-3 text-stark" />
                </div>
             </div>
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-semibold tracking-tight text-zinc-100">{user.name}</h3>
                  <span className="px-2 py-0.5 bg-accent/10 border border-accent/30 text-accent text-[8px] font-black uppercase tracking-widest rounded-sm">Verified Node</span>
                </div>
                <p className="text-zinc-600 font-mono text-[12px] uppercase tracking-[0.3em]">{user.email}</p>
             </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 border-t border-zinc-800 pt-16 relative z-10">
             <div className="space-y-6">
                <label className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600">Authorized Scopes</label>
                <div className="flex flex-wrap gap-3">
                   <span className="px-4 py-2 bg-zinc-900 text-zinc-500 border border-zinc-800 rounded-sm text-[10px] font-mono uppercase tracking-widest">Global Read</span>
                   <span className="px-4 py-2 bg-zinc-900 text-zinc-500 border border-zinc-800 rounded-sm text-[10px] font-mono uppercase tracking-widest">Capture Commit</span>
                   <span className="px-4 py-2 bg-accent/5 text-accent border border-accent/20 rounded-sm text-[10px] font-mono uppercase tracking-widest">Institutional Admin</span>
                </div>
             </div>
             <div className="space-y-6">
                <label className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600">System Origin</label>
                <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                   <img src={SYSTEM_LOGO_URL} alt="Logo" className="w-5 h-5 object-contain" />
                   <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Primary Core // Echo-Alpha</span>
                </div>
             </div>
          </div>
          
          <div className="mt-20 pt-16 border-t border-zinc-800 flex justify-end relative z-10">
             <button onClick={() => alert("Identity record updated.")} className="px-10 py-4 bg-zinc-900 text-zinc-100 border border-zinc-700 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-lg active:scale-95">Update Identity</button>
          </div>
       </div>
    </div>
  );
};

export default Profile;