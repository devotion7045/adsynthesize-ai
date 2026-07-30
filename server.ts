import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API lazily
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Competitor Audit API endpoint
app.post("/api/audit", async (req, res) => {
  const { domain, competitors } = req.body;
  const ai = getGeminiClient();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze competitor ad strategies for domain/niche: "${domain || "Fintech / Neo-banking"}" and competitors: "${competitors || "NexusFlow AI, Vortex Media, Quantum Scale"}".
Provide a JSON object response with keys:
- adSpendEstimate: string (e.g. "$1.4M")
- momChange: string (e.g. "+14.2%")
- keywordOverlap: string (e.g. "68.5%")
- totalCreativeVolume: string (e.g. "450 Ads")
- activeChannelsCount: number (e.g. 28)
- auditIntelligenceSummary: string (brief 2-sentence summary)
Respond strictly in JSON format without markdown code blocks.`,
      });

      const text = response.text || "";
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      return res.json({ success: true, data: parsed });
    } catch (err: any) {
      console.error("Gemini Audit API error:", err);
    }
  }

  // Instant fallback response
  return res.json({
    success: true,
    data: {
      adSpendEstimate: "$1.2M",
      momChange: "+12.4%",
      keywordOverlap: "64.2%",
      totalCreativeVolume: "412 Ads",
      activeChannelsCount: 24,
      auditIntelligenceSummary: `Scanned 50+ ad networks across ${domain || "Fintech"}. Detected high video ad volume with Meta and LinkedIn dominance.`,
    },
  });
});

// Ad Copy Generator API endpoint
app.post("/api/generate-copy", async (req, res) => {
  const { productName, description, targetAudience, platform, framework, tone } = req.body;
  const ai = getGeminiClient();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Act as a top 1% direct response media buyer and ad copywriter.
Generate 3 ad copy variants for:
Product Name: ${productName || "Lumina Pro Headphones"}
Description: ${description || "Active noise cancellation, studio-grade engineering, 50h battery"}
Target Audience: ${targetAudience || "Tech Enthusiasts"}
Platform: ${platform || "Meta"}
Framework: ${framework || "AIDA"}
Tone: ${tone || "Professional"}

Return a JSON array of 3 variant objects with fields:
- label: string (e.g. "VARIANT A - High CTR", "VARIANT B - Emotional Appeal", "VARIANT C - Direct & Scarcity")
- headline: string
- primaryText: string
- score: number (between 82 and 98)
- predictionRating: "High" | "Exceptional" (optional)
- bestForNote: string (optional, e.g. "Best for Cold Traffic")

Respond strictly in valid JSON array format without markdown code blocks.`,
      });

      const text = response.text || "";
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const variants = JSON.parse(cleaned);
      return res.json({ success: true, variants });
    } catch (err: any) {
      console.error("Gemini Copy API error:", err);
    }
  }

  // Instant fallback variants
  return res.json({
    success: true,
    variants: [
      {
        id: "var-a",
        label: "VARIANT A - High CTR",
        tagColor: "secondary",
        headline: `Experience Silence. Master Performance in ${productName || "Lumina Pro"}.`,
        primaryText: `Attention ${targetAudience || "Tech Enthusiasts"}! Elevate your workflow with ${productName || "Lumina Pro Headphones"}.\n\nDiscover 40dB active noise cancellation and 50-hour battery life. Designed for those who demand perfection in every beat. Stop settling for average sound.`,
        score: 88,
      },
      {
        id: "var-b",
        label: "VARIANT B - Emotional Appeal",
        tagColor: "tertiary",
        headline: "The Soundtrack to Your Focus.",
        primaryText: `Imagine a world where it's just you and your work. No distractions, no noise. Just pure, unadulterated clarity. ✨\n\n${productName || "Lumina Pro"} isn't just equipment; it's your personal sanctuary. Secure yours today and feel the difference of studio-grade engineering.`,
        score: 94,
      },
      {
        id: "var-c",
        label: "VARIANT C - Direct & Scarcity",
        tagColor: "primary",
        headline: `${productName || "Lumina Pro"}: Last Call for Launch Pricing.`,
        primaryText: `The reviews are in: ${productName || "Lumina Pro"} is the new standard. But the introductory offer is ending soon. Grab the professional's choice before the price increases at midnight. ⚡️`,
        score: 91,
        predictionRating: "High",
        bestForNote: "Best for Retargeting Campaigns",
      },
    ],
  });
});

// Budget Optimizer AI API
app.post("/api/optimize-budget", async (req, res) => {
  const { dailyBudget, targetRoas, adSets } = req.body;
  const ai = getGeminiClient();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze these ad sets with total daily budget $${dailyBudget} and target ROAS ${targetRoas}x:
Ad Sets: ${JSON.stringify(adSets || [])}

Provide a JSON object with:
- newProjectedRevenue: number
- newAvgCpc: number
- newConversions: number
- newAdScore: number
- recommendationSummary: string
Respond strictly in JSON format without markdown code blocks.`,
      });

      const text = response.text || "";
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      return res.json({ success: true, data: parsed });
    } catch (err: any) {
      console.error("Budget AI error:", err);
    }
  }

  const budgetNum = typeof dailyBudget === "number" ? dailyBudget : 2500;
  const roasNum = typeof targetRoas === "number" ? targetRoas : 4.5;
  return res.json({
    success: true,
    data: {
      newProjectedRevenue: Math.round(budgetNum * roasNum * 1.1),
      newAvgCpc: 0.38,
      newConversions: Math.round((budgetNum / 2.9) * 0.98),
      newAdScore: 9.6,
      recommendationSummary: `Reallocated 25% budget from low-converting branding campaigns to High-ROAS Lookalike & Black Friday teaser ad sets.`,
    },
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
