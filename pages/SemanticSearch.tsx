import React from 'react';
import Search from './Search';
import { Meeting, TranscriptSegment } from '../types';

interface SemanticSearchProps {
  query: string;
  results: { meetingId: string, segment: TranscriptSegment, score: number }[];
  isSearching: boolean;
  onSearch: (q: string) => void;
  onJumpToSegment: (mid: string, sid: string | undefined) => void;
  meetings: Meeting[];
}

const SemanticSearch: React.FC<SemanticSearchProps> = (props) => {
  return <Search {...props} />;
};

export default SemanticSearch;