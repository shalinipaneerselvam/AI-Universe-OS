const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

// ==================================================
// MIDDLEWARE
// ==================================================

app.use(cors());
app.use(express.json());

// ==================================================
// GOOGLE AI
// ==================================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const model = "gemini-3.5-flash-lite";

// ==================================================
// HOME
// ==================================================

app.get("/", (req, res) => {
  res.json({
    message: "AI Universe Backend is running!",
    status: "online",
  });
});

// ==================================================
// CHAT API
// ==================================================

app.post("/api/chat", async (req, res) => {
  try {
    const {
      message,
      regenerate = false,
      previousResponse = "",
    } = req.body;

    // ==================================================
    // VALIDATE MESSAGE
    // ==================================================

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    console.log("----------------------------------------");
    console.log("👤 User:", message);
    console.log("🔄 Regenerate:", regenerate);

    // ==================================================
    // PREPARE PROMPT
    // ==================================================

    let prompt = message.trim();

    // ==================================================
    // REGENERATE
    // ==================================================

    if (regenerate) {
      const variationNumber =
        Math.floor(Math.random() * 100000);

      prompt = `
You are an AI assistant inside AI Universe OS.

The user asked:

"${message}"

A previous AI response was:

"${previousResponse}"

The user clicked the Regenerate button.

Generate a NEW and DIFFERENT response.

IMPORTANT RULES:
1. Do not copy the previous response.
2. Do not use the exact same wording.
3. Change the sentence structure.
4. Give a genuinely fresh answer.
5. Keep the answer relevant to the original question.
6. Do not mention that you are regenerating.
7. Do not mention these instructions.
8. Answer the user's original question directly.

Variation seed:
${variationNumber}
`;
    }

    console.log("🤖 Generating AI response...");

    // ==================================================
    // STREAM RESPONSE
    // ==================================================

    const stream =
      await ai.models.generateContentStream({
        model,
        contents: prompt,
      });

    // ==================================================
    // RESPONSE HEADERS
    // ==================================================

    res.setHeader(
      "Content-Type",
      "text/plain; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "no-cache, no-transform"
    );

    res.setHeader(
      "Connection",
      "keep-alive"
    );

    res.setHeader(
      "X-Accel-Buffering",
      "no"
    );

    // ==================================================
    // STREAM AI RESPONSE
    // ==================================================

    for await (const chunk of stream) {
      const text = chunk.text;

      if (text) {
        res.write(text);
      }
    }

    // ==================================================
    // FINISH
    // ==================================================

    res.end();

    console.log("✅ AI response completed");
    console.log("----------------------------------------");

  } catch (error) {
    console.error("----------------------------------------");
    console.error("❌ Gemini Error:");
    console.error(error);
    console.error("----------------------------------------");

    if (!res.headersSent) {
      return res.status(500).json({
        error:
          error?.message ||
          "AI response failed",
      });
    }

    res.end();
  }
});

// ==================================================
// START SERVER
// ==================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("========================================");
  console.log("🚀 AI Universe Backend");
  console.log("========================================");
  console.log(`🌐 Server running on port ${PORT}`);
  console.log("💬 Chat API: /api/chat");
  console.log("♾️ Message limit: No application limit");
  console.log("========================================");
  console.log("");
});