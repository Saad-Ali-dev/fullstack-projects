import express from "express";
import cors from "cors";
import { FRONTEND_URL } from "./constants.js";

const app = express();
app.use(express.json());

// Middleware to handle CORS
const corsOptions = {
  origin: FRONTEND_URL,
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

// routes declaration
app.use("/api/products", productRoutes);

export default app;
