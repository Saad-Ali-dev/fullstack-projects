import { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../Cart.jsx";
import SearchBar from "../SearchBar.jsx";
import logo from "../../assets/amazon-logo.png";
import LowerHeader from "./LowerHeader.jsx";
import SideBar from "../SideBar.jsx";
import { FaBars } from "react-icons/fa";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <>
      <header>
        <nav className="p-1 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 max-w-screen bg-blue">
          <div className="flex items-center text-sm">
            {/* Hamburger Menu Button */}
            <button
              onClick={openSidebar}
              className="flex md:hidden items-center space-x-1 hover:outline hover:outline-white rounded-sm p-1 focus:outline-none focus:ring-1 focus:ring-white cursor-pointer text-white relative top-[-3px] "
              aria-label="Open menu"
            >
              <FaBars className="text-xl" />
            </button>
            {/* Logo */}
            <div className="flex-shrink-0 px-2 py-1 hover:outline hover:outline-white rounded-sm">
              <Link to="/" aria-label="Amazon Home">
                <img
                  src={logo}
                  alt="Amazon logo"
                  className="h-10 sm:h-12 mt-1"
                />
              </Link>
            </div>
          </div>
          {/* Search Bar Component*/}
          <SearchBar />
          {/* Sign Up / Log In Buttons */}
          <div className="flex items-center space-x-3 flex-shrink-0 px-2">
            <Link to="/register">
              <button className="text-gray-900 text-sm font-semibold py-2 px-4 rounded-md whitespace-nowrap bg-[#ffa621] hover:bg-[#f3c547] transition cursor-pointer hidden md:block">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="text-gray-900 text-sm font-semibold py-2 px-4 rounded-md whitespace-nowrap bg-[#ffa621] hover:bg-[#f3c547] transition cursor-pointer">
                Log In
              </button>
            </Link>
            {/* Cart Component */}
            <Cart />
          </div>
        </nav>
      </header>
      {/* Lower Header Component with Button, Links and Sidebar Component*/}
      <LowerHeader onOpenSidebar={openSidebar} />
      <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}
