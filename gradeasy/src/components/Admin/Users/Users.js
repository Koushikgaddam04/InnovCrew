// src/components/Admin/Users/Users.js
import React, { useEffect, useState } from "react";
import "./Users.css";

const Users = () => {
  // For the slideshow
  const [index, setIndex] = useState(0);
  // Fake slides array
  const slides = ["Slide 1", "Slide 2", "Slide 3"];

  // Classes Data by Year
  const [classData, setClassData] = useState({
    "1st Year": ["IOT-A", "IOT-B", "EEE-B", "CSE-C"],
    "2nd Year": ["CSE-A", "CSE-B", "ECE-A", "ECE-B"],
    "3rd Year": ["MECH-A", "MECH-B", "EEE-A", "EEE-B"],
    "4th Year": ["CIVIL-A", "CIVIL-B", "ARCH-A", "ARCH-B"],
  });

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // The class we clicked on (e.g. "IOT-A") to show table
  const [selectedClass, setSelectedClass] = useState(null);

  // Dummy user data displayed in the table
  const dummyUsers = [
    { id: 1, name: "John Doe", role: "Student", email: "john@example.com" },
    { id: 2, name: "Jane Smith", role: "Teacher", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", role: "Student", email: "alice@example.com" },
  ];

  // For the Add Class popup
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [popupYear, setPopupYear] = useState(null); // which year we are adding to
  const [newClassName, setNewClassName] = useState("");

  // Slideshow auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Filter classes based on searchTerm
  const getFilteredClassData = () => {
    if (!searchTerm) return classData;

    const lowerSearch = searchTerm.toLowerCase();
    const filtered = {};

    Object.keys(classData).forEach((year) => {
      const filteredClasses = classData[year].filter((className) =>
        className.toLowerCase().includes(lowerSearch)
      );
      if (filteredClasses.length > 0) {
        filtered[year] = filteredClasses;
      }
    });

    return filtered;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedClass(null); // reset selected class if searching
  };

  // On click of a class item
  const handleClassClick = (className) => {
    setSelectedClass(className);
  };

  // Show popup to add class
  const handleAddClassToYear = (year) => {
    setPopupYear(year);
    setNewClassName("");
    setShowAddPopup(true);
  };

  // Confirm adding a class
  const handleAddClassConfirm = () => {
    if (!newClassName.trim()) return; // do nothing if empty
    // Create a copy of classData
    const updated = { ...classData };
    updated[popupYear] = [...updated[popupYear], newClassName];
    setClassData(updated);

    setShowAddPopup(false);
    setPopupYear(null);
    setNewClassName("");
  };

  // Cancel the popup
  const handleAddClassCancel = () => {
    setShowAddPopup(false);
    setPopupYear(null);
    setNewClassName("");
  };

  const filteredData = getFilteredClassData();

  return (
    <div className="users-page">
      {/* Notification or top bar */}
      <div className="notification-icon">🔔</div>

      {/* Main Container */}
      <div className="container">
        {/* Slideshow */}
        <div className="slideshow-container">
          <div className="slideshow">
            {slides.map((slide, i) => (
              <div
                className="slide"
                key={i}
                style={{ transform: `translateX(${(i - index) * 100}%)` }}
              >
                {slide}
              </div>
            ))}
          </div>
          <div className="add-button">
            <button>Add</button>
          </div>
        </div>

        {/* Info Boxes */}
        <div className="info-container">
          <div className="info-box">
            <h3>Teacher Online</h3>
            <p>Online: 5</p>
            <p>Offline: 10</p>
            <p>Total: 15</p>
          </div>
          <div className="info-box">
            <h3>Student Online</h3>
            <p>Online: 50</p>
            <p>Offline: 100</p>
            <p>Total: 150</p>
          </div>
        </div>
      </div>

      {/* Class Section */}
      <div className="class-section">
        <h2>Class List</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search class..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Display filtered classes */}
        {Object.keys(filteredData).length === 0 ? (
          <p>No classes found.</p>
        ) : (
          Object.keys(filteredData).map((year) => (
            <div key={year}>
              <div className="year-header">
                <h3>{year}</h3>
                <button
                  className="add-year-btn"
                  onClick={() => handleAddClassToYear(year)}
                >
                  + Add Class
                </button>
              </div>
              <div className="classes">
                {filteredData[year].map((classItem, i) => (
                  <div
                    className="class-item"
                    key={i}
                    onClick={() => handleClassClick(classItem)}
                  >
                    {classItem}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* If a class is selected, show table */}
      {selectedClass && (
        <div className="admin-users-page">
          <h2>Manage Users in {selectedClass}</h2>
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyUsers.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.role}</td>
                    <td>{u.email}</td>
                    <td>
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* POPUP for Add Class */}
      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Add Class to {popupYear}</h3>
            <input
              type="text"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              placeholder="Enter class name"
            />
            <div className="popup-buttons">
              <button onClick={handleAddClassConfirm}>Add</button>
              <button onClick={handleAddClassCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
