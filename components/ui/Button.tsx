import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'stark';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const { theme } = useTheme();
  
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-[0.25em] transition-all disabled:opacity-30 disabled:pointer-events-none border";
  
  const getVariants = (theme: string) => ({
    primary: "bg-accent border-accent text-stark hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]",
    stark: theme === 'dark' ? "bg-stark border-stark text-obsidian hover:bg-white" : "bg-gray-900 border-gray-900 text-white hover:bg-gray-800",
    secondary: theme === 'dark' ? "bg-transparent border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100" : "bg-transparent border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900",
    ghost: theme === 'dark' ? "bg-transparent border-transparent text-zinc-600 hover:text-stark hover:bg-zinc-900/40" : "bg-transparent border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/40",
    danger: "bg-transparent border-red-900/50 text-red-500 hover:bg-red-500/10"
  });
  
  const sizes = {
    sm: "px-4 py-2 text-[8px]",
    md: "px-6 py-3 text-[10px]",
    lg: "px-10 py-5 text-[11px]"
  };

  return (
    <button 
      className={`${baseStyles} ${getVariants(theme)[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};