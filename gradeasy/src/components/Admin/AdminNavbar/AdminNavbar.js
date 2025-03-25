// src/components/Admin/AdminNavbar/AdminNavbar.js
import React from "react";
import { Link } from "react-router-dom"; // or your own routing
import "./AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <h2 className="navbar-title">Admin Dashboard</h2>
      <div className="navbar-right">
        {/* Logout button/link */}
        <Link to="/" className="logout-btn">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
