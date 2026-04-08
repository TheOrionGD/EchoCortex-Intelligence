
import { Type } from "@google/genai";
import { ai, MODELS } from "../config/gemini";
import { Meeting, TranscriptSegment, ActionItem, Decision } from "../types/meeting";

export class ExtractionService {
  async extractIntelligence(audioData: string, mimeType: string) {
    const response = await ai.models.generateContent({
      model: MODELS.EXTRACTION,
      contents: [
        {
          parts: [
            { inlineData: { data: audioData, mimeType } },
            { text: "Analyze this meeting audio. Extract transcript segments, action items, and key decisions." }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            segments: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  speaker: { type: Type.STRING },
                  text: { type: Type.STRING },
                  start_time: { type: Type.NUMBER },
                  end_time: { type: Type.NUMBER }
                }
              }
            },
            actionItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  description: { type: Type.STRING },
                  owner: { type: Type.STRING },
                  source_segment_index: { type: Type.INTEGER }
                }
              }
            },
            decisions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  summary: { type: Type.STRING },
                  confidence: { type: Type.NUMBER },
                  source_segment_index: { type: Type.INTEGER }
                }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}');
  }
}
