import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/userNavbar.css";
import WalletPopup from "../pages/wallet";
import {
  FaBars,
  FaUserTie,
  FaSignOutAlt,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import {
  MdDashboard,
  MdUpload,
  MdEdit,
  MdHandshake,
  MdAccountBalanceWallet,
} from "react-icons/md";

const Navbar = ({ onAuthChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);

      if (onAuthChange) onAuthChange(null);

      toast.success("Logged out successfully!", {
        autoClose: 2000,
        theme: "colored",
      });

      setTimeout(() => navigate("/Home"), 2200);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed!", { autoClose: 2000, theme: "colored" });
    }
  };

  // ✅ Wallet modal controls
  const openWalletModal = () => {
    setIsWalletModalOpen(true);
    setSidebarOpen(false);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  // ✅ Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen)
      document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="user-navbar">
      {/* Left section: menu + logo + sidebar */}
      <div className="user-left-section">
        <FaBars
          className="user-menu-icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="user-logo">
          <img
            src="/GoCarbonPositive_LOGO.svg"
            alt="CarbonCredit Logo"
            className="user-logo-icon"
          />
          <span className="user-logo-text">CarbonCredit</span>
        </div>

        {sidebarOpen && (
          <div className="sidebar-dropdown" ref={sidebarRef}>
            <NavLink
              to="/userDashboard"
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active-link" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <MdDashboard className="sidebar-icon sidebar-blue" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active-link" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <MdUpload className="sidebar-icon sidebar-purple" />
              <span>Assets</span>
            </NavLink>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active-link" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <MdEdit className="sidebar-icon sidebar-orange" />
              <span>Blog</span>
            </NavLink>

            <NavLink
              to="/engage"
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active-link" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <MdHandshake className="sidebar-icon sidebar-teal" />
              <span>Engage</span>
            </NavLink>

            <div
              className="sidebar-item"
              onClick={() => {
                openWalletModal();
                setSidebarOpen(false);
              }}
            >
              <MdAccountBalanceWallet
                className="sidebar-icon sidebar-gold"
                style={{ fontSize: "1.8rem" }}
              />
              <span>Wallet</span>
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active-link" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <FaInfoCircle className="sidebar-icon sidebar-purple" />
              <span>About</span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active-link" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <FaEnvelope className="sidebar-icon sidebar-yellow" />
              <span>Contact</span>
            </NavLink>

            <div
              className="sidebar-item sidebar-logout"
              onClick={() => {
                handleLogout();
                setSidebarOpen(false);
              }}
              style={{ cursor: "pointer" }}
            >
              <FaSignOutAlt className="sidebar-icon sidebar-red" />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>

      {/* Center section: wallet */}
      <div className="user-nav-links user-nav-links-center">
        <div className="user-nav-item wallet-nav-item" onClick={openWalletModal}>
          <MdAccountBalanceWallet className="wallet-icon" />
          <span className="wallet-text">Wallet</span>
        </div>
      </div>

      {/* ✅ Right section: profile / login */}
      <div className="user-right-section">
        {user ? (
          <NavLink to="/profile" className="user-profile-link">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt="User"
                className="w-8 h-8 rounded-full object-cover border-2 border-green-700 hover:scale-110 transition-transform"
              />
            ) : (
              <span className="text-green-700 font-semibold hover:underline">
                {user.username || user.email?.split("@")[0]}
              </span>
            )}
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 transition-colors"
          >
            Login
          </NavLink>
        )}
      </div>

      {/* Wallet modal */}
      {isWalletModalOpen && (
        <div className="wallet-modal-overlay" onClick={closeWalletModal}>
          <div
            className="wallet-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <WalletPopup onClose={closeWalletModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
