
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className={`text-[10px] font-mono uppercase tracking-widest pl-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
          {label}
        </label>
      )}
      <input 
        className={`w-full px-4 py-4 border text-sm focus:outline-none transition-colors rounded-sm ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-200 focus:border-zinc-600' : 'bg-white border-gray-300 text-gray-900 focus:border-gray-500'} ${error ? 'border-red-500/50' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-[9px] font-mono text-red-500 uppercase tracking-tight">{error}</p>}
    </div>
  );
};
