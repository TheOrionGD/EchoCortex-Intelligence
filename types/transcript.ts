export interface TranscriptSegment {
  id: string;
  meeting_id: string;
  speaker: string;
  text: string;
  start_time: number; // in seconds
  end_time: number; // in seconds
}
