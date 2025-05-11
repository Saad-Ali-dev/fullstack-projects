// client/src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-lightBlue text-white p-8 text-center">
      <div className="container mx-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} Amazon Clone. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          This is a portfolio project and not affiliated with Amazon.
        </p>
        {/* You can add more links or information here */}
        <div className="mt-4">
          <a href="#top" className="text-gray-300 hover:text-white px-3">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
