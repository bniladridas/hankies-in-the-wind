import { GoogleGenAI } from '@google/genai';

function getGeminiApiKey() {
  if (typeof window !== 'undefined') {
    const userKey = localStorage.getItem('gemini_api_key');
    if (userKey && userKey.trim()) return userKey.trim();
  }
  return import.meta.env.VITE_GEMINI_API_KEY;
}

export async function generateResponse(prompt: string): Promise<AsyncGenerator<string, void, unknown>> {
  const ai = new GoogleGenAI({
    apiKey: getGeminiApiKey(),
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  
  const model = 'gemini-2.0-flash-lite';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  async function* streamGenerator() {
    for await (const chunk of response) {
      if (chunk.text) {
        // Clean the text by removing asterisks and hash symbols
        const cleanText = chunk.text.replace(/[*#]/g, '');
        yield cleanText;
      }
    }
  }

  return streamGenerator();
}