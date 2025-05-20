# 🎸 AI Sales Assistant - Cloud Guitars

This is an **AI-powered support chatbot** built for a fictional guitar e-commerce site called **Cloud Guitars**. The chatbot helps customers inquire about products, explore options, and add items to their cart using OpenAI's GPT-3.5 with function calling.

---

## 🛒 Features

- 🤖 AI chatbot that understands product-related queries
- 📦 Add products to the shopping cart via AI
- 🎸 Support for browsing by model or type/price range
- 🧠 Function calling for dynamic, structured responses
- ⚛️ Built with React UI and Astro for fast performance

---

## 🧱 Tech Stack

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [OpenAI API](https://platform.openai.com/)
- JavaScript (ES Modules)

---

## 📁 Project Structure

```
ai-support/
├── src/
│   ├── components/
│   │   ├── chat.jsx         # Chat UI and logic
│   │   └── index.jsx        # App layout and entry
│   ├── pages/
│   │   ├── index.astro      # Astro page embedding React
│   │   └── api/
│   │       └── chat.js      # OpenAI integration and product handling
├── astro.config.mjs         # Astro configuration
├── package.json             # Scripts and dependencies
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai-support
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add OpenAI API Key

In `src/pages/api/chat.js`, replace:

```js
apiKey: "PUT_YOUR_OWN_API_KEY_HERE"
```

With your actual OpenAI key.

To secure it, use a `.env` file:

```env
OPENAI_API_KEY=your_key_here
```

And add to `chat.js`:

```js
import dotenv from 'dotenv';
dotenv.config();
apiKey: process.env.OPENAI_API_KEY;
```

### 4. Start the Dev Server

```bash
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321) in your browser.

---

## 🧠 Functionality Highlights

### AI Functions

- **find-product**: Get product info by name/model
- **find-products-by-type**: Search by type (e-guitar, e-bass, etc.) and price range
- **add-product-to-cart**: Add selected product to the cart

### Example Products

- Enice EN 66 (electric guitar)
- Enice ENB 44 (electric bass)
- Enice ENB 55 (5-string bass)
- Enice EN 77 (7-string guitar)

---

## 📝 License

MIT License

---

## 🤖 Powered By

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [OpenAI GPT-3.5](https://platform.openai.com/)
