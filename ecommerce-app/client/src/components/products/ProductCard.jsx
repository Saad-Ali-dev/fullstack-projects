import { Link } from "react-router-dom";
import Rating from "../common/Rating";
import {
  formattedDeliveryDate,
  formattedFastestDeliveryDate,
} from "../../deliveryDate.js";

export default function ProductCard({ product }) {
  if (!product) {
    return null;
  }

  // Ensure essential product data exists
  const imageUrl = product.thumbnail ? product.thumbnail : product.images[0];
  const productName = product.name || "Unnamed Product";
  const productTitle = product.title || "No description available.";
  const ratingAvg = product.ratings?.avg ?? 0;
  const price = product.price ?? 0;
  const productId = product.id;

  return (
    <Link
      to={`/products/${productId}`}
      className="block border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
    >
      <div className="w-full aspect-square overflow-hidden flex items-center justify-center">
        <img src={imageUrl} alt={productName} className="" />
      </div>

      <div className="p-4">
        <h3
          className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 h-10"
          title={productTitle}
        >
          {productTitle}
        </h3>

        <div className="flex items-center mb-2">
          <Rating stars={ratingAvg} size={20} />
          <span className="ml-2 text-xs text-gray-600">
            ({ratingAvg.toFixed(2)})
          </span>
        </div>

        <p className="text-2xl font-semibold text-gray-900 mb-2">
          {price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>

        {/* Dynamic delivery info */}
        <p className="text-xs text-gray-700">
          Delivery <span className="font-bold">{formattedDeliveryDate}</span>
        </p>
        <p className="text-xs text-gray-700">
          Or fastest delivery{" "}
          <span className="font-bold">{formattedFastestDeliveryDate}</span>
        </p>
      </div>
    </Link>
  );
}
