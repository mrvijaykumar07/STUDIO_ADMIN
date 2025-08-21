import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import studioLogo from "../assets/images/studioLogo2.png";
import { FaUser } from "react-icons/fa";
import {
  FaTachometerAlt,
  FaAddressBook,
  FaUsers,
  FaHandshake,
  FaMoneyBillWave,
  FaQrcode,
  FaChartLine,
  FaUserCog,
  FaCog,
} from "react-icons/fa";
import { FaVideo } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/"); // login page
    // onClose(); // remove ya define kar
  };

  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const handleLogin = () => {
    window.location.href = "/auth/google";
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    {
      name: "Lead Management",
      icon: <FaAddressBook />,
      path: "/lead-management",
    },
    { name: "Client & Events", icon: <FaUsers />, path: "/client-events" },
    { name: "Agreements", icon: <FaHandshake />, path: "/agreements" },
    { name: "Payments", icon: <FaMoneyBillWave />, path: "/payments" },
    { name: "QR Photo Sharing", icon: <FaQrcode />, path: "/qr-photo-sharing" },
    { name: "Analytics", icon: <FaChartLine />, path: "/analytics" },
    { name: "User Management", icon: <FaUserCog />, path: "/user-management" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
   <aside className="bg-white text-black w-64 p-4 space-y-2 border-r fixed top-0 left-0 h-screen overflow-y-auto z-20 hidden md:block">

      {/* Profile Card */}
      <div className="relative p-4 px-2 pt-1 rounded-xl bg-gradient-to-r from-[#958fa5] to-[#9b9d9d] text-white shadow-md h-36 flex flex-col items-center">
        <div className="w-16 h-16 my-1.5 bg-white rounded-full flex items-center justify-center overflow-hidden">
          {isAuthenticated ? (
            <img
              src={studioLogo}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <FaVideo size={34} className="text-black" />
          )}
        </div>

        {isAuthenticated ? (
          <>
            <h2 className="font-semibold text-base mb-1">{" StudioBandhana"}</h2>
            <p className="text-sm">{user?.email || "No Email"}</p>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="text-base font-semibold underline"
          >
            Login / Signup
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 p-1.5 rounded cursor-pointer ${
                isActive ? "bg-pink-500 text-white" : "hover:bg-pink-100"
              }`
            }
          >
            {item.icon} {item.name}
          </NavLink>
        ))}
      </div>

      {isAuthenticated && (
        <div className="p-3 border-t w-full">
          <button
            className="w-full bg-pink-600 text-white py-2 rounded text-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
