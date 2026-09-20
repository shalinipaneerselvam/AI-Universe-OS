# AI Universe OS

AI Universe OS is a full-stack AI workspace built with React, Vite, Node.js, Express, and Google Gemini API.

It provides a centralized workspace for AI chat, agent management, project management, analytics, and application settings.

## 🚀 Live Demo

- Frontend: https://ai-universe-os.vercel.app/
- Backend: https://ai-universe-os.onrender.com/

## ✨ Features

### 💬 AI Chat

- Gemini-powered AI conversations
- Streaming AI responses
- Regenerate AI responses
- Copy AI responses
- Chat history persistence
- Unlimited application-level messaging

### 📌 Chat Management

- Create new chats
- Search chats
- Pin / Unpin chats
- Rename chats
- Delete chats
- Active chat management
- LocalStorage persistence

### 🤖 AI Agents

- AI agent dashboard
- Agent status display
- Agent request tracking
- Open chat directly from an agent

### 📊 Analytics

- Total AI request tracking
- Monthly usage visualization
- Agent usage analytics
- Chat activity-based statistics

### 📁 Project Management

- Create projects
- Edit projects
- Delete projects
- Project persistence using LocalStorage
- Project activity tracking

### ⚙️ Settings

- Dark mode
- Default AI model selection
- Response style settings
- Notification settings
- Auto-save settings
- Language settings

### 🏠 Dashboard

- AI agent statistics
- Project statistics
- API usage overview
- User statistics
- Recent activity
- Quick actions

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Recharts
- JavaScript

### Backend

- Node.js
- Express.js
- Google Gemini API
- CORS
- dotenv

### Deployment

- Vercel - Frontend
- Render - Backend

## 📂 Project Structure

```text
AI-Universe-OS/
│
├── public/
│
├── server/
│   ├── server.cjs
│   ├── package.json
│   └── package-lock.json
│
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── App.jsx
│   └── index.css
│
├── package.json
├── package-lock.json
├── vercel.json
├── vite.config.js
└── README.md
🔐 Environment Variables

The backend requires a Google Gemini API key.

Create a .env file inside the server folder:

GEMINI_API_KEY=your_gemini_api_key
PORT=5000

Do not commit your .env file or API key to GitHub.

▶️ Run Locally
1. Clone the repository
git clone https://github.com/shalinipaneerselvam/AI-Universe-OS.git
cd AI-Universe-OS
2. Install frontend dependencies
npm install
3. Install backend dependencies
cd server
npm install
4. Configure environment variables

Create:

server/.env

Add:

GEMINI_API_KEY=your_gemini_api_key
PORT=5000
5. Start the backend
node server.cjs

The backend will run on:

http://localhost:5000
6. Start the frontend

Open another terminal:

cd AI-Universe-OS
npm run dev
🔗 API
Chat Endpoint
POST /api/chat

Example request:

{
  "message": "Explain Python in simple terms"
}

The backend sends the request to Google Gemini and streams the generated response back to the frontend.

💾 Data Persistence

The application currently uses browser LocalStorage for several client-side features, including:

Chat history
Active chat
Projects
Agent activity
Settings
Analytics-related usage data
🌐 Deployment
Frontend

The React frontend is deployed using Vercel.

https://ai-universe-os.vercel.app/

Backend

The Node.js / Express backend is deployed using Render.

https://ai-universe-os.onrender.com/

👩‍💻 Author

Shalini Panneerselvam

GitHub:
https://github.com/shalinipaneerselvam

📄 License

This project is developed as a personal full-stack AI project for learning, portfolio, and development purposes.
