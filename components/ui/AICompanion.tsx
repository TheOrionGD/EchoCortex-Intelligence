import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Terminal } from 'lucide-react';

export const AICompanion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Neural sync stable. I am monitoring your intelligence pipeline.');

  useEffect(() => {
    const messages = [
      'Neural sync stable. I am monitoring your intelligence pipeline.',
      'You have 2 unprocessed meetings. Shall I begin extraction?',
      'Your team productivity score has increased by 14% this week.',
      'Vector space optimization complete.',
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setMessage(messages[i]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-72 glass-panel p-4 rounded-xl border border-cyan/30 shadow-neon-cyan relative"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-silver hover:text-cyan">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-cyan" />
              <span className="text-xs font-space text-cyan uppercase tracking-wider">System AI</span>
            </div>
            <p className="text-sm font-inter text-silver">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{
          y: [0, -10, 0],
          boxShadow: [
            '0 0 15px rgba(0,240,255,0.4)',
            '0 0 25px rgba(0,240,255,0.8)',
            '0 0 15px rgba(0,240,255,0.4)'
          ]
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="w-16 h-16 rounded-full bg-slate/80 backdrop-blur border-2 border-cyan/50 flex items-center justify-center cursor-pointer overflow-hidden relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-conic-gradient from-cyan/0 via-cyan/40 to-cyan/0"
        />
        <div className="absolute inset-1 bg-obsidian rounded-full flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-cyan" />
        </div>
      </motion.button>
    </div>
  );
};
