import express from "express";
import {
  getProductsByCategory,
  getProductById,
  handleSearchProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/category/:categoryName", getProductsByCategory);
router.get("/search", handleSearchProducts);
router.get("/:id", getProductById);

export default router;
