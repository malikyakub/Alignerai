import { GoogleGenerativeAI } from "@google/generative-ai";

async function Aligner(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key is missing. Please set REACT_APP_GEMINI_API_KEY in your environment."
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      'I will give a list of tasks including their duration their details and i want you to create a new list of them using the Eisenhower Matrix, and remember the less duration comes before the other tasks in the same quadrant, some tasks could be related so consider that only if you see in the task details that "this is related to task "task name", and list only the names forget about their duartion, details and also the extra texts like "Here\'s a reorganized task list based on the Eisenhower Matrix (Urgent/Important), prioritizing tasks within each quadrant by duration (shortest first):"',
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "plain/Text",
  };

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response;
  } catch (error) {
    console.error("Error in Aligner:", error);
    throw error;
  }
}

export default Aligner;
// Aligner("hello");
