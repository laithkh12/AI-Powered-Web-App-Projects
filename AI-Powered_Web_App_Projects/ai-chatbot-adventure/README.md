# 🤖 AI Chat Adventure Game

This is an interactive **sci-fi text adventure game** where the player navigates locations and interacts with NPCs using an **AI-powered chat system**. Built with **Astro**, **React**, and **OpenAI's Chat API**, the game responds dynamically based on player input and game state.

---

## 🌌 Features

- 📜 Text-based adventure UI built in React
- 🗣️ NPC conversations powered by OpenAI GPT-3.5
- 🧠 Function calling for triggering in-game events (e.g., quest completions)
- 🗺️ Multiple locations with navigation and NPC availability logic
- 🔐 Conditional exits and quest requirements

---

## 🧱 Tech Stack

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [OpenAI API](https://platform.openai.com/)
- JavaScript (ES Modules)

---

## 📁 Project Structure

```
ai-chat-adventure/
├── src/
│   ├── components/
│   │   ├── chat.jsx         # Chat component UI and logic
│   │   ├── game-data.js     # Game world structure and NPC logic
│   │   └── index.jsx        # Game runtime and user interaction
│   ├── pages/
│   │   ├── index.astro      # Astro page embedding the game
│   │   └── api/
│   │       └── chat.js      # OpenAI API integration and function calls
├── public/
│   └── favicon.svg          # Site icon
├── astro.config.mjs         # Astro configuration
├── package.json             # Project metadata and scripts
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai-chat-adventure
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure OpenAI API Key

In `src/pages/api/chat.js`, replace:

```js
apiKey: "PUT_YOUR_OWN_API_KEY_HERE"
```

With your OpenAI key. For better security, use an `.env` file and load it with `dotenv`:

```env
OPENAI_API_KEY=your_key_here
```

Then in the JS file:

```js
import dotenv from 'dotenv';
dotenv.config();
apiKey: process.env.OPENAI_API_KEY;
```

### 4. Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:4321` in your browser.

---

## 🎮 Gameplay Mechanics

- Use directional buttons to move between locations.
- Talk to NPCs to gather information or complete quests.
- Conversations are context-aware and guided by GPT with system prompts.
- NPCs may trigger quests or end chats using OpenAI function calling.

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

---

## 🧩 Quests & Functions

The following quests are handled via AI function calls:

- 🥂 `buyDrOwenDrink` – Buy Dr. Owen a drink
- 🧠 `learnHowToGetPastARobot` – Learn how to bypass the security robot
- 🔓 `trickRobot` – Trick the robot to gain access
- 👋 `leave-chat` – End the conversation

---

## 📜 License

This project is open-source under the MIT License.

---

## 🤖 Powered By

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [OpenAI GPT-3.5](https://platform.openai.com/)
