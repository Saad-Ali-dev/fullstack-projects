import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PriceDisplay from "../components/common/PriceDisplay";
import Rating from "../components/common/Rating";
import Spinner from "../components/common/Spinner";
import {
  formattedDeliveryDate,
  formattedFastestDeliveryDate,
} from "../deliveryDate";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/product/${productId}`);
        const data = response.data.data;
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch product details.",
        );
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]); // Refetch if productId changes

  useEffect(() => {
    // Add the "no-bg" class on mount
    document.body.classList.add("no-bg");
    return () => {
      // Remove the "no-bg" class on unmount, restore body background
      document.body.classList.remove("no-bg");
    };
  }, []);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    // This is a placeholder. Implement your actual cart logic here.
    // e.g., dispatch an action to a context/redux store, or call a cart API.
    console.log(
      `Added ${quantity} of ${product.title} (ID: ${product._id}) to cart.`,
    );
    alert(`${quantity} x "${product.title}" added to cart! (This is a demo)`);
  };

  if (loading) return <Spinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-center text-red-500 p-4">
        Error: {error}
        <br />
        Please try refreshing the page.
      </div>
    );
  if (!product)
    return (
      <div className="flex items-center justify-center h-screen text-center text-gray-600 p-4">
        Product not found.
      </div>
    );

  // Helper function to convert camelCase to Title Case (optional, but good for display)
  const toTitleCase = (str) => {
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  // Filter specifications for display (optional, remove if all are desired)
  const productInfoSpecs = product.attributes
    ? Object.entries(product.attributes).map(([key, value]) => ({
        key: toTitleCase(key), // Use helper function for better key display
        value: value,
      }))
    : [];

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 font-sans text-gray-800 antialiased">
      {/* Main layout: Mobile (flex-col), Desktop (grid) */}
      <div className="flex flex-col lg:grid lg:grid-cols-10 lg:gap-x-6">
        {/* ---- MOBILE: Title, Rating, Price, Key Features (Order 1) ---- */}
        <div className="lg:hidden order-1 mb-3">
          <h1 className="text-lg sm:text-xl font-medium text-gray-900 mb-1.5">
            {product.title}
          </h1>
          <div className="flex items-center mb-1.5">
            <span className="text-sm text-gray-600 mr-1.5">
              {product.ratings.avg.toFixed(1)}
            </span>
            <Rating stars={product.ratings.avg} size={18} />
            <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline ml-2">
              {product.ratings.count} ratings
            </p>
          </div>
          <div className="mt-1">
            <PriceDisplay product={product} context="mobile" />
          </div>
        </div>

        {/* ---- DESKTOP: Image Gallery (Col 1) / MOBILE: Main Image (Order 2) ---- */}
        <div className="lg:col-span-4 flex flex-col lg:flex-row order-2 lg:order-none mb-4 lg:mb-0">
          {/* Desktop Thumbnails (Vertical) */}
          <div className="hidden lg:flex lg:flex-col gap-1.5 p-1 self-start">
            {product.images.slice(0, 7).map((img, index) => (
              <button
                key={index}
                type="button"
                aria-label={`View image ${index + 1}`}
                className={`w-12 h-14 border rounded hover:border-orange-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500
                            ${selectedImage === img ? "border-orange-500 ring-1 ring-orange-500" : "border-gray-300"}`}
                onMouseEnter={() => handleThumbnailClick(img)} // Change image on hover for desktop
                onClick={() => handleThumbnailClick(img)} // Change image on click for mobile/accessibility
              >
                <img
                  src={img}
                  alt={`Product thumbnail ${index + 1}`}
                  className="w-full h-full object-contain p-0.5"
                />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-grow flex items-center justify-center p-1 lg:p-2 lg:ml-2">
            <img
              src={selectedImage}
              alt={product.name}
              className="max-w-full h-auto max-h-[280px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[480px] object-contain rounded"
            />
          </div>
        </div>

        {/* ---- DESKTOP: Product Info (Col 2 - Title, Rating, Price, Full Description) ---- */}
        <div className="hidden lg:block lg:col-span-3 xl:col-span-4">
          {" "}
          {/* Adjusted col-span */}
          <h1 className="text-xl xl:text-2xl font-medium text-gray-900 mb-2">
            {product.title}
          </h1>
          <div className="flex items-center mb-2.5">
            <span className="text-sm text-gray-600 mr-1.5">
              {product.ratings.avg.toFixed(1)}
            </span>
            <Rating stars={product.ratings.avg} size={20} />
            <p className="text-sm text-blue-600 hover:text-orange-600 hover:underline ml-2">
              {product.ratings.count} ratings
            </p>
          </div>
          <hr className="my-3 border-gray-200" />
          <PriceDisplay product={product} context="desktop-info" />
          <hr className="my-3 border-gray-200" />
          <div>
            <h2 className="text-base font-semibold mb-1.5 text-gray-700">
              Product Description
            </h2>
            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* ---- DESKTOP: Action Panel (Col 3) / MOBILE: Action Panel (Order 3) ---- */}
        <div className="lg:col-span-3 xl:col-span-2 order-4 lg:order-none mt-2 lg:mt-0 lg:border lg:border-gray-200 lg:rounded-md lg:p-3.5 flex flex-col items-center">
          <div className="hidden lg:block mb-2">
            {" "}
            {/* Price for Desktop Action Panel */}
            <PriceDisplay product={product} context="desktop-action" />
          </div>

          <div className="text-sm my-2.5">
            <p className="text-gray-700">
              Standard Delivery:{" "}
              <span className="font-semibold text-gray-800">
                {formattedDeliveryDate}
              </span>
            </p>
            <p className="text-gray-700">
              Fastest Delivery:{" "}
              <span className="font-semibold text-gray-800">
                {formattedFastestDeliveryDate}
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Order within{" "}
              <span className="text-green-600 font-medium">5 hrs 20 mins</span>
            </p>{" "}
            {/* Static placeholder */}
          </div>

          {product.stock > 0 ? (
            <p className="text-lg text-green-600 font-semibold mb-2.5">
              In Stock
            </p>
          ) : (
            <p className="text-lg text-red-600 font-semibold mb-2.5">
              Out of Stock
            </p>
          )}

          {product.stock > 0 && (
            <div className="mb-3">
              <label htmlFor="quantity" className="sr-only">
                Quantity:
              </label>
              <select
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-auto p-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 text-sm"
              >
                {[...Array(Math.min(product.stock, 10)).keys()].map(
                  (
                    x, // Show up to 10 or stock, whichever is less
                  ) => (
                    <option key={x + 1} value={x + 1}>
                      Qty: {x + 1}
                    </option>
                  ),
                )}
              </select>
            </div>
          )}

          {product.stock > 0 && (
            <button
              onClick={handleAddToCart}
              type="button"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              Add to Cart
            </button>
          )}
        </div>

        {/* ---- MOBILE: Thumbnails (Order 4) ---- */}
        <div className="lg:hidden order-3 mt-5 mb-3">
          <h3 className="font-semibold text-sm mb-1.5 text-gray-700">
            More images
          </h3>
          <div className="flex gap-2 p-1 pb-2 -mx-1 overflow-x-auto items-center rounded">
            {product.images.map((img, index) => (
              <button
                key={index}
                type="button"
                aria-label={`View image ${index + 1}`}
                className={`flex-shrink-0 w-20 h-24 border rounded hover:border-orange-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500
                                ${selectedImage === img ? "border-orange-500 ring-1 ring-orange-500" : "border-gray-300"}`}
                onClick={() => handleThumbnailClick(img)}
              >
                <img
                  src={img}
                  alt={`Product thumbnail ${index + 1}`}
                  className="w-full h-full object-contain p-1"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ---- MOBILE: Full Description (Order 5) ---- */}
        <div className="lg:hidden order-5 mt-3">
          <hr className="my-3 border-gray-200" />
          <h2 className="text-base font-semibold mb-1.5 text-gray-700">
            Product Description
          </h2>
          <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>{" "}
      {/* End of main grid/flex layout */}
      {/* ---- COMMON: Product Specifications Section (Full Width) ---- */}
      <div
        id="product-information"
        className="mt-8 pt-5 border-t border-gray-200"
      >
        {" "}
        {/* Added id for review link navigation */}
        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
          Product information
        </h2>
        <div className="bg-white text-sm">
          <div className="max-w-full">
            <h3 className="text-base font-semibold text-gray-700 mb-2.5">
              Technical Details
            </h3>
            <div className="divide-y divide-gray-200">
              {productInfoSpecs.map((spec) => (
                <div
                  key={spec.key}
                  className="py-2.5 grid grid-cols-3 gap-x-4 items-baseline"
                >
                  <span className="font-medium text-gray-600 col-span-1">
                    {spec.key}
                  </span>
                  <span className="text-gray-700 col-span-2 whitespace-pre-line">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
