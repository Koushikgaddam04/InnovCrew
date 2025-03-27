import React, { useState } from "react";
import "./CreateTest.css";

const CreateTest = () => {
  const [questions, setQuestions] = useState([""]);
  const [selectedClass, setSelectedClass] = useState("");

  // Add a new question
  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  // Update question text
  const handleQuestionChange = (e, index) => {
    const updated = [...questions];
    updated[index] = e.target.value;
    setQuestions(updated);
  };

  // Delete a question
  const handleDeleteQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  // Reset the form
  const handleReset = () => {
    setQuestions([""]);
    setSelectedClass(""); // Reset dropdown
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Class:", selectedClass);
    console.log("Submitted Questions:", questions);
    alert(`Test for ${selectedClass} submitted successfully!`);
  };

  return (
    <div className="create-test-page">
      {/* Floating Add Question Button */}
      <button className="fixed-add-btn" onClick={handleAddQuestion}>
        + Add Question
      </button>

      <div className="form-container">
        <h2>Create Test</h2>

        {/* Class Dropdown */}
        <label htmlFor="class" className="dropdown-label">Select Class:</label>
        <select
          id="class"
          className="dropdown"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="" disabled>Select a class</option>
          <option value="CSE">CSE</option>
          <option value="AIML">AIML</option>
          <option value="IOT">IOT</option>
          <option value="DS">DS</option>
        </select>

        <form onSubmit={handleSubmit}>
          <div className="question-list">
            {questions.map((q, index) => (
              <div className="question-row" key={index}>
                <label className="question-label">
                  Question {index + 1}:
                </label>
                <input
                  type="text"
                  value={q}
                  onChange={(e) => handleQuestionChange(e, index)}
                  className="question-input"
                  placeholder="Enter your question here"
                />
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDeleteQuestion(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={!selectedClass} // Prevent submission without class selection
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTest;
