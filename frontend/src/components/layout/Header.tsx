import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, actions }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-12 mb-12 gap-8">
      <div className="space-y-4">
        <h2 className="text-6xl font-black tracking-tighter text-stark uppercase">{title}</h2>
        {subtitle && (
          <p className="text-zinc-500 font-medium text-sm leading-relaxed max-w-2xl italic">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex gap-4">{actions}</div>}
    </header>
  );
};

export default Header;