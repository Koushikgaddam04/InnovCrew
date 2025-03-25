// src/components/Student/Submissions/StudentSubmissions.js
import React from "react";
import "./StudentSubmissions.css";

const StudentSubmissions = () => {
  return (
    <div className="submissions-wrapper">
      {/* Navy angled shape at the top */}
      <div className="submissions-topshape"></div>

      {/* Main Content Container */}
      <div className="submissions-content">
        {/* Heading Section */}
        <div className="submissions-heading">
          <h1>My Submissions</h1>
          <p>Review your past tests and feedback in one place.</p>
        </div>

        {/* Submissions Table */}
        <div className="submissions-table-container">
          <table className="submissions-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Date</th>
                <th>Score</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Math Quiz 1</td>
                <td>2025-04-10</td>
                <td>85%</td>
                <td>
                  <button className="feedback-btn">View Feedback</button>
                </td>
              </tr>
              <tr>
                <td>Science Quiz 2</td>
                <td>2025-04-15</td>
                <td>90%</td>
                <td>
                  <button className="feedback-btn">View Feedback</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentSubmissions;
