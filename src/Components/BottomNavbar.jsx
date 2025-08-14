import { FaHome, FaSearch, FaClipboardList, FaBell, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const BottomNavbar = () => {
  return (
    <div className="md:hidden  fixed bottom-0 left-0 right-0 z-50 shadow-[0_-2px_20px_rgba(0,0,0,0.1)] mx-auto max-w-3xl md:rounded-4xl">
      <div className="flex justify-around items-center h-16 w-full md:rounded-4xl text-xs text-white bg-[#007bff]">
        <Link
          to="/"
          className="flex flex-col items-center hover:opacity-90 transition-all duration-300"
        >
          <FaHome size={20} />
          <span>Home</span>
        </Link>

        <Link
          to="/libraries"
          className="flex flex-col items-center hover:opacity-90 transition-all duration-300"
        >
          <FaSearch size={20} />
          <span>Explore</span>
        </Link>

        <Link
          to="/my-plan"
          className="flex flex-col items-center hover:opacity-90 transition-all duration-300"
        >
          <FaClipboardList size={22} />
          <span>My Plan</span>
        </Link>

        <Link
          to="/notifications"
          className="flex flex-col items-center hover:opacity-90 transition-all duration-300"
        >
          <FaBell size={20} />
          <span>Alerts</span>
        </Link>

        <Link
          to="/user"
          className="flex flex-col items-center hover:opacity-90 transition-all duration-300"
        >
          <FaUser size={20} />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavbar;
