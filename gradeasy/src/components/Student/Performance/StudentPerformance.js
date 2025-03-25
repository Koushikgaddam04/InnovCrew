import React from "react";
import "./StudentPerformance.css";

const StudentPerformance = () => {
  return (
    <div className="performance-container">
      <div className="performance-header">
        <h1 className="performance-title">Your Performance</h1>
        <p className="performance-intro">
          Monitor progress across various subjects and tests.
        </p>
      </div>

      <table className="performance-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Tests Taken</th>
            <th>Average Score</th>
            <th>Highest Score</th>
            <th>Lowest Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Math</td>
            <td>3</td>
            <td>82%</td>
            <td>95%</td>
            <td>70%</td>
          </tr>
          <tr>
            <td>Science</td>
            <td>2</td>
            <td>88%</td>
            <td>92%</td>
            <td>85%</td>
          </tr>
          <tr>
            <td>English</td>
            <td>2</td>
            <td>80%</td>
            <td>90%</td>
            <td>72%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentPerformance;
