import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Sparkles, Loader2, Network } from 'lucide-react';
import { chatWithMeeting } from '../../services/geminiService';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

export const ChatWithNotes: React.FC<{ meetingId: string }> = ({ meetingId }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: query };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsTyping(true);

    try {
      const reply = await chatWithMeeting(meetingId, userMessage.text);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: reply }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: `Connection Error: ${error.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="glass-panel p-6 rounded-2xl flex flex-col h-[600px] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="flex items-center justify-between border-b border-slate/50 pb-4 mb-4">
        <div className="flex items-center gap-3 text-[10px] font-space font-black uppercase tracking-[0.3em] text-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
          <Network className="w-4 h-4 animate-pulse-fast" /> Neural Recall Interface
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-ping" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-ping" style={{ animationDelay: '200ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-ping" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-6 mb-4 pr-2 custom-scrollbar relative z-10">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-20 h-20 rounded-full border border-cyan/30 flex items-center justify-center bg-cyan/5 shadow-neon-cyan relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.2)_0%,transparent_60%)] animate-pulse" />
                <Sparkles className="w-8 h-8 text-cyan" />
              </div>
              <p className="text-[10px] font-space uppercase tracking-[0.4em] text-center text-silver">
                Neural link established.<br/><span className="text-cyan">Query vector space now.</span>
              </p>
            </motion.div>
          ) : (
            messages.map(msg => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded border border-cyan/50 bg-cyan/10 flex items-center justify-center shrink-0 shadow-neon-cyan">
                    <Sparkles className="w-4 h-4 text-cyan" />
                  </div>
                )}
                <div 
                  className={`p-4 text-sm max-w-[85%] leading-relaxed font-inter ${
                    msg.role === 'user' 
                      ? 'bg-obsidian border border-slate/50 text-crystal rounded-t-xl rounded-bl-xl shadow-lg' 
                      : 'bg-cyan/5 border border-cyan/30 text-crystal rounded-r-xl rounded-bl-xl shadow-[inset_0_0_15px_rgba(0,240,255,0.05)] text-glow-cyan'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))
          )}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 justify-start">
               <div className="w-8 h-8 rounded border border-cyan/50 bg-cyan/10 flex items-center justify-center shrink-0 shadow-neon-cyan">
                 <Loader2 className="w-4 h-4 text-cyan animate-spin" />
               </div>
               <div className="p-4 bg-obsidian border border-cyan/20 rounded-r-xl rounded-bl-xl flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-cyan animate-bounce" />
                 <span className="w-2 h-2 rounded-full bg-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                 <span className="w-2 h-2 rounded-full bg-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                 <span className="text-[9px] font-space uppercase tracking-[0.2em] text-cyan ml-2 animate-pulse">Extracting semantic meaning...</span>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSend} className="relative mt-auto z-10 group">
        <div className="absolute inset-0 bg-cyan/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <input 
          type="text" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="ENTER QUERY COMMAND..."
          className="w-full bg-obsidian/80 backdrop-blur border border-slate/50 focus:border-cyan p-4 pl-6 pr-16 text-sm text-crystal outline-none transition-all placeholder:text-slate font-space uppercase tracking-widest rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] focus:shadow-neon-cyan"
        />
        <button 
          type="submit" 
          disabled={!query.trim() || isTyping} 
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-cyan/10 text-cyan rounded hover:bg-cyan hover:text-obsidian disabled:opacity-50 transition-all shadow-neon-cyan"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </section>
  );
};
