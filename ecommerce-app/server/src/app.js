import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

// Middleware to handle CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Check Server Status
app.get("/", (req, res) => {
  res.json("Welcome to Amazon Clone \n Server is up and running");
});

// Importing routes
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// routes declaration
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

export default app;
