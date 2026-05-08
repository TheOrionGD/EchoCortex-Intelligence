import mongoose, { Document, Schema } from 'mongoose';

export interface IMeeting extends Document {
  title: string;
  transcript: string;
  embedding: number[]; // Stores Hugging Face Sentence Transformer Embeddings
  segments: any[];
  actionItems: any[];
  decisions: any[];
  summarySpeechBase64?: string; // Optional Hugging Face TTS audio summary base64
  createdAt: Date;
}

const meetingSchema = new Schema<IMeeting>({
  title: { type: String, default: 'SaaS Architecture Review' },
  transcript: { type: String, required: true },
  embedding: { type: [Number], default: [] }, // Embedded semantic array
  segments: { type: [Object], default: [] },
  actionItems: { type: [Object], default: [] },
  decisions: { type: [Object], default: [] },
  summarySpeechBase64: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const Meeting = mongoose.model<IMeeting>('Meeting', meetingSchema);
