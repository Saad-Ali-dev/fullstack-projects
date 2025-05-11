import React from "react";
import { FaBars } from "react-icons/fa";

export default function LowerHeader({ onOpenSidebar }) {
  return (
    <nav className="bg-lightBlue text-white p-2 flex items-center space-x-4 text-sm">
      <button
        onClick={onOpenSidebar}
        className="flex items-center space-x-1 hover:outline hover:outline-white rounded-sm p-1 focus:outline-none focus:ring-1 focus:ring-white cursor-pointer"
        aria-label="Open menu"
      >
        <FaBars className="text-xl" />
        <span className="font-semibold">All</span>
      </button>
      <a
        href="#"
        className="hover:outline hover:outline-white rounded-sm p-1 whitespace-nowrap"
      >
        Electronic
      </a>
      <a
        href="#"
        className="hover:outline hover:outline-white rounded-sm p-1 whitespace-nowrap"
      >
        Fashion
      </a>
      <a
        href="#"
        className="hover:outline hover:outline-white rounded-sm p-1 whitespace-nowrap"
      >
        Home
      </a>
      {/* 
        For responsiveness on very small screens, these links might need special handling
        if there are many of them, e.g., becoming a scrollable list or hiding some.
        With just three, they should fit most mobile screens.
      */}
    </nav>
  );
}
