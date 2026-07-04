import express from "express";
import cors from "cors";
import generateResponse from "./services/ai.service.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Working");
});

app.post("/ai/get-response", async (req, res) => {
  try {
    const { prompt, task } = req.body;

    if (!prompt || !task) {
      return res.status(400).json({
        success: false,
        error: "Prompt and task are required.",
      });
    }

    const answer = await generateResponse(prompt, task);

    res.status(200).json({
      success: true,
      result: answer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

export default app;