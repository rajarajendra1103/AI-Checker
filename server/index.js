import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fetchTrendingNews, searchNews } from "./services/rss.service.js";
import { scrapeURL } from "./services/scraper.service.js";
import { analyzeWithOpenRouter } from "./services/openrouter.service.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Multi-category & Search Trending Endpoint
app.get("/api/trending", async (req, res) => {
    const { category, q } = req.query;
    try {
        const query = q || category || "top stories";
        const stories = await fetchTrendingNews(query);
        res.json({ stories });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch stories." });
    }
});

// Search Search bar handler
app.get("/api/search", async (req, res) => {
    const { q } = req.query;
    try {
        const stories = await searchNews(q);
        res.json({ stories });
    } catch (error) {
        res.status(500).json({ error: "Search failed." });
    }
});

// Main Analysis Endpoint
app.post("/api/analyze", async (req, res) => {
    const { url, rawText, type } = req.body;
    let contentToAnalyze = rawText || "";
    let metadata = {};

    try {
        if (url) {
            metadata = await scrapeURL(url);
            contentToAnalyze = `${metadata.title} - ${metadata.description}. Full text: ${metadata.body}`;
        }

        if (!contentToAnalyze || contentToAnalyze.length < 10) {
            return res.status(400).json({ error: "Insufficient content to analyze." });
        }

        const analysis = await analyzeWithOpenRouter(contentToAnalyze, type || "news");
        res.json({
            analysis,
            metadata: {
                title: metadata.title || "User Provided Text",
                description: metadata.description || "No description provided.",
                url: url || "Text Only"
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Analysis failed. Please check AI API key or URL. Error: " + error.message });
    }
});

app.get("/", (req, res) => {
    res.send("AI Checker API is active.");
});

app.listen(PORT, async () => {
    console.log(`AI Checker Server active on port ${PORT}`);
    if (process.env.OPENROUTER_API_KEY) {
        console.log("GPT-5.2 Intelligence Layer: ONLINE");
    }
});
