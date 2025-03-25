// src/components/Teacher/Submissions/Submissions.js
import React, { useState } from "react";
import "./Submissions.css";

const Submissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Sample data
  const submissionsData = [
    { id: 1, student: "John Doe", assignment: "Math Quiz 3", subject: "Mathematics", status: "Pending" },
    { id: 2, student: "Jane Smith", assignment: "Science Test 2", subject: "Science", status: "Processing" },
    { id: 3, student: "Alice Johnson", assignment: "English Essay", subject: "English", status: "Completed" },
    { id: 4, student: "Bob Williams", assignment: "History Project", subject: "History", status: "Pending" },
  ];

  // Filter logic
  const filteredSubmissions = submissionsData.filter((submission) => {
    const matchesSearch = submission.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === "All Subjects" || submission.subject === subjectFilter;
    const matchesStatus = statusFilter === "All Status" || submission.status === statusFilter;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  return (
    <div className="submissions-container">
      {/* Page Header */}
      <div className="submissions-header">
        <h1 className="submissions-title">Submission Queue</h1>
        <p className="submissions-subtitle">Monitor and manage student submissions in real time</p>
      </div>

      {/* Filters Section */}
      <div className="submissions-filters">
        <input
          type="text"
          className="submissions-search"
          placeholder="Search by student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="submissions-select"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option>All Subjects</option>
          <option>Mathematics</option>
          <option>Science</option>
          <option>English</option>
          <option>History</option>
        </select>
        <select
          className="submissions-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Completed</option>
        </select>
        <button className="submissions-btn refresh">Refresh Queue</button>
        <button className="submissions-btn process">Process Selected</button>
      </div>

      {/* Status Overview Cards */}
      <div className="submissions-status">
        <div className="status-card pending-card">
          <h3>Pending Review</h3>
          <p>24</p>
        </div>
        <div className="status-card processing-card">
          <h3>Processing</h3>
          <p>8</p>
        </div>
        <div className="status-card completed-card">
          <h3>Completed Today</h3>
          <p>45</p>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="submissions-table-container">
        <table className="submissions-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Student</th>
              <th>Assignment</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((submission) => (
              <tr key={submission.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{submission.student}</td>
                <td>{submission.assignment}</td>
                <td>{submission.subject}</td>
                <td>
                  <span className={`submission-badge ${submission.status.toLowerCase()}`}>
                    {submission.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn">View</button>
                </td>
              </tr>
            ))}
            {filteredSubmissions.length === 0 && (
              <tr>
                <td colSpan="6" className="no-results">
                  No submissions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submissions;
