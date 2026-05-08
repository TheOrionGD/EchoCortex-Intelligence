import React, { useState, useEffect } from 'react';
import {
  Database,
  Mail,
  Lock,
  User,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Chrome,
  Facebook
} from 'lucide-react';
import { useAuthContext } from '../context/AuthContext.tsx';
import { useTheme } from '../context/ThemeContext';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { loginWithEmail, signUpWithEmail, user } = useAuthContext();
  const { theme } = useTheme();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [profileIcon, setProfileIcon] = useState('');

  // Clock state
  const [timeStr, setTimeStr] = useState('Echo 1:48 PM');

  useEffect(() => {
    if (user) {
      onLogin();
    }
  }, [user, onLogin]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTimeStr(`Echo ${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleMongoAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, username || 'Anonymous Commander');
        if (profileIcon) {
          localStorage.setItem('echo_user_avatar', profileIcon);
          window.dispatchEvent(new Event('echo_avatar_updated'));
        }
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white flex items-center justify-center p-4 sm:p-10 font-sans relative overflow-hidden w-full">
      {/* Background Decorative Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Split Glass Panel Container */}
      <div className="w-full max-w-6xl bg-black/40 border border-white/10 rounded-3xl p-6 lg:p-8 grid lg:grid-cols-12 gap-8 relative z-10 backdrop-blur-md shadow-2xl">

        {/* Left Side: Login Form (Col span 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between py-4 px-2 space-y-8">

          {/* Logo / Brand Header */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Echo Logo" className="w-10 h-10 object-contain rounded-xl" />
            <span className="font-mono font-black tracking-widest text-lg text-white">ECHO</span>
          </div>

          {/* Core Content */}
          <div className="space-y-6">

            {/* Toggle Mode */}
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
              className="text-xs font-mono uppercase tracking-widest text-[#8B5CF6] hover:text-[#39FF14] transition-colors flex items-center gap-1 font-bold"
            >
              <span>{isSignUp ? 'already have an account?..login' : 'no account..create account'}</span>
            </button>

            {/* Hook Headline */}
            <h1 className="text-3xl sm:text-4xl font-mono font-black uppercase tracking-tighter text-white leading-none">
              Building blocks for all your institutional memory needs
            </h1>

            {error && (
              <div className="border border-red-500/30 bg-red-500/10 p-4 rounded-xl flex gap-3 items-start animate-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-mono leading-relaxed uppercase tracking-tight text-red-400">{error}</p>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleMongoAuth} className="space-y-4 pt-2">
              {isSignUp && (
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. Orion Pax"
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-xs font-mono focus:border-[#39FF14]/50 focus:outline-none transition-colors"
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">mailid</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="godfrey.prof@gmail.com"
                  className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-xs font-mono focus:border-[#39FF14]/50 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">password</label>
                  {!isSignUp && (
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 hover:text-white cursor-pointer transition-colors">Forgotten Password?</span>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-xs font-mono focus:border-[#39FF14]/50 focus:outline-none transition-colors"
                  required
                />
              </div>

              {isSignUp && (
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">profile icon url link</label>
                  <input
                    type="url"
                    value={profileIcon}
                    onChange={(e) => setProfileIcon(e.target.value)}
                    placeholder="e.g. https://domain.com/avatar.jpg"
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-xs font-mono focus:border-[#39FF14]/50 focus:outline-none transition-colors"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white py-3.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(139,92,246,0.3)] mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Executing...
                  </span>
                ) : (
                  isSignUp ? 'Create Account' : 'Login'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Stunning Neural Lattice Network Directory (Col span 7) */}
        <div className="lg:col-span-7 h-[400px] lg:h-[650px] rounded-2xl relative overflow-hidden bg-black/60 shadow-inner flex items-center justify-center border border-white/10">
          {/* Main Background Image - Neural Lattice Network */}
          <img
            src="/echo_neural_network_login.png"
            alt="Futuristic Neural Lattice Network Directory"
            className="absolute inset-0 w-full h-full object-cover opacity-85 mix-blend-lighten select-none pointer-events-none"
          />

          {/* Dark Overlay gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.6)_100%)]" />

          {/* Floating Time Stamp Widget */}
          <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-[10px] font-mono text-[#39FF14]">
            {timeStr}
          </div>

          {/* Floating Menu Button Widget */}
          <div className="absolute top-6 right-6 flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">Welcome</span>
            <div className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex flex-wrap p-2 gap-[2px] items-center justify-center cursor-pointer hover:bg-white/10 transition-all">
              <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
            </div>
          </div>

          {/* Glowing Lens Flare Overlay */}
          <div className="absolute bottom-12 right-12 w-48 h-48 bg-cyan-500/20 rounded-full blur-[80px]" />
          <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-[#8B5CF6]/20 rounded-full blur-[60px]" />
        </div>

      </div>
    </div>
  );
};

export default Login;
