import { GoogleGenAI } from "@google/genai";

/**
 * Echo Cortex initialized with system-level API key.
 */
// Initializing GoogleGenAI with the API key from environment variables
export const ai = new GoogleGenAI({ 
  apiKey: process.env.API_KEY
});

export const MODELS = {
  EXTRACTION: 'gemini-3-pro-preview',
  SEARCH: 'gemini-3-flash-preview',
  FAST: 'gemini-3-flash-preview'
};