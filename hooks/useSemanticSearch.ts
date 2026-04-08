
import { useState } from 'react';
import { semanticSearch } from '../services/geminiService';
import { Meeting } from '../types';

export const useSemanticSearch = (meetings: Meeting[]) => {
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const search = async (query: string) => {
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      const data = await semanticSearch(query, meetings);
      setResults(data.results);
    } finally {
      setIsSearching(false);
    }
  };

  return { results, isSearching, search };
};
