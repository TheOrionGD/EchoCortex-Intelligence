// Fix: Importing TranscriptSegment into the local scope so it can be used in the Meeting interface definition below.
import { TranscriptSegment } from './transcript';
export type { TranscriptSegment };

export interface ActionItem {
  id: string;
  meeting_id: string;
  owner: string;
  description: string;
  due_date?: string;
  status: 'pending' | 'completed';
  source_segment_id?: string;
  meeting_title?: string;
}

export interface Decision {
  id: string;
  meeting_id: string;
  summary: string;
  confidence_score: number;
  source_segment_id?: string;
  meeting_title?: string;
}

export interface Meeting {
  id: string;
  team_id: string;
  title: string;
  start_time: string;
  end_time?: string;
  audio_url?: string;
  created_by: string;
  created_at: string;
  segments: TranscriptSegment[];
  action_items: ActionItem[];
  decisions: Decision[];
  summarySpeechBase64?: string;
}

export type ViewState = 'auth' | 'dashboard' | 'meeting' | 'search' | 'intelligence' | 'profile' | 'admin' | 'create' | 'documents' | 'insights' | 'delta-audit' | 'entity-graph' | 'compliance-vault' | 'synapse-hub';