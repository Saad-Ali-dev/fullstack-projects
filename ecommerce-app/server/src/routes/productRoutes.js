import express from "express";
import {
  getProductsByCategory,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/category/:categoryName", getProductsByCategory);
router.get("/:id", getProductById);

export default router;
