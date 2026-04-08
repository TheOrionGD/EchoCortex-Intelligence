import React from 'react';
import { Loader2, Activity } from 'lucide-react';

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ message = 'Synchronizing...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="relative">
        <Loader2 className="w-16 h-16 text-accent animate-spin opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Activity className="w-6 h-6 text-accent animate-pulse" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-stark font-bold text-sm tracking-widest uppercase">Cortex Pipeline Active</p>
        <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-[0.4em] animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-md flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;