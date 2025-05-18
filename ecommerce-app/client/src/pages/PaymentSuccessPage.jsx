// client/src/pages/PaymentSuccessPage.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Assuming you have this
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccessPage = () => {
  const { dispatch } = useCart();

  useEffect(() => {
    // Clear the cart on successful payment
    dispatch({ type: "CLEAR_CART" });
    // You might want to also save the order to your backend here
    // For this basic example, we are just clearing the cart.
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center min-h-[calc(100vh-150px)]">
      <FaCheckCircle className="text-6xl text-green-500 mb-6" />
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Thank you for your purchase. Your order is being processed.
      </p>
      <div className="space-x-4">
        <Link
          to="/"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-md shadow-md transition duration-150"
        >
          Continue Shopping
        </Link>
        {/* Optionally, link to an order history page if you implement one */}
        {/* <Link
          to="/orders"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-150"
        >
          View Orders
        </Link> */}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
