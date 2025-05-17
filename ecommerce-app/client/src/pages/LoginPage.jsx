// client/src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackToHome from "../components/common/BackToHome";
import logo from "../assets/amazon-logo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`/api/auth/login`, formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data)); // Store user info
      setLoading(false);
      navigate("/"); // Redirect to home or dashboard
    } catch (error) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      {" "}
      {/* Adjust min-height based on header/footer */}
      <div className="w-full min-h-screen max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <img
          src={logo}
          alt="amazon logo"
          className="invert h-12 mx-auto mt-5"
        />
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              disabled={loading} // Disable input while loading
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle type based on state
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              disabled={loading}
              required
              minLength="6"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
            {/* Password visibility toggle icon */}
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 top-[calc(1rem+14px+14px)] transform -translate-y-1/2" // Position correctly beside the input
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaRegEyeSlash size={18} />
              ) : (
                <FaRegEye size={18} />
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900
               bg-yellow-400  hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fce444] transition cursor-pointer"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          New to Amazon Clone?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Create your Amazon Clone account
          </Link>
        </p>
        <BackToHome />
      </div>
    </div>
  );
};

export default LoginPage;
