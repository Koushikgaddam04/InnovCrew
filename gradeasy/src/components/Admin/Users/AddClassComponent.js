import React, { useState } from "react";

const AddClassComponent = () => {
  const [classes, setClasses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newClass, setNewClass] = useState("");

  const handleAddClass = () => {
    if (newClass.trim() !== "") {
      setClasses([...classes, newClass]);
      setNewClass("");
      setShowPopup(false);
    }
  };

  return (
    <div className="container">
      <h2>Class List</h2>
      <button className="add-class-btn" onClick={() => setShowPopup(true)}>
        Add Class
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Enter Class Name</h3>
            <input
              type="text"
              value={newClass}
              onChange={(e) => setNewClass(e.target.value)}
              placeholder="Enter class name"
            />
            <div className="popup-actions">
              <button onClick={handleAddClass}>Add</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <ul className="class-list">
        {classes.map((className, index) => (
          <li key={index}>{className}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddClassComponent;
