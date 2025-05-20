# AI Chat App with OpenAI, React, and Astro

This project is a simple AI-powered chat interface built with **Astro** and **React**, using **OpenAI's Chat API**.

## 🚀 Features

- Chat interface built with React
- Server-side API integration with OpenAI (`gpt-3.5-turbo`)
- Astro used for fast frontend rendering
- Messages stored per session using chat ID

## 🧱 Tech Stack

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [OpenAI API](https://platform.openai.com/)
- JavaScript (ES Modules)

## 📁 Project Structure

```
ai-chat/
├── src/
│   ├── components/
│   │   └── index.jsx          # React chat UI
│   ├── pages/
│   │   ├── api/
│   │   │   └── chat.js        # API endpoint for OpenAI
│   │   └── index.astro        # Root page loading React UI
├── astro.config.mjs           # Astro config with React integration
├── package.json               # Dependencies and scripts
```

## ⚙️ Setup

1. **Clone the repo**  
   ```bash
   git clone <your-repo-url>
   cd ai-chat
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Set your OpenAI API Key**  
   Replace `"PUT_YOUR_API_KEY_HERE"` in `src/pages/api/chat.js` with your actual OpenAI API key.

4. **Run the development server**  
   ```bash
   npm run dev
   ```

5. **Access the app**  
   Open your browser at `http://localhost:3000`

## 📝 Notes

- Each chat session is isolated using a timestamp-based ID.
- API calls are handled in a server-side Astro endpoint.
- The interface is intentionally simple for clarity and learning.

## 📦 Build for Production

```bash
npm run build
```
