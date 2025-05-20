# 🧠 AI-Powered Web App Projects

This repository contains **three interactive AI-driven web applications** built using **Astro**, **React**, and **OpenAI's GPT-3.5 API**. Each project showcases a different use case for AI-enhanced user experiences, from chatting with a bot to exploring a text-based adventure or simulating a support assistant.

---

## 📦 Projects Overview

### 1. `ai-chat`
💬 A basic AI chatbot interface that allows users to send messages and receive real-time responses from OpenAI. Great for experimenting with prompt design and API integration.

- **Frontend**: React (in Astro)
- **Backend**: Astro API Route
- **OpenAI Model**: `gpt-3.5-turbo`
- **Location**: `./ai-chat`


---

### 2. `ai-chat-adventure`
🕹️ A sci-fi themed text adventure where players talk to NPCs to complete quests and navigate a futuristic world. NPCs are powered by dynamic GPT system prompts and function calls.

- **Frontend**: React in Astro
- **Game Engine**: Simple quest/state tracking
- **AI NPCs**: Custom GPT system roles and function calls
- **Location**: `./ai-chat-adventure`


---

### 3. `ai-support`
🛍️ A virtual sales assistant for "Cloud Guitars", simulating real-world support and e-commerce interaction. Uses function calling to search inventory and add items to the cart.

- **Frontend**: React (Astro wrapper)
- **AI Assistant**: Trained for e-commerce logic with custom functions
- **Location**: `./ai-support`


---

## 🧰 Tech Stack

- **Astro** – Static site builder & React integration
- **React** – UI Components
- **OpenAI API** – Conversational intelligence
- **JavaScript (ES Modules)**

---

## 🚀 Getting Started

1. Install dependencies for each sub-project:
   ```bash
   cd <project-folder>
   npm install
   ```

2. Add your OpenAI API key to each project (`chat.js` or `.env` where applicable)

3. Start any project locally:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:4321`

---

## 📝 License

All projects are open-source and available under the MIT License.

---

## 🧠 Powered By

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [OpenAI GPT](https://platform.openai.com/)
