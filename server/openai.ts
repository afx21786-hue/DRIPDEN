import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function chatWithDripBot(message: string, conversationHistory: Array<{ role: "user" | "assistant"; content: string }>): Promise<string> {
  try {
    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      {
        role: "system" as const,
        content: "You are DripBot, an enthusiastic AI fashion assistant for DRIPDEN, a local fashion marketplace. You help users discover shops, find products, build outfits, and stay on trend. Be friendly, use Gen Z language, and give personalized fashion advice. Keep responses concise and engaging."
      },
      ...conversationHistory,
      { role: "user" as const, content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages,
      max_completion_tokens: 500,
    });

    return response.choices[0].message.content || "Sorry, I couldn't process that. Try asking me something else!";
  } catch (error) {
    console.error("DripBot chat error:", error);
    throw new Error("Failed to chat with DripBot");
  }
}

export async function analyzeDrip(imageBase64: string): Promise<{
  score: number;
  feedback: string;
  suggestions: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an AI fashion critic for DRIPDEN. Analyze outfit images and provide a drip score (1-100), constructive feedback, and 3 specific style suggestions. Return JSON: { 'score': number, 'feedback': string, 'suggestions': string[] }"
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Rate this outfit's drip level and give me fashion feedback!"
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      score: Math.max(1, Math.min(100, result.score || 50)),
      feedback: result.feedback || "Looking fresh!",
      suggestions: result.suggestions || []
    };
  } catch (error) {
    console.error("Drip analyzer error:", error);
    throw new Error("Failed to analyze drip");
  }
}

export async function recommendShops(userPreferences: string): Promise<{
  recommendations: Array<{ shopName: string; reason: string; matchScore: number }>;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are a fashion shopping assistant. Based on user preferences, recommend 5 shop types they'd love. Return JSON: { 'recommendations': [{ 'shopName': string, 'reason': string, 'matchScore': number }] }"
        },
        {
          role: "user",
          content: `My style preferences: ${userPreferences}`
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 800,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result;
  } catch (error) {
    console.error("Shop recommendations error:", error);
    throw new Error("Failed to get shop recommendations");
  }
}

export async function predictFlashDrop(recentTrends: string[]): Promise<{
  prediction: string;
  confidence: number;
  suggestedCategories: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are a fashion trend predictor. Analyze recent trends and predict upcoming flash drops. Return JSON: { 'prediction': string, 'confidence': number (0-1), 'suggestedCategories': string[] }"
        },
        {
          role: "user",
          content: `Recent trends: ${recentTrends.join(", ")}`
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 600,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result;
  } catch (error) {
    console.error("Flash drop predictor error:", error);
    throw new Error("Failed to predict flash drops");
  }
}

export async function buildOutfit(preferences: {
  style?: string;
  occasion?: string;
  colors?: string[];
  budget?: string;
}): Promise<{
  outfit: {
    items: Array<{ category: string; description: string; style: string }>;
    totalVibe: string;
    occasions: string[];
  };
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an AI outfit builder. Create complete outfit suggestions based on user preferences. Return JSON: { 'outfit': { 'items': [{ 'category': string, 'description': string, 'style': string }], 'totalVibe': string, 'occasions': string[] } }"
        },
        {
          role: "user",
          content: `Build me an outfit with these preferences: ${JSON.stringify(preferences)}`
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result;
  } catch (error) {
    console.error("Outfit builder error:", error);
    throw new Error("Failed to build outfit");
  }
}
