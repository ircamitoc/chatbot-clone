import OpenAI from "openai"; // Import OpenAI as the default export

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true, // Enable browser-like environment (understand the risks)
});

export async function sendMsgToOpenAI(message) {
  try {
    const res = await openai.createCompletion({
      engine: "davinci",
      prompt: message,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return res.data.choices[0].text;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}

export default openai;
