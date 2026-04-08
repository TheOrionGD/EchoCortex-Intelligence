import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SemanticSearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  defaultValue?: string;
}

export const SemanticSearchBar: React.FC<SemanticSearchBarProps> = ({ onSearch, isSearching, defaultValue }) => {
  const [query, setQuery] = React.useState(defaultValue || '');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="relative group w-full max-w-3xl">
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700 group-focus-within:text-accent transition-colors" />
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search institutional intent..." 
        className="w-full pl-16 pr-14 py-6 bg-zinc-950 border border-zinc-900 text-lg text-zinc-200 focus:outline-none focus:border-accent/40 transition-all font-sans italic tracking-tight" 
      />
      {isSearching && <Loader2 className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-accent animate-spin" />}
    </div>
  );
};

export default SemanticSearchBar;