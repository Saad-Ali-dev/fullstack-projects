import React, { useRef, useState, useEffect, useCallback } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const ProductCarousel = ({
  title,
  items,
  seeMoreLink,
  seeMoreText = "See more",
}) => {
  const scrollContainerRef = useRef(null);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  // Defines how much to scroll relatively to the visible width of the container
  const SCROLL_AMOUNT_PERCENTAGE = 0.8; // Scrolls 80% of the visible width

  const checkButtonVisibility = useCallback(() => {
    if (!scrollContainerRef.current) {
      setShowPrevButton(false);
      setShowNextButton(false);
      return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const Epsilon = 1; // Small tolerance for floating point comparisons

    setShowPrevButton(scrollLeft > Epsilon);
    // Check if there's more content to scroll to on the right
    setShowNextButton(scrollWidth - clientWidth - scrollLeft > Epsilon);

    // If the content is not wide enough to scroll, hide both buttons
    if (scrollWidth <= clientWidth + Epsilon) {
      setShowPrevButton(false);
      setShowNextButton(false);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    // If no container or no items, ensure buttons are hidden and do nothing further
    if (!container || !items || items.length === 0) {
      checkButtonVisibility();
      return;
    }

    // Initial check for button visibility
    checkButtonVisibility();

    // Add event listeners for scroll and resize events
    container.addEventListener("scroll", checkButtonVisibility, {
      passive: true,
    });
    window.addEventListener("resize", checkButtonVisibility);

    // Cleanup event listeners on component unmount or when dependencies change
    return () => {
      container.removeEventListener("scroll", checkButtonVisibility);
      window.removeEventListener("resize", checkButtonVisibility);
    };
  }, [items, checkButtonVisibility]);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;

    const { clientWidth } = scrollContainerRef.current;
    const scrollAmount = clientWidth * SCROLL_AMOUNT_PERCENTAGE;

    if (direction === "left") {
      scrollContainerRef.current.scrollLeft -= scrollAmount;
    } else {
      scrollContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  // Handle cases where there are no items to display
  if (!items || items.length === 0) {
    return (
      <div className="py-4">
        {title && (
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 px-1 sm:px-0">
            {title}
          </h3>
        )}
        <p className="text-gray-500 px-1 sm:px-0">
          No items to display in this section.
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 py-4 px-10 bg-white shadow-md ">
      {/* Header Section: Title and "See more" link */}
      {title && (
        <div className="flex items-baseline justify-between mb-3 px-1 sm:px-0">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            {title}
          </h3>
          {seeMoreLink && (
            <a
              href={seeMoreLink}
              className="text-sm text-blue-600 hover:underline hover:text-blue-800 whitespace-nowrap ml-4"
            >
              {seeMoreText}
            </a>
          )}
        </div>
      )}

      {/* Carousel Section */}
      <div className="relative group">
        {" "}
        {/* Scrollable Item Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scroll-smooth py-2 space-x-3 sm:space-x-4 no-scrollbar"
        >
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="flex-shrink-0 w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48"
            >
              <img
                src={item.imageUrl}
                alt={item.altText || `Item ${index + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {/* Previous Button */}
        {showPrevButton && (
          <button
            onClick={() => handleScroll("left")}
            aria-label="Scroll to previous items"
            className="absolute top-1/2 -translate-y-1/2 left-1 sm:left-2
                       bg-white hover:bg-gray-100
                       h-20 w-10 sm:h-24 sm:w-12 flex items-center justify-center
                       rounded-md shadow-lg border border-gray-300
                       text-gray-700 hover:text-gray-900 transition-all duration-200 ease-in-out
                       z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <IoChevronBackOutline className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
        {/* Next Button */}
        {showNextButton && (
          <button
            onClick={() => handleScroll("right")}
            aria-label="Scroll to next items"
            className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-2
                       bg-white hover:bg-gray-100
                       h-20 w-10 sm:h-24 sm:w-12 flex items-center justify-center
                       rounded-md shadow-lg border border-gray-300
                       text-gray-700 hover:text-gray-900 transition-all duration-200 ease-in-out
                       z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <IoChevronForwardOutline className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
