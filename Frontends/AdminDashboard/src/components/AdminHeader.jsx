import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaUserCircle,
  FaBlog,
  FaChartLine,
  FaStore,
  FaUsers,
  FaBriefcase,
} from "react-icons/fa";
import { MdAnalytics, MdWorkspaces } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "../assets/GoCarbonPositive_LOGO.png";
import "../styles/AdminHeader.css";

const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen((prev) => !prev);
    setIsProfileOpen(false);
  };

  const handleOptionClick = (path) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    setShowLogoutMsg(true);
    setTimeout(() => {
      setShowLogoutMsg(false);
      navigate("/login");
    }, 2000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="admin-header">
        {/* Left Section */}
        <div className="header-left">
          {/* ✅ Hamburger Dropdown */}
          <div className="hamburger-container" ref={dropdownRef}>
            <FaBars className="hamburger" onClick={toggleDropdown} />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={() => handleOptionClick("/blog-management")}>
                    <FaBlog className="menu-icon" /> Blog Management
                  </li>
                  <li onClick={() => handleOptionClick("/case-study-management")}>
                    <FaChartLine className="menu-icon" /> Case Study Management
                  </li>
                  <li onClick={() => handleOptionClick("/analytics")}>
                    <MdAnalytics className="menu-icon" /> Analytics
                  </li>
                  <li onClick={() => handleOptionClick("/assets")}>
                    <MdWorkspaces className="menu-icon" /> Asset Management
                  </li>
                  <li onClick={() => handleOptionClick("/marketplace")}>
                    <FaStore className="menu-icon" /> Marketplace
                  </li>
                  <li onClick={() => handleOptionClick("/community-management")}>
                    <FaUsers className="menu-icon" /> Community Management
                  </li>
                  <li onClick={() => handleOptionClick("/career-management")}>
                    <FaBriefcase className="menu-icon" /> Career Management
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Logo & Header Text */}
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-text">
            <h1>Admin Dashboard</h1>
            <p>Platform management and control center</p>
          </div>
        </div>

        {/* ✅ Profile Section */}
        <div className="header-right" ref={profileRef}>
          <FaUserCircle className="profile-icon" onClick={toggleProfile} />
          {isProfileOpen && (
            <div className="profile-popup">
              <ul>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* ✅ Logout Popup */}
      {showLogoutMsg && (
        <div className="logout-popup">
          <p>✅ Logged out successfully!</p>
        </div>
      )}
    </>
  );
};

export default AdminHeader;
