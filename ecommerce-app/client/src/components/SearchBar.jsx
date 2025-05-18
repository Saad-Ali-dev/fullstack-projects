import { FaCaretDown, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to the search results page with the query parameter
      navigate(`/products/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  return (
    <>
      {/* Search Bar - Make it grow */}
      <div className="flex-grow flex items-center w-full width-90 sm:w-[90%] md:w-auto order-last md:order-none md:px-0 focus-within:ring-2 focus-within:ring-orange-500 transition rounded-md mb-2 md:mb-0 sm:mx-auto">
        <form onSubmit={handleSearch} className="inline-flex w-full">
          {/* Category Dropdown */}
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 h-10 rounded-l-md border-r border-gray-400 flex items-center whitespace-nowrap flex-shrink-0">
            All{" "}
            <div className="ml-1 text-gray-500">
              <FaCaretDown />
            </div>{" "}
          </button>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Amazon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          </button>
        </form>
      </div>
    </>
  );
}
