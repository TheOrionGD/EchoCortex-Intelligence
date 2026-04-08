import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-[10px] font-mono uppercase tracking-widest pl-1 text-zinc-500">
          {label}
        </label>
      )}
      <input 
        className={`w-full px-4 py-4 bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-zinc-600 transition-colors rounded-sm text-sm ${error ? 'border-red-500/50' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-[9px] font-mono text-red-500 uppercase tracking-tight">{error}</p>}
    </div>
  );
};