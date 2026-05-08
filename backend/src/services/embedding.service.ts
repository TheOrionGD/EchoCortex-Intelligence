export class EmbeddingService {
  async getEmbedding(text: string): Promise<number[]> {
    const response = await fetch('https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_TOKEN || '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'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: text })
    });
    if (!response.ok) {
      throw new Error('Failed to generate embedding via Hugging Face.');
    }
    const data = await response.json();
    return Array.isArray(data[0]) ? data[0] : data;
  }
}
