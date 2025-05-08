import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoCloseCircle } from "react-icons/io5";

export default function SideBar({ isOpen, onClose }) {
  // Prevent background scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function to reset overflow when component unmounts or isOpen changes
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay: Fades out the background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-40 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white w-full max-w-xs sm:max-w-sm md:w-80 lg:w-96 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Main menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-start p-4 bg-lightBlue text-white">
          <CgProfile className="text-2xl mr-2" />
          <h2 className="text-xl font-bold">Hello, sign in</h2>
        </div>

        {/* Sidebar Content with scroll */}
        <div className="overflow-y-auto h-[calc(100%-72px)]">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            aria-label="Close menu"
          >
            <IoCloseCircle className="text-2xl" />
          </button>
          <nav className="p-4">
            <section className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 pt-2 pb-1">
                Shop by Department
              </h3>
              <ul>
                {[
                  "Electronics",
                  "Computers",
                  "Smart Home",
                  "Arts & Crafts",
                ].map((item) => (
                  <li
                    key={item}
                    className="py-2.5 px-2 hover:bg-gray-100 rounded-md cursor-pointer text-gray-700 text-sm"
                  >
                    {item} <span className="float-right">›</span>
                  </li>
                ))}
                <li className="py-2.5 px-2 hover:bg-gray-100 rounded-md cursor-pointer text-gray-700 text-sm">
                  See all{" "}
                  <span className="inline-block transform transition-transform duration-200 ease-in-out group-hover:rotate-180">
                    ▾
                  </span>
                </li>
              </ul>
            </section>

            <div className="border-t border-gray-200 my-3"></div>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 pt-2 pb-1">
                Programs & Features
              </h3>
              <ul>
                {[
                  "Gift Cards",
                  "Shop By Interest",
                  "Amazon Live",
                  "International Shopping",
                ].map((item) => (
                  <li
                    key={item}
                    className="py-2.5 px-2 hover:bg-gray-100 rounded-md cursor-pointer text-gray-700 text-sm"
                  >
                    {item} <span className="float-right">›</span>
                  </li>
                ))}
                <li className="py-2.5 px-2 hover:bg-gray-100 rounded-md cursor-pointer text-gray-700 text-sm">
                  See all{" "}
                  <span className="inline-block transform transition-transform duration-200 ease-in-out group-hover:rotate-180">
                    ▾
                  </span>
                </li>
              </ul>
            </section>
          </nav>
        </div>
      </aside>
    </>
  );
}
