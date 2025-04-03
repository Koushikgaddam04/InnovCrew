// src/components/Student/Dashboard/StudentDashboard.js
import React, { useState } from "react";
import { FaCheckCircle, FaHourglassHalf, FaChartLine } from "react-icons/fa";
import ChatWidget from "./ChatWidget"; // Ensure ChatWidget.js is in the same folder
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [chatOpen, setChatOpen] = useState(false);

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

      {/* Chat Toggle Button */}
      <div className="chat-toggle">
        <button onClick={() => setChatOpen(!chatOpen)}>
          {chatOpen ? "Close Chat" : "Open Chat"}
        </button>
      </div>

      {/* Chat Widget Section (Only shows when chatOpen is true) */}
      {chatOpen && (
        <div className="chat-section">
          <ChatWidget onClose={() => setChatOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
