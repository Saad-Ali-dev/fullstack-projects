// File: controllers/productController.js

import Product from "../models/productModel.js";

/**
 * @description Get products by category name
 * @route GET /products/category/:categoryName
 * @access Public
 */
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    if (!categoryName) {
      return res.status(400).json({
        success: false,
        message: "Category name parameter is required.",
      });
    }

    // Perform a case-insensitive search for the category name within the 'category' array.
    // The regex '^${categoryName}$' ensures an exact match of the category string within the array.
    const products = await Product.find({
      category: { $regex: new RegExp(`^${categoryName}$`, "i") },
    }).lean(); // .lean() returns plain JS objects for better performance in read-only ops

    const message =
      products.length > 0
        ? `Successfully fetched products for category: ${categoryName}.`
        : `No products found for category: ${categoryName}.`;

    res.status(200).json({
      success: true,
      message: message,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error(
      `Error in getProductsByCategory for category '${req.params.categoryName}':`,
      error,
    );
    res.status(500).json({
      success: false,
      message: "Server error while fetching products by category.",
      error: error.message, // Consider omitting detailed error in production
    });
  }
};

/**
 * @description Get a single product by its custom numeric ID
 * @route GET /products/:id
 * @access Public
 */
const getProductById = async (req, res) => {
  try {
    const productIdParam = req.params.id;
    const productId = parseInt(productIdParam, 10);

    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID. ID must be a number.",
      });
    }

    // Find product by the custom 'id' field (not MongoDB's _id)
    const product = await Product.findOne({ id: productId }).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${productId} not found.`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Product with ID ${productId} fetched successfully.`,
      data: product,
    });
  } catch (error) {
    console.error(`Error in getProductById for ID '${req.params.id}':`, error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching product by ID.",
      error: error.message, // Consider omitting detailed error in production
    });
  }
};

export { getProductsByCategory, getProductById };
