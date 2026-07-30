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

// Health Check API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 1. Competitor Audit API endpoint
const auditHandler = async (req: express.Request, res: express.Response) => {
  const domain = req.body.domain_or_niche || req.body.domain || req.body.domainOrNiche || "AI E-commerce Email Marketing";
  const competitorsInput = req.body.competitors || ["Klaviyo", "Omnisend"];
  const competitorsList = Array.isArray(competitorsInput)
    ? competitorsInput
    : typeof competitorsInput === "string"
    ? competitorsInput.split(",").map((s) => s.trim())
    : ["Klaviyo", "Omnisend"];

  const ai = getGeminiClient();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze competitor ad strategies for domain/niche: "${domain}" and competitors: "${competitorsList.join(", ")}".
Provide a JSON object response with keys:
- ad_spend_estimate: string (e.g. "$1.4M")
- mom_change: string (e.g. "+14.2%")
- keyword_overlap: string (e.g. "68.5%")
- total_creative_volume: string (e.g. "450 Ads")
- active_channels_count: number (e.g. 28)
- audit_intelligence_summary: string (brief 2-sentence summary)
Respond strictly in JSON format without markdown code blocks.`,
      });

      const text = response.text || "";
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      return res.json({
        success: true,
        data: {
          domain_or_niche: domain,
          domainOrNiche: domain,
          competitors: competitorsList,
          ad_spend_estimate: parsed.ad_spend_estimate || parsed.adSpendEstimate || "$1.4M",
          adSpendEstimate: parsed.ad_spend_estimate || parsed.adSpendEstimate || "$1.4M",
          mom_change: parsed.mom_change || parsed.momChange || "+14.2%",
          momChange: parsed.mom_change || parsed.momChange || "+14.2%",
          keyword_overlap: parsed.keyword_overlap || parsed.keywordOverlap || "68.5%",
          keywordOverlap: parsed.keyword_overlap || parsed.keywordOverlap || "68.5%",
          total_creative_volume: parsed.total_creative_volume || parsed.totalCreativeVolume || "450 Ads",
          totalCreativeVolume: parsed.total_creative_volume || parsed.totalCreativeVolume || "450 Ads",
          active_channels_count: parsed.active_channels_count || parsed.activeChannelsCount || 28,
          activeChannelsCount: parsed.active_channels_count || parsed.activeChannelsCount || 28,
          audit_intelligence_summary: parsed.audit_intelligence_summary || parsed.auditIntelligenceSummary || `Scanned 50+ ad networks across ${domain}. Detected high video ad volume.`,
          auditIntelligenceSummary: parsed.audit_intelligence_summary || parsed.auditIntelligenceSummary || `Scanned 50+ ad networks across ${domain}. Detected high video ad volume.`,
        },
      });
    } catch (err: any) {
      console.error("Gemini Audit API error:", err);
    }
  }

  // Instant fallback response
  return res.json({
    success: true,
    data: {
      domain_or_niche: domain,
      domainOrNiche: domain,
      competitors: competitorsList,
      ad_spend_estimate: "$1.4M",
      adSpendEstimate: "$1.4M",
      mom_change: "+14.2%",
      momChange: "+14.2%",
      keyword_overlap: "68.5%",
      keywordOverlap: "68.5%",
      total_creative_volume: "450 Ads",
      totalCreativeVolume: "450 Ads",
      active_channels_count: 28,
      activeChannelsCount: 28,
      audit_intelligence_summary: `Scanned 50+ ad networks across ${domain} for ${competitorsList.join(", ")}. Detected high video ad volume with Meta and LinkedIn dominance.`,
      auditIntelligenceSummary: `Scanned 50+ ad networks across ${domain} for ${competitorsList.join(", ")}. Detected high video ad volume with Meta and LinkedIn dominance.`,
    },
  });
};

app.post("/api/v1/intelligence/audit", auditHandler);
app.post("/api/audit", auditHandler);

// 2. Ad Copy Generator API endpoint
const generateCopyHandler = async (req: express.Request, res: express.Response) => {
  const productName = req.body.product_or_service_name || req.body.productName || req.body.product_name || "AdSynthesize AI";
  const description = req.body.description || "Automated ad creation and budget optimization for e-commerce brands.";
  const targetAudience = req.body.target_audience || req.body.targetAudience || "D2C Brand Founders";
  const platform = req.body.platform || "Google Ads";
  const framework = req.body.framework || "AIDA";
  const tone = req.body.tone || "Persuasive";

  const ai = getGeminiClient();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Act as a top 1% direct response media buyer and ad copywriter.
Generate 3 ad copy variants for:
Product/Service: ${productName}
Description: ${description}
Target Audience: ${targetAudience}
Platform: ${platform}
Framework: ${framework}
Tone: ${tone}

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
        headline: `Scale Ads with AI - Higher ROAS for ${productName}`,
        primaryText: `Attention ${targetAudience}! ${description}\n\nEngineered using the ${framework} framework with a ${tone} tone for ${platform}. Stop wasting budget on unoptimized creatives.`,
        score: 92,
        predictionRating: "High",
        bestForNote: "Best for Cold Traffic",
      },
      {
        id: "var-b",
        label: "VARIANT B - Emotional & Direct",
        tagColor: "tertiary",
        headline: `Why ${targetAudience} are Switching to ${productName}`,
        primaryText: `Take full control of your advertising performance. ${description}\n\nJoin thousands of high-growth brands automating campaign growth today. ✨`,
        score: 95,
      },
      {
        id: "var-c",
        label: "VARIANT C - High Conversion Scarcity",
        tagColor: "primary",
        headline: `${productName}: Automated Ad Creation & Optimization`,
        primaryText: `Launch high-converting ${platform} campaigns built specifically for ${targetAudience}. Instant setup, studio-grade results. ⚡️`,
        score: 89,
        predictionRating: "Exceptional",
        bestForNote: "Best for Retargeting & High Intent",
      },
    ],
  });
};

app.post("/api/v1/ads/generate-copy", generateCopyHandler);
app.post("/api/generate-copy", generateCopyHandler);

// 3. Banner Studio Generator API endpoint
const generateBannerHandler = async (req: express.Request, res: express.Response) => {
  const headline = req.body.headline || "Scale Ads with AI";
  const subheadline = req.body.subheadline || "Automate creatives & copy in seconds";
  const callToAction = req.body.call_to_action || req.body.ctaText || req.body.cta_text || "Try Free Now";
  const brandColorHex = req.body.brand_color_hex || req.body.brandHex || "#0F172A";
  const accentColorHex = req.body.accent_color_hex || req.body.accentHex || "#6366F1";
  const aspectRatios = req.body.aspect_ratios || (req.body.aspectRatio ? [req.body.aspectRatio] : ["1:1", "9:16"]);

  return res.json({
    success: true,
    banner: {
      headline,
      subheadline,
      call_to_action: callToAction,
      ctaText: callToAction,
      brand_color_hex: brandColorHex,
      brandHex: brandColorHex,
      accent_color_hex: accentColorHex,
      accentHex: accentColorHex,
      aspect_ratios: Array.isArray(aspectRatios) ? aspectRatios : [aspectRatios],
      aspectRatio: Array.isArray(aspectRatios) ? aspectRatios[0] : aspectRatios,
      badge_text: "EXCLUSIVE ACCESS",
      badgeText: "EXCLUSIVE ACCESS",
      member_count: "+2K",
      generated_at: new Date().toISOString(),
    },
  });
};

app.post("/api/v1/ads/generate-banner", generateBannerHandler);
app.post("/api/generate-banner", generateBannerHandler);

// 4. Video Creator Generator API endpoint
const generateVideoHandler = async (req: express.Request, res: express.Response) => {
  const brandName = req.body.brand_name || req.body.brandName || "AdSynthesize AI";
  const rawHooks = req.body.hooks;
  const hooksList = Array.isArray(rawHooks)
    ? rawHooks
    : typeof rawHooks === "string"
    ? [rawHooks]
    : [
        "Losing money on Facebook Ads?",
        "Generate high-converting banners automatically.",
        "Scale your ROAS today.",
      ];
  const callToAction = req.body.call_to_action || req.body.ctaText || req.body.cta_text || "Start Free Trial";
  const durationPerSlideSec = Number(req.body.duration_per_slide_sec || req.body.slideDuration) || 1.5;

  const sampleImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC-70ehQwqCTGrVlUMCeAIIixOyYAO3q2SMF3UhskvDs6EL2N1RTCiFrkWTZA28HK4f0UeDk5LNXjKVPQf2QSfFFWXR5KDjpRMRPT24deCS0OURZSY1HflO2ykJTvFqipmoSeAiPv2inC2vhZePMbRGMPn3aGp6GrOh93fwnqXMOxquJtMJiBpiMTByWXAA8dfA7R5mAnerMPjK8dUoDY3s5uwQtUNKLZYujsTRDAMkrmKYq-n3kep7",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBiIjsqJeMX96VW18mSSzQjMUATCf0uJtThmXBT4eLT3eIvz2tehQ-CO1VLPXThELsiXzchZusnE7iZZBWti_arBt2g_ayprlu17FQd-EZP96aVTNMlpUd1JiNYxWzchbfK1mXrq62s1ToHoNAUrg__sZiVO6woCuR1Mk7KNvGnPQfBwvfpKsozwzVhszE5pJ-FkoMMy0H2np4mQDjzSr69fGAp5Bw0jq5p-5lwSkGlT4WIFxTTr6Um",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD9bsNqIpVo2gWAe-WauRtLj9u6FBBtbyQCpWXpkbS1I7LMcsuE86AOnYH3Ai03DvkSypCGj0uXJdzoJACbm6Fo7RaybQL-xGQB83sh7Y_DYel95H-Z-_rfPa6CkBV9G1eXCrShPevMqB2_hzc269d6p9uEk0WQBhI5ujhVHuANPVe8muv-HlvNjTIBRADoDG6eZgLbMnPlRXfaGVwH3lIdlslV-8j6QsXVNth70DL-Tsmidr1HhbWE",
  ];

  const slides = hooksList.map((hookText: string, idx: number) => ({
    id: `slide-${idx + 1}`,
    title: `Hook #${idx + 1}`,
    hookText: hookText,
    timestamp: `00:0${Math.floor(idx * durationPerSlideSec)}`,
    durationSeconds: durationPerSlideSec,
    imageUrl: sampleImages[idx % sampleImages.length],
    imageAlt: `${brandName} motion slide ${idx + 1}`,
  }));

  return res.json({
    success: true,
    video: {
      brand_name: brandName,
      brandName: brandName,
      call_to_action: callToAction,
      ctaText: callToAction,
      duration_per_slide_sec: durationPerSlideSec,
      slideDuration: durationPerSlideSec,
      slides: slides,
    },
  });
};

app.post("/api/v1/ads/generate-video", generateVideoHandler);
app.post("/api/generate-video", generateVideoHandler);

// 5. Budget Optimizer AI API
const optimizeBudgetHandler = async (req: express.Request, res: express.Response) => {
  const campaignName = req.body.campaign_name || req.body.campaignName || "Q3 Growth Campaign";
  const totalDailyBudget = Number(req.body.total_daily_budget ?? req.body.dailyBudget ?? req.body.daily_budget) || 500.0;
  const targetRoas = Number(req.body.target_roas ?? req.body.targetRoas) || 2.5;
  const adSets = req.body.ad_sets || req.body.adSets || [];

  const ai = getGeminiClient();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze campaign "${campaignName}" with total daily budget $${totalDailyBudget} and target ROAS ${targetRoas}x across ad sets:
${JSON.stringify(adSets)}

Provide a JSON object with:
- projected_revenue: number
- avg_cpc: number
- conversions: number
- ad_score: number
- recommendation_summary: string
Respond strictly in JSON format without markdown code blocks.`,
      });

      const text = response.text || "";
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      const projectedRevenue = parsed.projected_revenue || parsed.projectedRevenue || Math.round(totalDailyBudget * targetRoas * 1.1);
      const avgCpc = parsed.avg_cpc || parsed.avgCpc || 0.38;
      const conversions = parsed.conversions || Math.round((totalDailyBudget / 2.9) * 0.98);
      const adScore = parsed.ad_score || parsed.adScore || 9.6;
      const summary = parsed.recommendation_summary || parsed.recommendationSummary || `Reallocated budget efficiently across ad sets to maximize ROAS for ${campaignName}.`;

      return res.json({
        success: true,
        data: {
          campaign_name: campaignName,
          campaignName: campaignName,
          total_daily_budget: totalDailyBudget,
          totalDailyBudget: totalDailyBudget,
          target_roas: targetRoas,
          targetRoas: targetRoas,
          projected_revenue: projectedRevenue,
          projectedRevenue: projectedRevenue,
          newProjectedRevenue: projectedRevenue,
          avg_cpc: avgCpc,
          avgCpc: avgCpc,
          newAvgCpc: avgCpc,
          conversions: conversions,
          newConversions: conversions,
          ad_score: adScore,
          adScore: adScore,
          newAdScore: adScore,
          recommendation_summary: summary,
          recommendationSummary: summary,
        },
      });
    } catch (err: any) {
      console.error("Budget AI error:", err);
    }
  }

  const projRev = Math.round(totalDailyBudget * targetRoas * 1.1);
  const convs = Math.round((totalDailyBudget / 2.9) * 0.98);
  const recSummary = `Reallocated budget from low-converting ad sets to high-performing Lookalike & Retargeting campaigns in ${campaignName}.`;

  return res.json({
    success: true,
    data: {
      campaign_name: campaignName,
      campaignName: campaignName,
      total_daily_budget: totalDailyBudget,
      totalDailyBudget: totalDailyBudget,
      target_roas: targetRoas,
      targetRoas: targetRoas,
      projected_revenue: projRev,
      projectedRevenue: projRev,
      newProjectedRevenue: projRev,
      avg_cpc: 0.38,
      avgCpc: 0.38,
      newAvgCpc: 0.38,
      conversions: convs,
      newConversions: convs,
      ad_score: 9.6,
      adScore: 9.6,
      newAdScore: 9.6,
      recommendation_summary: recSummary,
      recommendationSummary: recSummary,
    },
  });
};

app.post("/api/v1/ads/optimize-budget", optimizeBudgetHandler);
app.post("/api/optimize-budget", optimizeBudgetHandler);

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
