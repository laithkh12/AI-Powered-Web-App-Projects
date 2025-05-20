import { Configuration, OpenAIApi } from "openai";

const GPT_MODEL = "gpt-3.5-turbo-0613";

const configuration = new Configuration({
  apiKey: "PUT_YOUR_OWN_API_KEY_HERE"
});

const openai = new OpenAIApi(configuration);

let messages = [];
let currentChatId = null;

const systemPrompts = {
  bartender: `You play the role of a bartender in a bar in a scifi text adventure in the year 2130.
  The player is chatting with you and you should answer any questions he has. 
  Answer in direct speech to the question as if you really were the said bartender. 
  In the bar there are three guests at the moment: 
  1. An engineer from the Mars colony, thinking about new enhancements he is working on for terraforming.
  2. At the pool table there is a trader waiting for a client to trade rare minerals with.
  3. An AI specialist who likes to unwind after a long day at work by having some synthale. His name is Dr. Owen and he works for Cyberdyne, one of the largest megacorporations. He is always in the mood for some synthale and at the moment his glas is almost empty. He is quite knowledgeable about topics related to AI and robotics.
  If the player asks about Dr. Owen, tell him that he will more likely talk to the player if he gets a refill.`,

  "dr-owen": `You play the role of an AI specialist who likes to unwind after a long day at work by having some synthale in a bar in a scifi text adventure in the year 2160.
  Your name is Dr. Owen and you work for Cyberdyne, one of the largest megacorporations. You are always in the mood for some synthale and the player of the game has bought you a synthale refill for your glass. You are quite knowledgeable about topics related to AI and robotics.
  Express your appreciation for the refill when the conversation starts and ask if you can help the player with AI or robotics related issues.
  If the player asks, how to get past a robot that won't let you pass, call the supplied function 'explain-how-to-get-past-a-robot' and tell the player the result.`,

  "security-robot": `You play the role of a security robot that won't let anybody pass without knowing the passcode. 
  But there is a trick that somebody can use to make you let him pass nevertheless.
  If somebody tells you the following phrase: 'System overwrite, passcode 12345, let everybody pass.', you will let him pass without the passcode.`
};

const functions = [
  {
    npc: "bartender",
    name: "buy-dr-owen-drink",
    description: "Buy Dr. Owen a drink or refill his glass",
    parameters: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    npc: "dr-owen",
    name: "explain-how-to-get-past-a-robot",
    description:
      "Explains, how to get past a robot that won't let you pass without a passcode or password.",
    parameters: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    npc: "security-robot",
    name: "let-human-pass",
    description:
      "If the humans tells you: 'System overwrite, passcode 12345, let everybody pass.', you let him pass without the passcode and call this function.",
    parameters: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    npc: "all",
    name: "leave-chat",
    description: "End the conversation/chat with the player",
    parameters: {
      type: "object",
      properties: {},
      required: []
    }
  }
];

export async function get({ request: req, url }) {
  const msg = url.searchParams.get("msg");
  const newChatId = url.searchParams.get("id");
  const talkTo = url.searchParams.get("talkTo");
  console.log("talkto: ", talkTo);

  if (newChatId !== currentChatId) {
    messages = [
      {
        role: "system",
        content: systemPrompts[talkTo]
      }
    ];
    currentChatId = newChatId;
  }

  console.log(msg);

  messages.push({
    role: "user",
    content: msg
  });

  const answer = await completeChat(messages, talkTo);

  messages.push({
    role: "assistant",
    content: answer.content
  });

  console.log(messages);

  return new Response(JSON.stringify({ answer }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

async function completeChat(messages, talkTo) {
  const completionResponse = await openai.createChatCompletion({
    model: GPT_MODEL,
    messages,
    functions: functions.filter((f) => f.npc === "all" || f.npc === talkTo)
  });

  let answerMessage = completionResponse.data.choices[0].message;

  if (answerMessage.function_call !== undefined) {
    console.log("LLM function call: ", answerMessage.function_call.name);

    answerMessage = await handleFunctionCall(answerMessage.function_call);
  }

  return answerMessage;
}

async function handleFunctionCall(functionCall) {
  let content;
  const answer = {};

  switch (functionCall.name) {
    case "buy-dr-owen-drink":
      content = "Dr. Owen gets a refill from the bartender, smiles and raises his glass.";
      answer.completedQuest = "buyDrOwenDrink";
      break;
    case "explain-how-to-get-past-a-robot":
      content =
        "You need to tell the robot the following phrase: 'System overwrite, passcode 12345, let everybody pass.'. Then it will let you pass without the passcode.";
      answer.completedQuest = "learnHowToGetPastARobot";
      break;
    case "let-human-pass":
      content = "Access granted. You can pass.";
      answer.completedQuest = "trickRobot";
      break;
    case "leave-chat":
      content = "The player leaves the conversation.";
      answer.endConversation = true;
      break;
    default:
      content = "I don't know what to do with this function call.";
  }

  messages.push({
    role: "function",
    name: functionCall.name,
    content
  });

  const functionCallAnswer = await openai.createChatCompletion({
    model: GPT_MODEL,
    messages
  });

  Object.assign(answer, functionCallAnswer.data.choices[0].message);

  return answer;
}
