import React from 'react';
import Intelligence from './Intelligence';
import { Meeting } from '../types';

interface ActionsDecisionsProps {
  meetings: Meeting[];
  onJumpToSegment: (mid: string, sid: string | undefined) => void;
}

const ActionsDecisions: React.FC<ActionsDecisionsProps> = (props) => {
  return <Intelligence {...props} />;
};

export default ActionsDecisions;