
export interface TranscriptSegment {
  id: string;
  meeting_id: string;
  speaker: string;
  text: string;
  start_time: number;
  end_time: number;
}

export interface ActionItem {
  id: string;
  meeting_id: string;
  owner: string;
  description: string;
  due_date?: string;
  status: 'pending' | 'completed';
  source_segment_id?: string;
}

export interface Decision {
  id: string;
  meeting_id: string;
  summary: string;
  confidence_score: number;
  source_segment_id?: string;
}

export interface Meeting {
  id: string;
  team_id: string;
  title: string;
  start_time: string;
  end_time?: string;
  audio_url?: string;
  created_by: string;
  segments: TranscriptSegment[];
  action_items: ActionItem[];
  decisions: Decision[];
}
