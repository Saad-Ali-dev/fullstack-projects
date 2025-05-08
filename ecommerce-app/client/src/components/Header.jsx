import React from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart.jsx";
import SearchBar from "./SearchBar.jsx";
import logo from "../assets/amazon-logo.png";

export default function Header() {
  return (
    <header className="p-1 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 max-w-screen bg-blue">
      {/* Logo */}
      <div className="flex-shrink-0 px-2 py-1 hover:outline hover:outline-white rounded-sm">
        <Link to="/" aria-label="Amazon Home">
          <img src={logo} alt="Amazon logo" className="h-12 mt-1" />
        </Link>
      </div>
      {/* Search Bar Component*/}
      <SearchBar />
      {/* Sign Up / Log In Buttons */}
      <div className="flex items-center space-x-3 flex-shrink-0 px-2">
        <Link to="/signup">
          <button className="text-gray-900 text-sm font-semibold py-2 px-4 rounded-md whitespace-nowrap bg-[#ffa621] hover:bg-[#f3c547] transition cursor-pointer">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="text-gray-900 text-sm font-semibold py-2 px-4 rounded-md whitespace-nowrap bg-[#ffa621] hover:bg-[#f3c547] transition cursor-pointer">
            Log In
          </button>
        </Link>
      </div>
      {/* Cart Component */}
      <Cart itemCount={5} /> {/* Static itemCount, will be dynamic later */}
    </header>
  );
}
