import { GoogleGenAI, Type } from "@google/genai";
import { Meeting, TranscriptSegment, ActionItem, Decision } from "../types/meeting";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function processMeetingAudio(audioBase64: string, mimeType: string): Promise<{
  segments: TranscriptSegment[],
  actionItems: ActionItem[],
  decisions: Decision[]
}> {
  const model = 'gemini-3-pro-preview';
  
  const systemInstruction = `
    You are Echo Cortex, a specialized meeting intelligence agent.
    Convert conversational artifacts into a structured knowledge graph.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { data: audioBase64, mimeType: mimeType } },
          { text: "Analyze the session and extract intelligence." }
        ]
      },
      config: {
        systemInstruction,
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
                  confidence_score: { type: Type.NUMBER },
                  source_segment_index: { type: Type.INTEGER }
                }
              }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    const meetingId = `m-${Date.now()}`;

    const segments: TranscriptSegment[] = (data.segments || []).map((s: any, idx: number) => ({
      ...s,
      id: `seg-${meetingId}-${idx}`,
      meeting_id: meetingId
    }));

    const actionItems: ActionItem[] = (data.actionItems || []).map((a: any, idx: number) => ({
      ...a,
      id: `act-${meetingId}-${idx}`,
      meeting_id: meetingId,
      status: 'pending',
      source_segment_id: segments[a.source_segment_index]?.id
    }));

    const decisions: Decision[] = (data.decisions || []).map((d: any, idx: number) => ({
      ...d,
      id: `dec-${meetingId}-${idx}`,
      meeting_id: meetingId,
      source_segment_id: segments[d.source_segment_index]?.id
    }));

    return { segments, actionItems, decisions };
  } catch (error) {
    console.error("Cortex Failure:", error);
    throw new Error("Intelligence extraction failed.");
  }
}

export async function semanticSearch(query: string, meetings: Meeting[]): Promise<{
  results: { meetingId: string, segment: TranscriptSegment, score: number }[]
}> {
  const vectorSpace = meetings.flatMap(m => 
    m.segments.map(s => ({ 
      meetingId: m.id, 
      segmentId: s.id, 
      text: s.text 
    }))
  );

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Recall results for: "${query}" from vector space: ${JSON.stringify(vectorSpace)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            results: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  meetingId: { type: Type.STRING },
                  segmentId: { type: Type.STRING },
                  score: { type: Type.NUMBER }
                }
              }
            }
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || '{ "results": [] }');
    const finalResults = (parsed.results || []).map((res: any) => {
      const meeting = meetings.find(m => m.id === res.meetingId);
      const segment = meeting?.segments.find(s => s.id === res.segmentId);
      return segment ? { meetingId: res.meetingId, segment, score: res.score } : null;
    }).filter(Boolean);

    return { results: finalResults };
  } catch (error) {
    return { results: [] };
  }
}