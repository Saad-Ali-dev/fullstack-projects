import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProductBox({
  title,
  items,
  discoverMoreText,
  discoverMoreUrl,
}) {
  const displayItems = Array.isArray(items) ? items : [];
  const itemCount = displayItems.length;

  return (
    <div className="bg-white p-4 sm:p-5 flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out z-10 ">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
        {title}
      </h2>

      {/* DYNAMIC ITEMS RENDERING SECTION */}
      <div className="flex-grow">
        {itemCount === 1 && displayItems[0] ? (
          // Single Item Layout
          <Link
            to={displayItems[0].itemUrl || "/"}
            key={displayItems[0].id}
            className="group cursor-pointer no-underline block"
            aria-label={`View ${displayItems[0].caption}`}
          >
            <div className="aspect-video sm:aspect-[4/3] bg-gray-100 overflow-hidden  group-hover:shadow-md transition-shadow duration-200 mb-2 ">
              <img
                src={displayItems[0].imageUrl}
                alt={displayItems[0].caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                loading="lazy"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-700 group-hover:text-teal-700 transition-colors duration-200">
              {displayItems[0].caption}
            </p>
          </Link>
        ) : itemCount > 0 ? (
          // Grid Layout (for 2-4 items, or more, but slices to first 4)
          <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-5">
            {displayItems.slice(0, 4).map((item) => (
              <Link
                to={item.itemUrl || "/"}
                key={item.id}
                className="group cursor-pointer no-underline"
                aria-label={`View ${item.caption}`}
              >
                <div className="aspect-square bg-gray-100 overflow-hidden  group-hover:shadow-md transition-shadow duration-200">
                  <img
                    src={item.imageUrl}
                    alt={item.caption ? item.caption : ""}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs sm:text-sm mt-1.5 text-gray-700 group-hover:text-teal-700 transition-colors duration-200">
                  {item.caption}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          // Fallback for 0 items
          <p className="text-sm text-gray-500">No items to display.</p>
        )}
      </div>
      {/* DISCOVER MORE LINK */}
      <div className="mt-auto pt-3 sm:pt-4">
        <Link
          to={discoverMoreUrl}
          className="text-xs sm:text-sm text-teal-600 hover:text-orange-700 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-opacity-75 rounded-sm"
        >
          {discoverMoreText}
        </Link>
      </div>
    </div>
  );
}

ProductBox.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      imageUrl: PropTypes.string.isRequired,
      caption: PropTypes.string,
      itemUrl: PropTypes.string,
    }),
  ).isRequired,
  discoverMoreText: PropTypes.string.isRequired,
  discoverMoreUrl: PropTypes.string.isRequired,
};
