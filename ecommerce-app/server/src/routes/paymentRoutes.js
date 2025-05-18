import express from "express";
import { createCheckoutSession } from "../controllers/paymentController.js";

const router = express.Router();

// @route   POST /api/payment/create-checkout-session
// @desc    Create a stripe checkout session
// @access  Public
router.post("/create-checkout-session", createCheckoutSession);

export default router;
