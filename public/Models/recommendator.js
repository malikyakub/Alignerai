import { GoogleGenerativeAI } from "@google/generative-ai";

async function Recommender({ systemInstruction }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("API key not found");
    return "API key is missing.";
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemInstruction,
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(
      //   `these are my tasks ${taskInfo.map(
      //     (task) => task.name
      //   )} which is ${taskInfo.map((task) => {
      //     task.ids;
      //   })}`
      "what i should do first"
    );
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return "An error occurred while generating the recommendation.";
  }
}

export default Recommender;
