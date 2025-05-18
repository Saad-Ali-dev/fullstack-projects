import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import heroImg1 from "../../assets/hero-img1.jpg";
import heroImg2 from "../../assets/hero-img2.jpg";
import heroImg3 from "../../assets/hero-img3.jpg";
import heroImg4 from "../../assets/hero-img4.jpg";
import heroImg5 from "../../assets/hero-img5.jpg";

const sliderImages = [
  {
    src: heroImg1,
    alt: "Get your gifts for Mother's Day.",
  },
  {
    src: heroImg2,
    alt: "Get your gifts for Father's Day.",
  },
  {
    src: heroImg3,
    alt: "Best kitchen products under $50.",
  },
  {
    src: heroImg4,
    alt: "New arrivals in toys for kids.",
  },
  {
    src: heroImg5,
    alt: "Shop for your Gaming needs.",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // useCallback for memoizing functions to prevent unnecessary re-renders
  // and stabilize dependencies for useEffect.
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1,
    );
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1,
    );
  }, []);

  // useEffect for automatic sliding
  useEffect(() => {
    const slideInterval = 15000;
    const timer = setInterval(() => {
      goToNext();
    }, slideInterval);

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(timer);
  }, [goToNext]);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group">
      {/* Image container - images are stacked here and opacity is used for transitions */}
      <div className="relative w-full h-full">
        {sliderImages.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out 
                        ${index === currentIndex ? "opacity-100 z-[1]" : "opacity-0 z-[-10]"}`}
            aria-hidden={index !== currentIndex}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay: transparent at top, fading to white at bottom */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_75%,rgba(255,255,255,1)_100%)]"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute top-[25%] left-2 sm:left-4 transform -translate-y-1/2 
                   bg-black/30 text-white p-2 sm:p-3 rounded-full 
                   hover:bg-black/50 focus:bg-black/50 focus:outline-none
                   transition-all duration-300 ease-in-out cursor-pointer z-10"
        aria-label="Previous image"
      >
        <FaChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute top-[25%] right-2 sm:right-4 transform -translate-y-1/2 
                   bg-black/30 text-white p-2 sm:p-3 rounded-full 
                   hover:bg-black/50 focus:bg-black/50 focus:outline-none
                   transition-all duration-300 ease-in-out cursor-pointer z-10"
        aria-label="Next image"
      >
        <FaChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}
