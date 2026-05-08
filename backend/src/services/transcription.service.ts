export class TranscriptionService {
  async transcribe(audio: Uint8Array): Promise<string> {
    const response = await fetch('https://api-inference.huggingface.co/models/openai/whisper-large-v3', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_TOKEN || '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'}`,
        'Content-Type': 'audio/webm'
      },
      body: audio as any
    });
    if (!response.ok) {
      throw new Error('Failed to transcribe audio via Hugging Face.');
    }
    const data = await response.json();
    return data.text || '';
  }
}
