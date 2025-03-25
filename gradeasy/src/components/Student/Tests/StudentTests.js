// src/components/Student/Tests/StudentTests.js
import React from "react";
import { FaBookOpen, FaFlask, FaPenFancy } from "react-icons/fa";
import "./StudentTests.css";

const StudentTests = () => {
  return (
    <div className="tests-wrapper">
      {/* Top Teal Wave */}
      <div className="tests-topwave"></div>

      {/* Main Content Container */}
      <div className="tests-content">
        {/* Heading Section */}
        <div className="tests-heading">
          <h1>Available Tests</h1>
          <p>Choose a test below and get started!</p>
        </div>

        {/* Tests Grid */}
        <div className="tests-grid">
          <div className="test-card">
            <div className="test-icon-bg">
              <FaBookOpen className="test-icon" />
            </div>
            <h3>Math Quiz 1</h3>
            <p>Chapters 1-3</p>
            <button className="start-btn">Start Test</button>
          </div>
          <div className="test-card">
            <div className="test-icon-bg">
              <FaFlask className="test-icon" />
            </div>
            <h3>Science Quiz 2</h3>
            <p>Chapters 4-6</p>
            <button className="start-btn">Start Test</button>
          </div>
          <div className="test-card">
            <div className="test-icon-bg">
              <FaPenFancy className="test-icon" />
            </div>
            <h3>English Essay</h3>
            <p>Topic: Modern Literature</p>
            <button className="start-btn">Start Test</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTests;
