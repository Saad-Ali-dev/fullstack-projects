// server/routes/paymentRoutes.js
import express from "express";
import { createCheckoutSession } from "../controllers/paymentController.js";
// import { protect } from "../middleware/authMiddleware.js"; // Optional: If you want to protect this route

const router = express.Router();

// @route   POST /api/payment/create-checkout-session
// @desc    Create a stripe checkout session
// @access  Private (or Public, depending on your needs)
router.post("/create-checkout-session", /* protect, */ createCheckoutSession); // Add 'protect' if users must be logged in

export default router;
