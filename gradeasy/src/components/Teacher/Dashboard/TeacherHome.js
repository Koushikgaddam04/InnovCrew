// src/components/Teacher/Dashboard/TeacherHome.js
import React from "react";
import "./TeacherHome.css"; // rename your old TeacherDashboard.css to TeacherHome.css

const TeacherHome = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Dashboard Overview</h1>
      <p>Welcome back! Here's your teaching overview.</p>

      {/* Metrics Section */}
      <div className="dashboard-metrics">
        <div className="metric-card">
          <h3>Total Students</h3>
          <p>156</p>
        </div>

        <div className="metric-card">
          <h3>Pending Reviews</h3>
          <p>23</p>
        </div>

        <div className="metric-card">
          <h3>Average Score</h3>
          <p>78%</p>
        </div>

        <div className="metric-card">
          <h3>Assignments</h3>
          <p>12</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>📌 Recent Activity</h2>
        <div className="activity-item">
          ✅ <span>Math Quiz Graded - 25 submissions reviewed</span>
        </div>
        <div className="activity-item">
          📝 <span>New Assignment Created - Science Quiz</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
