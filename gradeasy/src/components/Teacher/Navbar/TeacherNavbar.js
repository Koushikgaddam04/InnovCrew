// src/components/Teacher/Navbar/TeacherNavbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";         // Main teacher navbar styles
import "./Navbar.css";  // Contains .logout-btn

const TeacherNavbar = () => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    // Clear any stored tokens
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Redirect to login page (adjust path as needed)
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo on the left */}
      <h2 className="logo">AI Teacher</h2>

      {/* Nav links on the right */}
      <ul className="nav-links">
        <li><Link to="/teacher">Dashboard</Link></li>
        <li><Link to="/teacher/students">Students</Link></li>
        <li><Link to="/teacher/performance">Performance</Link></li>
        <li><Link to="/teacher/create-test">Create Test</Link></li>
        <li><Link to="/teacher/grading">Grading</Link></li>
        <li><Link to="/teacher/submissions">Submissions</Link></li>

        {/* Logout Button */}
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default TeacherNavbar;
