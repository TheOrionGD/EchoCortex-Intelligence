
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("CORTEX_FAILURE: API_KEY is required for intelligence extraction.");
}

export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
