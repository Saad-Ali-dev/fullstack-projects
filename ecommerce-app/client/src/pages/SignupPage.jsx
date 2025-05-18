// client/src/pages/SignupPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackToHome from "../components/common/BackToHome";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // States for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  // Toggle password visibility functions
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      // Only send name, email, password to the backend
      const signupData = { name, email, password };
      const response = await axios.post(`api/auth/register`, signupData);

      // Option 1: Automatically log in the user by storing token and user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // TODO: Update global auth state if using Context API
      setLoading(false);
      navigate("/"); // Redirect to home
      toast.success("Account created successfully!");
    } catch (err) {
      setLoading(false);
      const errorMessage =
        err.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
      setError(errorMessage);
      console.error("Signup failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      {" "}
      {/* Adjust min-height based on header/footer */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              disabled={loading} // Disable input while loading
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="First and last name"
            />
          </div>
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
              disabled={loading}
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
              type={showPassword ? "text" : "password"} // Toggle type
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              disabled={loading}
              required
              minLength="6"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
              placeholder="At least 6 characters"
            />
            {/* Password visibility toggle icon */}
            <div
              className="absolute right-3 top-[calc(1rem+14px+14px)] transform -translate-y-1/2 flex items-center cursor-pointer text-gray-500" // Position correctly
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaRegEyeSlash size={18} />
              ) : (
                <FaRegEye size={18} />
              )}
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Re-enter password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"} // Toggle type
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              disabled={loading}
              required
              minLength="6"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
            />
            {/* Confirm Password visibility toggle icon */}
            <div
              className="absolute right-3 top-[calc(1rem+14px+14px)] transform -translate-y-1/2 flex items-center cursor-pointer text-gray-500" // Position correctly
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <FaRegEyeSlash size={18} />
              ) : (
                <FaRegEye size={18} />
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900  bg-yellow-400  hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fce444] transition cursor-pointer"
            >
              {loading ? "Creating Account..." : "Create your Amazon account"}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
        <BackToHome />
      </div>
    </div>
  );
};

export default SignupPage;
