
import { ai, MODELS } from "../config/gemini";

export class SemanticSearchService {
  async recall(query: string, context: any[]) {
    const response = await ai.models.generateContent({
      model: MODELS.SEARCH,
      contents: `Perform semantic retrieval for: "${query}" within this data: ${JSON.stringify(context)}`,
    });
    return response.text;
  }
}
