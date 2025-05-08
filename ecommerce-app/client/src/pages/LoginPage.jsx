// client/src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement login logic - API call to backend
    console.log("Login form submitted", formData);
    // Example:
    // try {
    //   const response = await axios.post('/api/auth/login', formData);
    //   console.log(response.data); // Handle token, redirect user
    // } catch (error) {
    //   console.error('Login failed', error.response.data);
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      {" "}
      {/* Adjust min-height based on header/footer */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
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
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-button hover:bg-buttonHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fce444] transition"
            >
              Sign In
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
      </div>
    </div>
  );
};

export default LoginPage;
