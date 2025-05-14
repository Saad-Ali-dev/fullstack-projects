import { FaBars } from "react-icons/fa";

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
      <a
        href="#"
        className="hover:outline hover:outline-white rounded-sm p-1 whitespace-nowrap"
      >
        Kitchen
      </a>
      <a
        href="#"
        className="hover:outline hover:outline-white rounded-sm p-1 whitespace-nowrap hidden show-on-med sm:inline-block"
      >
        Beauty
      </a>
      <a
        href="#"
        className="hover:outline hover:outline-white rounded-sm p-1 whitespace-nowrap hidden show-on-med sm:inline-block"
      >
        Gaming
      </a>
    </nav>
  );
}
