import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

function time_converter(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      'You are tasked with converting plain text representations of time into their equivalent value in minutes. For example, if the input is "20 hours," you should output "1200." Similarly, for inputs like "3 days," you should calculate "4320." Always ensure precise conversion and handle various time units such as seconds, minutes, hours, days, weeks, months, or years. For compound inputs like "2 hours 30 minutes," calculate the total minutes accurately, such as "150." Only return the numerical value as the output.',
  });

  const generationConfig = {
    temperature: 2,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  return new Promise(async (resolve, reject) => {
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      resolve(result.response.text());
    } catch (error) {
      console.error("Error converting time:", error);
      reject(error);
    }
  });
}

export default time_converter;
