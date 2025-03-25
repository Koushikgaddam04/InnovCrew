import React from "react";
import { Link } from "react-router-dom";
import "./StudentNavbar.css";

const StudentNavbar = () => {
  return (
    <nav className="student-navbar">
      <div className="navbar-content">
        <h2 className="student-logo">Student Portal</h2>

        {/* Existing nav links */}
        <ul className="student-nav-links">
          <li><Link to="/student">Dashboard</Link></li>
          <li><Link to="/student/performance">Performance</Link></li>
          <li><Link to="/student/tests">Tests</Link></li>
          <li><Link to="/student/submissions">Submissions</Link></li>
          <div className="student-logout"><Link to="/" className="logout-btn">Logout</Link></div>
        </ul>

      </div>
    </nav>
  );
};

export default StudentNavbar;
