import { GoogleGenAI } from "@google/genai";

/**
 * Echo Cortex initialized with system-level API key.
 */
// Initializing GoogleGenAI with the API key from environment variables
export const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_LLM || process.env.API_KEY
});

export const MODELS = {
  EXTRACTION: 'meta-llama/Meta-Llama-3-8B-Instruct', // Upgraded to Hugging Face model instead of Gemini
  SEARCH: 'gemini-3-flash-preview',
  FAST: 'gemini-3-flash-preview'
};