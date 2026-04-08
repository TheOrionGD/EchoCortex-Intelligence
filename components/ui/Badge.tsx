
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'amber' | 'zinc';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'zinc' }) => {
  const styles = {
    zinc: "bg-zinc-900 text-zinc-500 border-zinc-800",
    cyan: "bg-cyan-950/20 text-cyan-400/70 border-cyan-400/10",
    amber: "bg-amber-950/20 text-amber-400/70 border-amber-400/10"
  };

  return (
    <span className={`px-2 py-0.5 border rounded-sm text-[9px] font-mono uppercase tracking-widest ${styles[variant]}`}>
      {children}
    </span>
  );
};
