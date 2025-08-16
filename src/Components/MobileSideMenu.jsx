import React from "react";

import { useSelector } from "react-redux";

import studioLogo from '../assets/images/studioLogo2.png'; // default logo

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice"; // ✅ import logout action
import {
  FaUser,
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

const MobileSideMenu = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const profileImage = user?.profileImage;
  const currentUser = user;




  // const isLoggedIn = true; 
 


  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Lead Management", icon: <FaAddressBook />, path: "/lead-management" },
    { name: "Client & Events", icon: <FaUsers />, path: "/client-events" },
    { name: "Agreements", icon: <FaHandshake />, path: "/agreements" },
    { name: "Payments", icon: <FaMoneyBillWave />, path: "/payments" },
    { name: "QR Photo Sharing", icon: <FaQrcode />, path: "/qr-photo-sharing" },
    { name: "Analytics", icon: <FaChartLine />, path: "/analytics" },
    { name: "User Management", icon: <FaUserCog />, path: "/user-management" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  const handleLogout = () => {
    dispatch(logout()); // Remove from Redux
    localStorage.clear(); // Clear localStorage
    navigate("/"); // Navigate to login page
    onClose(); // Close the menu
  };

  return (
 <div className="flex flex-col h-full w-full overflow-x-hidden">
  {/* Profile Card */}
  <div className="p-6 bg-gradient-to-r from-[#958fa5] to-[#9b9d9d] text-white shadow-md flex flex-col items-center w-full ">
    <div className="w-20 h-20 mb-3 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-md">
      {isAuthenticated ? (
        <img
          src={profileImage || studioLogo} // profileImage hai to show karo, nahi to default studioLogo
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : (
        <FaUser size={40} className="text-black" />
      )}
    </div>

    {isAuthenticated ? (
      <>
        <h2 className="font-semibold text-base mb-1">{"StudioBandhan"}</h2>
        <p className="text-sm">{currentUser?.email || "No Email"}</p>
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



      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 w-full">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-2 py-2 rounded text-sm w-full ${
                isActive ? "bg-pink-500 text-white" : "hover:bg-pink-100"
              }`
            }
          >
            {item.icon} <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Logout */}
      <div className="p-3 border-t w-full">
        <button
          className="w-full bg-pink-600 text-white py-2 rounded text-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MobileSideMenu;
