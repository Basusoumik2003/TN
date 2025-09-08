import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/userNavbar.css";
import WalletPopup from "../pages/wallet";
import { FaBars, FaLeaf, FaUserTie, FaSignOutAlt, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { MdDashboard, MdUpload, MdEdit, MdHandshake, MdAccountBalanceWallet } from "react-icons/md";

const Navbar = ({ onAuthChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const sidebarRef = useRef(null);

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
    setSidebarOpen(false);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

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

    // Notify parent about logout
    if (onAuthChange) {
      onAuthChange(null);
    }

    toast.success("Logged out successfully!", { autoClose: 2000, theme: "colored" });

    setTimeout(() => {
      navigate("/Home");
    }, 2200);
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Logout failed!", { autoClose: 2000, theme: "colored" });
  }
};


  // 🔹 Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="user-navbar">
      <div className="user-left-section">
        <FaBars className="user-menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="user-logo">
  <img src="/GoCarbonPositive_LOGO.svg" alt="CarbonCredit Logo" className="user-logo-icon" />
  <span className="user-logo-text">CarbonCredit</span>
</div>


        {sidebarOpen && (
          <div className="sidebar-dropdown" ref={sidebarRef}>
            <NavLink to="/userDashboard" className={({ isActive }) => `sidebar-item ${isActive ? "active-link" : ""}`}>
              <MdDashboard className="sidebar-icon sidebar-blue" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/upload" className={({ isActive }) => `sidebar-item ${isActive ? "active-link" : ""}`}>
              <MdUpload className="sidebar-icon sidebar-purple" />
              <span>Assets</span>
            </NavLink>
            <NavLink to="/blog" className={({ isActive }) => `sidebar-item ${isActive ? "active-link" : ""}`}>
              <MdEdit className="sidebar-icon sidebar-orange" />
              <span>Blog</span>
            </NavLink>
            <NavLink to="/engage" className={({ isActive }) => `sidebar-item ${isActive ? "active-link" : ""}`}>
              <MdHandshake className="sidebar-icon sidebar-teal" />
              <span>Engage</span>
            </NavLink>
            <div className="sidebar-item" onClick={openWalletModal}>
              <MdAccountBalanceWallet className="sidebar-icon sidebar-gold" style={{ fontSize: '1.8rem' }} />
              <span>Wallet</span>
            </div>
            <NavLink to="/about" className={({ isActive }) => `sidebar-item ${isActive ? "active-link" : ""}`}>
              <FaInfoCircle className="sidebar-icon sidebar-purple" />
              <span>About</span>
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `sidebar-item ${isActive ? "active-link" : ""}`}>
              <FaEnvelope className="sidebar-icon sidebar-yellow" />
              <span>Contact</span>
            </NavLink>
            <div className="sidebar-item sidebar-logout" onClick={handleLogout} style={{ cursor: "pointer" }}>
              <FaSignOutAlt className="sidebar-icon sidebar-red" />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>

      <div className="user-nav-links user-nav-links-center">
        <div className="user-nav-item" onClick={openWalletModal} style={{
          padding: '0.3rem 1rem',
          borderRadius: '12px',
          background: 'none',
          boxShadow: 'none',
          transition: 'transform 0.18s',
          cursor: 'pointer',
          alignItems: 'center',
          display: 'flex',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MdAccountBalanceWallet className="icon" style={{ fontSize: '6rem', marginRight: '0.7rem', color: '#111', filter: 'none' }} />
          <span className="Nav-text" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#111' }}>Wallet</span>
        </div>
      </div>

      <div className="user-right-section">
        <NavLink to="/profile" className={({ isActive }) => `user-nav-item ${isActive ? "active-link" : ""} profile-icon`} style={{
          width: '32px', height: '32px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s, transform 0.18s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaUserTie style={{ color: '#2e7d32', fontSize: '1.3rem', transition: 'color 0.2s' }} />
        </NavLink>
      </div>

      {isWalletModalOpen && (
        <div className="wallet-modal-overlay" onClick={closeWalletModal}>
          <div className="wallet-modal-content" onClick={(e) => e.stopPropagation()}>
            <WalletPopup onClose={closeWalletModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
