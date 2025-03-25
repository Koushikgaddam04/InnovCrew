// src/components/Teacher/Navbar/TeacherNavbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const TeacherNavbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">AI Teacher</h2>

      <ul className="nav-links">
        <li><Link to="/teacher">Dashboard</Link></li>
        <li><Link to="/teacher/students">Students</Link></li>
        <li><Link to="/teacher/performance">Performance</Link></li>
        <li><Link to="/teacher/create-test">Create Test</Link></li>
        <li><Link to="/teacher/grading">Grading</Link></li>
        <li><Link to="/teacher/submissions">Submissions</Link></li>
        <div className="teacher-logout"><Link to="/" className="logout-btn">Logout</Link></div>
      </ul>

    </nav>
  );
};

export default TeacherNavbar;
