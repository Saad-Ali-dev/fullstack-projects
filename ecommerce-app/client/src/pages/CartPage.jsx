import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleRemoveItem = (id, title) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
    toast.info(`${title} removed from cart.`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    const newQuantity = parseInt(quantity, 10);
    if (isNaN(newQuantity)) return; // Should not happen with type="number"

    // The reducer already handles removing the item if quantity <= 0
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity: newQuantity },
    });
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch({ type: "CLEAR_CART" });
      toast.warn("Cart cleared.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleProceedToCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsProcessingPayment(true);
    try {
      // Construct the payload for the backend
      const payload = {
        cartItems: cart.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image, // Send image for Stripe display
        })),
      };

      const response = await axios.post(
        `/api/payment/create-checkout-session`,
        payload,
      );

      if (response.data.url) {
        // Redirect to Stripe Checkout page
        window.location.href = response.data.url;
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error.response?.data?.error ||
          "An error occurred during checkout. Please try again.",
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              Your Shopping Cart is Empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/" // Link to homepage or products page
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-md shadow-md transition duration-150"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-baseline mb-6">
              <h1 className="text-3xl font-semibold text-gray-800">
                Shopping Cart
              </h1>
              <button
                onClick={handleClearCart}
                className="text-sm text-blue-600 hover:text-orange-700 hover:underline"
              >
                Clear Cart
              </button>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-8">
              {/* Cart Items - Left/Top */}
              <div className="lg:w-2/3 w-full">
                <div className="bg-white rounded-lg shadow-md p-2 sm:p-4 md:p-6 space-y-6">
                  {cart.map((item) => {
                    const hasOffer =
                      item.offer &&
                      item.offer.status &&
                      item.offer.percentage > 0;
                    const displayPrice = item.price;
                    const displayListPrice =
                      item.listPrice > item.price ? item.listPrice : null;

                    return (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                      >
                        <Link
                          to={`/products/${item.id}`}
                          className="flex-shrink-0"
                        >
                          <img
                            src={
                              item.image ||
                              "https://via.placeholder.com/100?text=No+Image"
                            }
                            alt={item.title}
                            className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-md border border-gray-200"
                          />
                        </Link>

                        <div className="flex-grow text-center sm:text-left">
                          <Link to={`/products/${item.id}`}>
                            <h2 className="text-lg font-medium text-gray-800 hover:text-orange-600 line-clamp-2">
                              {item.title}
                            </h2>
                          </Link>

                          {item.stock > 0 ? (
                            <p className="text-sm text-green-600 font-semibold mt-1">
                              In Stock
                            </p>
                          ) : (
                            <p className="text-sm text-red-600 font-semibold mt-1">
                              Out of Stock
                            </p>
                          )}

                          <div className="mt-2">
                            {hasOffer && displayListPrice && (
                              <span className="text-xs text-gray-500 line-through mr-2">
                                ${displayListPrice.toFixed(2)}
                              </span>
                            )}
                            <span className="text-xl font-bold text-gray-900">
                              ${displayPrice.toFixed(2)}
                            </span>
                            {hasOffer && (
                              <span className="ml-2 text-sm font-semibold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                                {item.offer.percentage}% off
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-center sm:items-end gap-3 sm:gap-4 mt-4 sm:mt-0">
                          <select
                            id={`quantity-${item.id}`}
                            name={`quantity-${item.id}`}
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateQuantity(item.id, e.target.value)
                            }
                            className="w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 text-sm"
                            aria-label={`Quantity for ${item.title}`}
                          >
                            {[
                              ...Array(Math.min(item.stock || 10, 10)).keys(),
                            ].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                Qty: {x + 1}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() =>
                              handleRemoveItem(item.id, item.title)
                            }
                            className="text-sm text-blue-600 hover:text-orange-700 hover:underline flex items-center gap-1"
                            aria-label={`Remove ${item.title} from cart`}
                          >
                            <FaTrashAlt /> Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Subtotal for mobile, shown below items */}
                <div className="lg:hidden mt-6 text-right">
                  <p className="text-xl font-semibold text-gray-800">
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}
                    ): ${totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Subtotal/Checkout - Right/Bottom */}
              <div className="lg:w-1/3 w-full mt-8 lg:mt-0">
                <div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-24">
                  {" "}
                  {/* Sticky for desktop */}
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}
                    ):
                  </h2>
                  <p className="text-3xl font-bold text-gray-900 mb-6">
                    ${totalAmount.toFixed(2)}
                  </p>
                  <button
                    onClick={handleProceedToCheckout}
                    disabled={isProcessingPayment || cart.length === 0}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isProcessingPayment
                      ? "Processing..."
                      : "Proceed to Checkout"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
