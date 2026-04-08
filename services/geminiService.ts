import { GoogleGenAI, Type } from "@google/genai";
import { Meeting, TranscriptSegment, ActionItem, Decision } from "../types/meeting";
import { logger } from "../utils/logger";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.API_KEY });

// Rate limit tracking
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 5000; // 5 seconds minimum between requests
let requestsThisMinute = 0;
const MAX_REQUESTS_PER_MINUTE = 2; // Free tier limit
let minuteResetTime = Date.now() + 60000;

// Quota exceeded cache - prevents immediate retries
let quotaExhaustedUntil = 0;

/**
 * Check if we're in quota exceeded state
 */
function isQuotaExhausted(): boolean {
  return Date.now() < quotaExhaustedUntil;
}

/**
 * Set quota exhausted until time
 */
function setQuotaExhausted(retryAfterSeconds: number = 300): void {
  quotaExhaustedUntil = Date.now() + retryAfterSeconds * 1000;
  logger.logWarn(`Gemini quota exhausted. Retrying after ${retryAfterSeconds}s`, {
    retryAt: new Date(quotaExhaustedUntil).toISOString(),
  });
}

/**
 * Check rate limits before making request
 */
function checkRateLimit(): { allowed: boolean; reason?: string } {
  // Reset minute counter if needed
  if (Date.now() > minuteResetTime) {
    requestsThisMinute = 0;
    minuteResetTime = Date.now() + 60000;
  }

  // Check if quota exhausted
  if (isQuotaExhausted()) {
    const waitTime = Math.ceil((quotaExhaustedUntil - Date.now()) / 1000);
    return {
      allowed: false,
      reason: `Quota exhausted. Wait ${waitTime}s before retrying.`,
    };
  }

  // Check per-minute limit
  if (requestsThisMinute >= MAX_REQUESTS_PER_MINUTE) {
    return {
      allowed: false,
      reason: `Rate limit: ${MAX_REQUESTS_PER_MINUTE} requests per minute exceeded`,
    };
  }

  // Check minimum interval between requests
  const timeSinceLastRequest = Date.now() - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    return {
      allowed: false,
      reason: `Rate limit: Wait ${Math.ceil((MIN_REQUEST_INTERVAL - timeSinceLastRequest) / 1000)}s between requests`,
    };
  }

  return { allowed: true };
}

export async function processMeetingAudio(audioBase64: string, mimeType: string): Promise<{
  segments: TranscriptSegment[],
  actionItems: ActionItem[],
  decisions: Decision[]
}> {
  // Check rate limits first
  const rateCheck = checkRateLimit();
  if (!rateCheck.allowed) {
    const error = new Error(`Rate limit exceeded: ${rateCheck.reason}`);
    logger.logWarn(`Gemini rate limit: ${rateCheck.reason}`, {
      audioSize: audioBase64?.length,
    });
    throw error;
  }

  // Update request tracking BEFORE making API call
  lastRequestTime = Date.now();
  requestsThisMinute++;

  // If quota was exhausted before, still check
  if (isQuotaExhausted()) {
    const waitTime = Math.ceil((quotaExhaustedUntil - Date.now()) / 1000);
    const error = new Error(`Quota exhausted. Wait ${waitTime}s before retrying.`);
    logger.logWarn(`Quota still exhausted. Wait ${waitTime}s`, { waitTime });
    throw error;
  }

  const model = 'gemini-3-pro-preview';
  
  const systemInstruction = `
    You are Echo, a helpful meeting assistant. 
    Analyze the provided audio recording.
    1. Create a transcript with speaker names and timestamps.
    2. Extract clear action items (tasks) and who is responsible for them.
    3. Identify important decisions made during the meeting.
    Return the data in a clean JSON format.
  `;

  try {
    logger.logInfo('Initiating Gemini analysis', {
      audioSize: audioBase64?.length,
      mimeType,
      requestsThisMinute,
    });

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { data: audioBase64, mimeType: mimeType } },
          { text: "Please summarize this meeting and provide the transcript, tasks, and decisions." }
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
                },
                required: ["speaker", "text", "start_time", "end_time"]
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
                },
                required: ["description", "owner", "source_segment_index"]
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
                },
                required: ["summary", "confidence_score", "source_segment_index"]
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    const data = JSON.parse(text);
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
      id: `dec-${meetingId}-${idx}`,
      meeting_id: meetingId,
      summary: d.summary || d.decision || 'Decision',
      confidence_score: d.confidence_score || 0.8,
      source_segment_id: segments[d.source_segment_index]?.id
    }));

    logger.logInfo('Gemini analysis completed successfully', {
      segmentCount: segments.length,
      actionItemCount: actionItems.length,
      decisionCount: decisions.length,
    });

    return { segments, actionItems, decisions };
  } catch (error: any) {
    const errorMessage = error?.message || String(error);
    let errorCode = error?.error?.code || error?.code;
    let errorStatus = error?.error?.status || error?.status;
    
    // Extract status from error response if not found
    if (!errorStatus && error?.error?.error?.status) {
      errorStatus = error.error.error.status;
    }
    if (!errorCode && error?.error?.error?.code) {
      errorCode = error.error.error.code;
    }
    
    // Check HTTP status in response or error properties
    const httpStatus = error?.response?.status || error?.status;

    logger.logError('Gemini API error', error, {
      errorCode,
      errorStatus,
      httpStatus,
      message: errorMessage,
      errorType: error?.constructor?.name,
    });

    // Check for quota exceeded error (429 or RESOURCE_EXHAUSTED)
    if (
      errorStatus === 'RESOURCE_EXHAUSTED' || 
      errorCode === 429 || 
      httpStatus === 429 ||
      errorMessage.includes('429') ||
      errorMessage.includes('quota') ||
      errorMessage.includes('RESOURCE_EXHAUSTED')
    ) {
      logger.logError('Gemini API quota exceeded - please upgrade to paid tier', error, {
        errorCode,
        errorStatus,
        httpStatus,
      });

      // Calculate retry time from error response
      let retrySeconds = 300; // Default 5 minutes
      const retryDelayStr = error?.error?.details?.[0]?.retryDelay;
      if (retryDelayStr) {
        retrySeconds = parseInt(retryDelayStr.replace(/[^0-9]/g, '')) || 300;
      }

      setQuotaExhausted(retrySeconds);
      throw error;
    }

    // For any other error, re-throw (no fallback)
    logger.logError('Gemini API error - no data available', error, {
      errorCode,
      errorStatus,
      httpStatus,
    });
    throw error;
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

  if (vectorSpace.length === 0) return { results: [] };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find relevant parts for the question: "${query}" from these meeting notes: ${JSON.stringify(vectorSpace.slice(0, 100))}`, // Limit context size
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

    logger.logSemanticSearchExecuted(query, finalResults.length, 0);

    return { results: finalResults };
  } catch (error) {
    logger.logError("Semantic search error", error instanceof Error ? error : new Error(String(error)));
    return { results: [] };
  }
}

/**
 * Get current rate limit status
 */
export function getRateLimitStatus() {
  return {
    requestsThisMinute,
    maxRequestsPerMinute: MAX_REQUESTS_PER_MINUTE,
    nextMinuteResetTime: new Date(minuteResetTime).toISOString(),
    quotaExhausted: isQuotaExhausted(),
    quotaExhaustedUntil: quotaExhaustedUntil
      ? new Date(quotaExhaustedUntil).toISOString()
      : null,
    timeSinceLastRequest: Date.now() - lastRequestTime,
    minRequestInterval: MIN_REQUEST_INTERVAL,
  };
}