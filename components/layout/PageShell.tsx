import React from 'react';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export const PageShell: React.FC<PageShellProps> = ({ children, className = '' }) => {
  return (
    <div className={`animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-16 ${className}`}>
      {children}
    </div>
  );
};

export default PageShell;