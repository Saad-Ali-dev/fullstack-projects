import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/products/ProductCard";
import Spinner from "../components/common/Spinner";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/products/category/${category}`);

        if (response.data && response.data.success) {
          const productsArray = response.data.data || [];

          setProducts(productsArray);

          // You might also want to use response.data.message or response.data.count for UI updates
          // e.g., setResponseMessage(response.data.message);
          // e.g., setProductCount(response.data.count);
        }
      } catch (err) {
        setError(err);
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    } else {
      // Handle cases where category might not be present, though router should ensure it
      setLoading(false);
      setError(new Error("Category not specified."));
    }
  }, [category]); // Re-fetch products if the category parameter changes

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

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 capitalize text-center sm:text-left">
          {category} Products
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
