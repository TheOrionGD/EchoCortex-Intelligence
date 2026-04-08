import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Mail, 
  Lock, 
  Phone, 
  Key, 
  Loader2, 
  AlertCircle,
  ShieldCheck,
  Chrome,
  Sun,
  Moon
} from 'lucide-react';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult 
} from 'firebase/auth';
import { auth } from '../services/firebase.ts';
import { useAuthContext } from '../context/AuthContext.tsx';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/Button.tsx';
import { Input } from '../components/ui/Input.tsx';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { loginWithGoogle, loginWithEmail, signUpWithEmail, user } = useAuthContext();
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState<'email' | 'otp'>('email');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    if (user) {
      onLogin(); 
    }
  }, [user, onLogin]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, username);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google proxy authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      setupRecaptcha();
      const verifier = (window as any).recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, verifier);
      setConfirmationResult(result);
    } catch (err: any) {
      setError(err.message || 'Failed to transmit secure code.');
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
        (window as any).recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    setLoading(true);
    setError(null);
    try {
      await confirmationResult.confirm(otp);
    } catch (err: any) {
      setError('Invalid OTP code detected.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-obsidian text-zinc-400' : 'bg-white text-gray-900'} flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden`}>
      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className={`absolute top-6 right-6 p-3 rounded-lg transition-colors z-10 ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-600'}`}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      
      <div id="recaptcha-container"></div>
      
      {/* Dynamic Background Elements */}
      <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] ${theme === 'dark' ? 'bg-accent/5' : 'bg-blue-100/50'} blur-[120px] rounded-full pointer-events-none`}></div>
      <div className={`absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] ${theme === 'dark' ? 'bg-accent/3' : 'bg-blue-50/30'} blur-[100px] rounded-full pointer-events-none`}></div>

      <div className="w-full max-w-md space-y-10 z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {/* Institutional Branding */}
        <div className="text-center space-y-4">
          <div className={`inline-flex p-5 border rounded mb-2 relative group backdrop-blur-sm ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/40' : 'border-gray-300 bg-white/40'}`}>
            <BrainCircuit className={`w-12 h-12 group-hover:scale-110 transition-transform duration-500 ${theme === 'dark' ? 'text-stark' : 'text-gray-900'}`} />
          </div>
          <h1 className={`text-4xl font-black tracking-tighter uppercase italic ${theme === 'dark' ? 'text-stark' : 'text-gray-900'}`}>Echo Institutional</h1>
          <p className={`text-[10px] font-mono uppercase tracking-[0.5em] ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-500'}`}>Secure Node Authentication</p>
        </div>

        {/* Tab Switcher */}
        <div className={`flex border p-1 rounded-sm ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-100/50 border-gray-300'}`}>
          <button 
            onClick={() => { setMode('email'); setError(null); }}
            className={`flex-1 py-3 text-[10px] font-mono uppercase tracking-widest transition-all rounded-sm ${mode === 'email' ? (theme === 'dark' ? 'bg-zinc-800 text-stark shadow-lg' : 'bg-white text-gray-900 shadow-lg') : (theme === 'dark' ? 'text-zinc-600 hover:text-zinc-400' : 'text-gray-500 hover:text-gray-700')}`}
          >
            Terminal Access
          </button>
          <button 
            onClick={() => { setMode('otp'); setError(null); }}
            className={`flex-1 py-3 text-[10px] font-mono uppercase tracking-widest transition-all rounded-sm ${mode === 'otp' ? (theme === 'dark' ? 'bg-zinc-800 text-stark shadow-lg' : 'bg-white text-gray-900 shadow-lg') : (theme === 'dark' ? 'text-zinc-600 hover:text-zinc-400' : 'text-gray-500 hover:text-gray-700')}`}
          >
            Secure Link (OTP)
          </button>
        </div>

        {/* Core Auth Surface */}
        <div className={`border p-10 space-y-8 shadow-2xl relative overflow-hidden backdrop-blur-md ${theme === 'dark' ? 'bg-carbon border-zinc-900' : 'bg-white border-gray-200'}`}>
          {error && (
            <div className={`border p-4 flex gap-3 items-start animate-in slide-in-from-top-2 ${theme === 'dark' ? 'bg-red-500/10 border-red-900/30' : 'bg-red-50 border-red-200'}`}>
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className={`text-[11px] font-mono leading-relaxed uppercase tracking-tight ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
            </div>
          )}

          {mode === 'email' ? (
            <form onSubmit={handleEmailAuth} className="space-y-6">
              {isSignUp && (
                <Input 
                  label="Node Alias (Display Name)" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Unit_Alpha"
                  required
                />
              )}
              <Input 
                label="System Identifier (Email)" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="node@echo-intel.ai"
                required
              />
              <Input 
                label="Security Token (Password)" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              
              <Button 
                type="submit" 
                variant="stark" 
                className="w-full py-5 text-xs font-black"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isSignUp ? 'Request Provisioning' : 'Authenticate Identity')}
              </Button>

              <div className="pt-2 text-center">
                <button 
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 hover:text-accent transition-colors"
                >
                  {isSignUp ? 'Existing Node? Return to Terminal' : 'New Identity? Register Node'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {!confirmationResult ? (
                <form onSubmit={handleSendOtp} className="space-y-6">
                  <Input 
                    label="Mobile Link (International Format)" 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+15550000000"
                    required
                  />
                  <Button 
                    type="submit" 
                    variant="stark" 
                    className="w-full py-5 text-xs font-black"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Transmit Verification'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <Input 
                    label="6-Digit Authorization Code" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="000000"
                    required
                  />
                  <Button 
                    type="submit" 
                    variant="stark" 
                    className="w-full py-5 text-xs font-black"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify Secure Connection'}
                  </Button>
                  <button 
                    type="button"
                    onClick={() => setConfirmationResult(null)}
                    className="w-full text-[10px] font-mono uppercase tracking-widest text-zinc-600 hover:text-zinc-400"
                  >
                    Recalibrate (Resend Code)
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
            <div className="relative flex justify-center"><span className="bg-carbon px-4 text-[9px] font-mono text-zinc-700 uppercase tracking-[0.4em]">Protocol Proxy</span></div>
          </div>

          <button 
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full py-4 bg-zinc-900/60 border border-zinc-800 text-stark text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <Chrome className="w-4 h-4 text-accent" />
            Authenticate via Intelligence Proxy
          </button>
        </div>

        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 text-zinc-700">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[9px] font-mono uppercase tracking-[0.4em]">End-to-End Cryptography Active</span>
          </div>
          <p className="text-[11px] font-serif italic leading-relaxed opacity-50 max-w-[280px] mx-auto text-zinc-500">
            "Echo transforms spoken artifacts into immutable institutional intelligence."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
