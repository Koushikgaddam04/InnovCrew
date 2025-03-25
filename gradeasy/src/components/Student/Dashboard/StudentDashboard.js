// src/components/Student/Dashboard/StudentDashboard.js
import React from "react";
import { FaCheckCircle, FaHourglassHalf, FaChartLine } from "react-icons/fa";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="hero-text">
          <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
          <p className="dashboard-intro">
            Keep track of your upcoming tests, performance insights, and more!
          </p>
        </div>
        {/* Optional illustration if you have an image file or an external URL */}
        {/* <img
          src="https://example.com/hero-illustration.png"
          alt="Hero Illustration"
          className="hero-illustration"
        /> */}
      </div>

      {/* Cards Section */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <FaCheckCircle className="card-icon" />
          <h3>Completed Tests</h3>
          <p>5</p>
        </div>
        <div className="dashboard-card">
          <FaHourglassHalf className="card-icon" />
          <h3>Pending Tests</h3>
          <p>2</p>
        </div>
        <div className="dashboard-card">
          <FaChartLine className="card-icon" />
          <h3>Average Score</h3>
          <p>85%</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
