
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoDB = require("./config/db");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const resumeRoutes = require("./routes/resume.route");
const { GoogleGenerativeAI } = require("@google/generative-ai");
// const helmet=require('helmet');

const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoDB();

// Initialize Google Generative AI
const generativeAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = generativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://resume-with-ai.vercel.app",
    "https://resume-with-ai-shambhavi-anands-projects.vercel.app", 
    "https://resume-with-ai-git-master-shambhavi-anands-projects.vercel.app"], // Adjust if your frontend runs on a different port
    credentials: true
}));
// app.use(helmet({
//     crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
// }));
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/data", resumeRoutes);

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Chat Route
app.post("/chat", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const chat = model.startChat(); // Start a proper chat session
        const result = await chat.sendMessage(prompt);
        const responseText = result.response.text(); // Extract AI response

        res.json({ success: true, response: responseText });
    } catch (error) {
        console.error("AI API Error:", error);
        res.status(500).json({ error: "AI request failed" });
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running.`);
});
