import React from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <>
      {/* Search Bar - Make it grow */}
      <div className="flex-grow flex items-center w-full md:w-auto order-last md:order-none px-2 md:px-0 focus-within:ring-2 focus-within:ring-orange-500 transition rounded-md">
        {/* Category Dropdown */}
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 h-10 rounded-l-md border-r border-gray-400 flex items-center whitespace-nowrap flex-shrink-0">
          All{" "}
          <div className="ml-1 text-gray-500">
            <FaCaretDown />
          </div>{" "}
          {/* Dropdown Icon */}
        </button>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Amazon"
          className="flex-grow h-10 px-3 text-black bg-amber-50 focus:outline-none"
          aria-label="Search Amazon"
        />
        {/* Search Button */}
        <button
          className="px-3 h-10 rounded-r-md flex items-center flex-shrink-0 bg-[#ffa621] hover:bg-[#f3c547] transition cursor-pointer"
          aria-label="Search"
        >
          <div className=" text-xl text-gray-800">
            <FaSearch />
          </div>{" "}
          {/* Search Icon */}
        </button>
      </div>
    </>
  );
}
