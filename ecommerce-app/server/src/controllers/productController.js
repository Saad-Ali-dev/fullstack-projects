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
    const products = await Product.find({
      category: { $regex: new RegExp(`^${categoryName}$`, "i") },
    }).lean();

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
      error: error.message,
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
      error: error.message,
    });
  }
};

async function searchProducts(searchQuery) {
  try {
    // Input validation/cleanup
    if (!searchQuery || searchQuery.trim() === "") {
      return [];
    }

    const queryText = searchQuery.trim();

    // Build the base query object
    const baseQuery = {
      $text: {
        $search: queryText,
        $caseSensitive: false,
      },
    };

    // Projection: Include the text score and only necessary fields
    const projection = {
      score: { $meta: "textScore" },
      name: 1,
      title: 1,
      thumbnail: 1,
      ratings: 1,
      price: 1,
      id: 1,
      category: 1,
      description: 1,
      brand: 1,
      keywords: 1,
    };

    const products = await Product.find(baseQuery, projection)
      .sort({ score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" }, price: 1 })
      .lean();

    return products;
  } catch (error) {
    console.error("Error during product search:", error);
    throw error;
  }
}
/**
 * @description Search products based on a query string
 * @route GET /products/search?q=:searchQuery
 * @access Public
 */
const handleSearchProducts = async (req, res) => {
  try {
    const searchQuery = req.query.q; // Get the query parameter

    if (!searchQuery || searchQuery.trim() === "") {
      return res.status(200).json({
        success: true,
        message: "Search query is empty.",
        count: 0,
        data: [],
      });
    }

    const products = await searchProducts(searchQuery);

    const message =
      products.length > 0
        ? `Successfully found ${products.length} products for query: "${searchQuery}".`
        : `No products found for query: "${searchQuery}".`;

    res.status(200).json({
      success: true,
      message: message,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error(
      `Error in handleSearchProducts for query '${req.query.q}':`,
      error,
    );
    res.status(500).json({
      success: false,
      message: "Server error while performing search.",
      error: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
};

export { getProductsByCategory, getProductById, handleSearchProducts };
