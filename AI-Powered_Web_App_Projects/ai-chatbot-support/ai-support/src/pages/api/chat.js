import { Configuration, OpenAIApi } from "openai";

const GPT_MODEL = "gpt-3.5-turbo-0613";

const configuration = new Configuration({
  apiKey: "PUT_YOUR_OWN_API_KEY_HERE"
});

const openai = new OpenAIApi(configuration);

let messages = [];
let currentChatId = null;

const functions = [
  {
    name: "find-product",
    description: `Fetches more information about a specific product/model. 
      If the product is not found under the exact name, this function will return all product names available. 
      The assistant should then pick the name that is closest to the one that the customer asked for and ask the customer if this is the correct product.
      If the customer then asks for more information about the product, the assistant should call this function again with the correct product name.`,
    parameters: {
      type: "object",
      properties: {
        productModel: {
          type: "string",
          description:
            "The product name or model name to find. If it doesn't match exactly, the function will return all product names so the assistant can pick a similar one."
        }
      },
      required: []
    }
  },
  {
    name: "find-products-by-type",
    description:
      "Fetches more information about a specific product type like e-guitar, e-bass, acoustic guitar, concert guitar.",
    parameters: {
      type: "object",
      properties: {
        productType: {
          type: "string",
          description:
            "The product type to find, should be one of: e-guitar, e-bass, acoustic guitar, concert guitar."
        },
        priceRange: {
          type: "string",
          description:
            "The range in which the price of the product falls, should be one of: low, mid, high."
        }
      },
      required: []
    }
  },
  {
    name: "add-product-to-cart",
    description: "Adds the product with the specified name to the customer's cart.",
    parameters: {
      type: "object",
      properties: {
        productName: {
          type: "string",
          description:
            "The product name of the product to add to the cart, should be one of the available product names."
        }
      },
      required: []
    }
  }
];

export async function get({ request: req, url }) {
  const msg = url.searchParams.get("msg");
  const newChatId = url.searchParams.get("id");

  if (newChatId !== currentChatId) {
    messages = [
      {
        role: "system",
        content: `You are a helpful sales assistant for an online shop named 'Cloud guitars' that sells and delivers guitars. 
          Please only respond to questions related to the online shop and to the guitars that the shop sells.
          Please use the functions provided to get more information about the products. 
          If these functions don't yield any result, please tell the customer that the shop doesn't sell the items.
          If the customer wants to buy a product, please add it to the cart via the function call add-product-to-cart. You don't have to ask for login or payment information.`
      }
    ];
    currentChatId = newChatId;
  }

  console.log(msg);

  messages.push({
    role: "user",
    content: msg
  });

  const answer = await completeChat(messages);

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

async function completeChat(messages) {
  const completionResponse = await openai.createChatCompletion({
    model: GPT_MODEL,
    messages,
    functions
  });

  let answerMessage = completionResponse.data.choices[0].message;

  if (answerMessage.function_call !== undefined) {
    console.log("LLM function call: ", answerMessage.function_call.name);

    answerMessage = await handleFunctionCall(answerMessage.function_call);
  }

  return answerMessage;
}

// product id to product description
const products = new Map([
  [
    "1",
    `Enice EN 66 - 6 string electric guitar; price: 699.99 €, pickups: 1x humbucker, 1x single coil, color: blue`
  ],
  [
    "2",
    `Enice ENB 44 - 4 string electric bass; price: 999.99 €, pickups: 2x humbucker, color: black`
  ],
  [
    "3",
    `Enice ENB 55 - 5 string electric bass; price: 1299 €, pickups: 2x humbucker, color: coral red`
  ],
  [
    "4",
    `Enice EN 77 - 7 string electric guitar; price: 1599 €, pickups: 1x humbucker, 2x single coil, color: midnight blue`
  ]
]);

const typesToProducts = new Map([
  ["e-guitar", ["1", "4"]],
  ["e-bass", ["2", "3"]]
]);
const namesToProducts = new Map([
  ["Enice EN 66", "1"],
  ["Enice ENB 44", "2"],
  ["Enice ENB 55", "3"],
  ["Enice EN 77", "4"]
]);

const priceRangeToProducts = new Map([
  ["low", ["1"]],
  ["mid", ["2", "3"]],
  ["high", ["4"]]
]);

async function handleFunctionCall(functionCall) {
  let content;
  const answer = {};
  const args = JSON.parse(functionCall.arguments);

  console.log("function call arguments: ", args);

  switch (functionCall.name) {
    case "find-product":
      {
        const productName = args.productModel;
        const productId = namesToProducts.get(productName);
        if (productId !== undefined) {
          content = products.get(productId);
        } else {
          // return all product names
          content = Array.from(namesToProducts.keys()).join("\n");
        }
      }
      break;
    case "add-product-to-cart":
      {
        const productName = args.productName;

        if (productName !== undefined) {
          console.log("add product to cart: ", productName);

          content = "The product was added to the cart.";
        } else {
          content = "I don't know this product.";
        }
      }
      break;

    case "find-products-by-type":
      {
        const productType = args.productType;
        const priceRange = args.priceRange;
        const productIds = typesToProducts.get(productType);

        if (productIds !== undefined) {
          console.log("price range: ", priceRange);

          const productsFound = productIds
            .filter(
              (id) =>
                priceRange === undefined ||
                priceRangeToProducts.get(priceRange)?.includes(id)
            )
            .map((id) => products.get(id));

          content =
            productsFound.length === 0 ? "No product found." : productsFound.join("\n");
        } else {
          content = "No product found.";
        }
      }
      break;
    default:
      content = "I don't know what to do with this function call.";
  }

  messages.push({
    role: "function",
    name: functionCall.name,
    content
  });

  console.log("function call answer: ", content);

  const functionCallAnswer = await openai.createChatCompletion({
    model: GPT_MODEL,
    messages
  });

  Object.assign(answer, functionCallAnswer.data.choices[0].message);

  return answer;
}
