# 🛡️ AI Intelligence & Fact-Checking System

A high-end, production-ready intelligence platform designed to detect misinformation and verify viral content across news, social media, and video platforms. It uses a **Multiplex News Engine** (RSS + Web Scraping) and a **Neural Analysis Layer** to provide verifiable truth in real-time.

---

## 🚀 Key Features

- **📡 Real-time Intelligence Feed**: A dual-intake engine monitoring global news via RSS streams and deep web scraping.
- **🧠 AI Reality Analysis**: Deep-neural verification engine powered by **Google Gemini 3.1 Flash-Lite** for factual claim extraction and reasoning.
- **🔍 Advanced Fact-Checking Tools**: Verify any URL (News, YouTube, social media) or raw text with semantic search capabilities.
- **💎 Premium "Ice Glass" UI**: A high-end, responsive dashboard with layered transparency and interactive components.
- **📊 Factual Scoring**: Real-time credibility scoring with visual gauges and detailed analysis reports.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion, Lucide React, Recharts |
| **Backend** | Node.js, Express, Puppeteer, Cheerio, RSS-Parser |
| **Intelligence** | Google Gemini API (Gemini 3.1 Flash-Lite) |
| **Utilities** | Axios, Concurrently, Nodemon, Dotenv |

---

## ⚙️ Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)

### 2. Installation
The project is structured as a Monorepo using npm workspaces. You can install all dependencies for both the client and server with a single command from the root directory:

```bash
# Install all dependencies (Root, Client, and Server)
npm run install:all
```

### 3. Environment Configuration
Create a `.env` file in the `server/` directory and add your Google Gemini API key:

```env
PORT=5000
GOOGLE_API_KEY=your_google_api_key_here
NODE_ENV=development
```

> [!TIP]
> You can get an API key from [Google AI Studio](https://aistudio.google.com/).

### 4. Running the Project
To start both the frontend and backend concurrently, run:

```bash
# Start Client & Server together
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend**: [http://localhost:5000](http://localhost:5000)

---

## 📂 Project Structure

```text
├── client/                 # Frontend (Vite + React)
│   ├── src/
│   │   ├── components/     # UI Modules (Sidebar, Feed, ResultDetails)
│   │   ├── App.jsx         # Main Intelligence Controller
│   │   └── index.css       # Theme & Glassmorphism config
├── server/                 # Backend (Node + Express)
│   ├── services/
│   │   ├── gemini.service.js       # AI Deep Analysis Layer
│   │   ├── rss.service.js          # News Intake Engine
│   │   └── scraper.service.js      # Deep Web Scraper
│   └── index.js            # API Gateway & Endpoints
├── package.json            # Root workspace configuration
└── README.md               # Documentation
```

---

## ⚖️ Reasoning Engine Rules
The AI analysis layer is strictly configured to:
1. **Extract** factual claims without bias or assumptions.
2. **Verify** against known data and mark "Unverified" if evidence is lacking.
3. **Analyze** semantic context to detect outdated or reused content.
4. **Report** with clear, neutral, and evidence-based logic.

---

## 📝 License
This project is licensed under the ISC License.

