// src/components/Teacher/ListOfStudents/ListOfStudents.js
import React, { useState } from "react";
import "./ListOfStudents.css";
import { FaSearch } from "react-icons/fa";

const ListOfStudents = () => {
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
  );
};

export default ListOfStudents;
