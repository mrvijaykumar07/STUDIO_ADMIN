import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import MobileSideMenu from "./MobileSideMenu";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="md:hidden fixed top-0 left-0 w-full bg-white text-lg shadow-md z-50 px-4">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-pink-500">
          StudioBandhan
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="w-8 h-8 flex flex-col justify-between items-center p-2"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-gray-900 transition-transform ${
              navOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-900 ${navOpen ? "hidden" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-900 transition-transform ${
              navOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[40vw] bg-white shadow-lg z-50 transform ${
          navOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl text-black"
          onClick={() => setNavOpen(false)}
        >
          <HiX />
        </button>

        {/* Pass onClose to close on link click */}
        <MobileSideMenu onClose={() => setNavOpen(false)} />
      </div>
    </header>
  );
};

export default Navbar;
