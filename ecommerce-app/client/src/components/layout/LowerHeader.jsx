import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LowerHeader({ onOpenSidebar }) {
  return (
    <nav className="bg-lightBlue text-white p-2 flex items-center space-x-4 text-sm">
      <button
        onClick={onOpenSidebar}
        className="hidden md:flex items-center space-x-1 hover:outline hover:outline-white rounded-sm p-1 focus:outline-none focus:ring-1 focus:ring-white cursor-pointer"
        aria-label="Open menu"
      >
        <FaBars className="text-xl" />
        <span className="font-semibold">All</span>
      </button>
      <Link
        to="/products/category/electronics"
        className="hover:outline hover:outline-white rounded-sm p-1 whitespace-nowrap"
      >
        Electronic
      </Link>
      <Link
        to="/products/category/clothing"
        className="hover:outline hover:outline-white rounded-sm p-1 whitespace-nowrap"
      >
        Fashion
      </Link>
      <Link
        to="/products/category/home"
        className="hover:outline hover:outline-white rounded-sm p-1 whitespace-nowrap"
      >
        Home
      </Link>
      <Link
        to="/products/category/kitchen"
        className="hover:outline hover:outline-white rounded-sm p-1 whitespace-nowrap"
      >
        Kitchen
      </Link>
      <Link
        to="/products/category/beauty"
        className="hover:outline hover:outline-white rounded-sm p-1 whitespace-nowrap hidden show-on-med sm:inline-block"
      >
        Beauty
      </Link>
      <Link
        to="/products/category/watches"
        className="hover:outline hover:outline-white rounded-sm p-1 whitespace-nowrap hidden show-on-med sm:inline-block"
      >
        Watches
      </Link>
    </nav>
  );
}
