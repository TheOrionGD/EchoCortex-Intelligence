import React from 'react';

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
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-[0.25em] transition-all disabled:opacity-30 disabled:pointer-events-none border";
  
  const variants = {
    primary: "bg-accent border-accent text-stark hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]",
    stark: "bg-stark border-stark text-obsidian hover:bg-white",
    secondary: "bg-transparent border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100",
    ghost: "bg-transparent border-transparent text-zinc-600 hover:text-stark hover:bg-zinc-900/40",
    danger: "bg-transparent border-red-900/50 text-red-500 hover:bg-red-500/10"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-[8px]",
    md: "px-6 py-3 text-[10px]",
    lg: "px-10 py-5 text-[11px]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};