import { Configuration, OpenAIApi } from "openai";

const GPT_MODEL = "gpt-3.5-turbo-0613";

const configuration = new Configuration({
  apiKey: "PUT_YOUR_API_KEY_HERE",
});

const openai = new OpenAIApi(configuration);

let messages = [];
let currentChatId = null;

export async function get({ request: req, url }) {
  const msg = url.searchParams.get("msg");
  const newChatId = url.searchParams.get("id");

  if (newChatId !== currentChatId) {
    messages = [];
    currentChatId = newChatId;
  }

  messages.push({
    role: "user",
    content: msg,
  });

  const answer = await completeChat(messages);

  messages.push({
    role: "assistant",
    content: answer.content,
  });

  console.log(messages);

  return new Response(JSON.stringify({ answer }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function completeChat(messages) {
  const completionResponse = await openai.createChatCompletion({
    model: GPT_MODEL,
    messages,
  });

  let answerMessage = completionResponse.data.choices[0].message;

  return answerMessage;
}
