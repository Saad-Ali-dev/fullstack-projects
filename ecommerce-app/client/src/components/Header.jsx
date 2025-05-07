import React from "react";
import Cart from "./Cart.jsx";
import SearchBar from "./SearchBar.jsx";
function Header() {
  return (
    <header className="p-1 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 min-w-screen bg-blue">
      {/* Logo */}
      <div className="flex-shrink-0 px-2 py-1 hover:outline hover:outline-white rounded-sm">
        <a href="/" aria-label="Amazon Home">
          <img
            src="/amazon_logo.png" // Path relative to the public folder
            alt="Amazon logo"
            className="h-12 mt-1" // Adjusted height and margin
          />
        </a>
      </div>

      {/* Deliver To
      <div className="hidden lg:flex flex-shrink-0 items-center space-x-1 cursor-pointer hover:outline hover:outline-white p-2 py-3 rounded-sm">
        {/* Location Icon */}
      {/* <i className="fas fa-map-marker-alt text-white text-lg pt-1"></i>{" "}
        <div className="flex flex-col justify-center leading-tight">
          <span className="text-xs text-gray-300">Deliver to</span>
          <span className="text-sm font-bold text-white">Pakistan</span>
        </div>
      </div> */}

      <SearchBar />

      {/* Sign Up / Log In Buttons */}
      <div className="flex items-center space-x-3 flex-shrink-0 px-2">
        <button className="text-gray-900 text-sm font-semibold py-2 px-4 rounded-md whitespace-nowrap bg-[#ffa621] hover:bg-[#f3c547] transition cursor-pointer">
          Sign Up
        </button>
        <button className="text-gray-900 text-sm font-semibold py-2 px-4 rounded-md whitespace-nowrap bg-[#ffa621] hover:bg-[#f3c547] transition cursor-pointer">
          Log In
        </button>
      </div>

      <Cart itemCount={5} />
    </header>
  );
}

export default Header;
