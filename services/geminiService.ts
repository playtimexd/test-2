import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const generateCharacterImage = async (prompt: string, style: string): Promise<string> => {
  const client = getAI();
  
  const fullPrompt = `Character design, ${style} style. ${prompt}. High quality, detailed character sheet concept art.`;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        // Nano banana models do not support responseMimeType or specific image configs like imagen
      }
    });

    // Iterate through parts to find the image
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image generated");

  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    throw error;
  }
};
