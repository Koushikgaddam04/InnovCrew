// src/components/Teacher/Performance/Performance.js
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Performance.css";

const PerformancePage = () => {
  // =======================
  // 1) Performance State/Logic (none needed here, just static data)
  // =======================

  // =======================
  // 2) Student List State/Logic
  // =======================
  const [searchTerm, setSearchTerm] = useState("");
  const students = [
    { id: "STU001", name: "John Smith", score: "85%", completed: "15/18" },
    { id: "STU002", name: "Sarah Davis", score: "92%", completed: "18/18" },
    { id: "STU003", name: "Mike Johnson", score: "78%", completed: "12/18" },
    { id: "STU004", name: "Emily White", score: "88%", completed: "16/18" },
  ];

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="performance-page-container">
      {/* ======================================== */}
      {/* SECTION A: Performance Analytics Section */}
      {/* ======================================== */}
      <div className="performance-container">
        <h1 className="performance-title">Performance Analytics</h1>
        <p className="performance-subtitle">
          Comprehensive analysis of student performance metrics
        </p>

        {/* Cards Row */}
        <div className="performance-cards">
          <div className="perf-card">
            <h3>Class Average</h3>
            <p>78%</p>
          </div>
          <div className="perf-card">
            <h3>Passing Rate</h3>
            <p>89%</p>
          </div>
          <div className="perf-card">
            <h3>Improvement</h3>
            <p>+12%</p>
          </div>
          <div className="perf-card">
            <h3>Submissions</h3>
            <p>94%</p>
          </div>
        </div>

        {/* Table */}
        <h2 className="performance-details-title">Performance Details</h2>
        <table className="perf-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Average Score</th>
              <th>Highest Score</th>
              <th>Lowest Score</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mathematics</td>
              <td>82%</td>
              <td>98%</td>
              <td>65%</td>
              <td className="trend-up">↑ 5.2%</td>
            </tr>
            <tr>
              <td>Science</td>
              <td>78%</td>
              <td>95%</td>
              <td>62%</td>
              <td className="trend-up">↑ 3.8%</td>
            </tr>
            <tr>
              <td>English</td>
              <td>75%</td>
              <td>92%</td>
              <td>58%</td>
              <td className="trend-down">↓ 1.2%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ======================================== */}
      {/* SECTION B: List of Students Section      */}
      {/* ======================================== */}
      <div className="students-container">
        <div className="students-header-section">
          <h2 className="students-header">Student Profiles</h2>
          <p className="students-subtext">
            View, search, and manage student performance data effectively.
          </p>

          {/* Search Bar */}
          <div className="search-bar-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-bar"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className="students-grid">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div className="student-card" key={student.id}>
                <div className="student-info">
                  <h3>{student.name}</h3>
                  <p>
                    ID: <span>{student.id}</span>
                  </p>
                  <p>
                    Avg Score: <span className="score">{student.score}</span>
                  </p>
                  <p>
                    Assignments Completed: <span>{student.completed}</span>
                  </p>
                </div>
                <button className="view-details-btn">View Details</button>
              </div>
            ))
          ) : (
            <p className="no-students">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;
