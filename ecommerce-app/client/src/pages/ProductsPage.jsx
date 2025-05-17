import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/products/ProductCard";
import Spinner from "../components/common/Spinner";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  // Get search parameters from the query string
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q"); // Get the 'q' query parameter

  // Determine the current context (category or search)
  const isCategoryPage = !!category; // true if category param exists
  const isSearchPage = !!searchQuery; // true if 'q' query param exists

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      setProducts([]); // Clear previous results
      try {
        let response;
        let fetchSuccessful = false;

        if (isCategoryPage) {
          // Fetch by category if category param is present
          console.log(`Fetching products for category: ${category}`);
          response = await axios.get(`/api/products/category/${category}`);
          console.log(response);
          console.log(response.data);
        } else if (isSearchPage) {
          // Fetch by search query if 'q' param is present
          // Added trim() to handle spaces-only queries
          const trimmedSearchQuery = searchQuery.trim();
          if (!trimmedSearchQuery) {
            // Handle empty search query explicitly - show no results immediately
            setLoading(false);
            return; // Stop execution
          }
          console.log(`Searching for products: ${trimmedSearchQuery}`);
          response = await axios.get(`/api/products/search`, {
            params: { q: trimmedSearchQuery }, // Pass query as a parameter
          });
          console.log(response);
          console.log(response.data);
        }

        if (response.data && response.data.success) {
          const productsArray = response.data.data || [];

          setProducts(productsArray);
          fetchSuccessful = true;
        } else {
          // Handle backend specific errors if success is false but status is 200
          setError({
            message:
              response.data.message || "An error occurred on the server.",
          });
        }
      } catch (err) {
        setError(err);
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>Error loading products: {error.message}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-700">
        <p>No products found in the "{category}" category.</p>
      </div>
    );
  }

  const pageTitle = isCategoryPage
    ? `${category} Products`
    : isSearchPage
      ? `Search Results for: "${searchQuery}"`
      : "Products";

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 capitalize text-center sm:text-left">
          {pageTitle}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 product-grid">
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
