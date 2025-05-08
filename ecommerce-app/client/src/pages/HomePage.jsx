// client/src/pages/HomePage.jsx
import React from "react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to Amazon Clone
      </h1>
      <p className="text-lg text-gray-700 mb-4 text-center">
        Browse our amazing selection of products. This is the homepage. More
        content will be added soon!
      </p>
      {/* Placeholder for product listings or featured items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {/* Example Product Card Placeholder */}
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="border rounded-lg p-4 shadow-lg">
            <div className="bg-gray-200 h-48 w-full mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 mb-2 animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
