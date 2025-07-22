import express from "express";
import { handleChat } from "../controllers/chatbotController.js";

const router = express.Router();

// @route   POST /api/chatbot
// @desc    Handle chatbot conversation stream
// @access  Public
router.post("/", handleChat);

export default router;