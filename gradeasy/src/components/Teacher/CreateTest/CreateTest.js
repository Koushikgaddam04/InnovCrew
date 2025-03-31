import React, { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../../Context/storecontext";
import "./CreateTest.css";

const CreateTest = () => {
<<<<<<< HEAD
  const [questions, setQuestions] = useState([""]);
  const [selectedClass, setSelectedClass] = useState("");
=======
    const { token } = useContext(StoreContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
>>>>>>> f9e3b7f (working create test and added grading model schema)

    const [formData, setFormData] = useState({
        title: "",
        department: "",
        subject: "",
        date: "",
        questions: [{ question: "", type: "short" }],
    });

    // Handle input changes for test details
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle question input changes
    const handleQuestionChange = (index, e) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[index][e.target.name] = e.target.value;
        setFormData({ ...formData, questions: updatedQuestions });
    };

<<<<<<< HEAD
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
=======
    // Add a new question
    const addQuestion = () => {
        setFormData((prevData) => ({
            ...prevData,
            questions: [...prevData.questions, { question: "", type: "short" }],
        }));
    };

    // Delete a question
    const deleteQuestion = (index) => {
        if (formData.questions.length === 1) return; // Ensure at least one question remains
        setFormData((prevData) => ({
            ...prevData,
            questions: prevData.questions.filter((_, i) => i !== index),
        }));
    };
>>>>>>> f9e3b7f (working create test and added grading model schema)

    // Reset the form
    const resetForm = () => {
        setFormData({
            title: "",
            department: "",
            subject: "",
            date: "",
            questions: [{ question: "", type: "short" }],
        });
        setError(null);
    };

<<<<<<< HEAD
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
=======
    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!token) {
            setError("Unauthorized: No token found. Please log in again.");
            setLoading(false);
            return;
        }

        console.log("Sending data:", formData); // Debugging - Check if the payload is correct

        try {
            const response = await axios.post(
                "http://localhost:7656/api/tests/",
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("Response:", response.data); // Debugging - Check server response
            alert(response.data.message || "Test Created Successfully!");
            resetForm();
        } catch (error) {
            console.error("Error creating test:", error);
            setError(error.response?.data?.message || "Failed to create test.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-test-page">
            <div className="form-container">
                <h2>Create Test</h2>

                {error && <p className="error-message">{error}</p>} {/* Display error messages */}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter test title (e.g., Midterm Exam)"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="department"
                        placeholder="Enter department (e.g., CSE, ECE)"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Enter subject (e.g., Data Structures)"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />

                    <h3>Questions</h3>
                    {formData.questions.map((q, index) => (
                        <div key={index} className="question-row">
                            <input
                                type="text"
                                name="question"
                                placeholder={`Enter Question ${index + 1}`}
                                value={q.question}
                                onChange={(e) => handleQuestionChange(index, e)}
                                required
                            />
                            <select
                                name="type"
                                value={q.type}
                                onChange={(e) => handleQuestionChange(index, e)}
                            >
                                <option value="short">Short Answer</option>
                                <option value="long">Long Answer</option>
                            </select>
                            {formData.questions.length > 1 && (
                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() => deleteQuestion(index)}
                                >
                                    ❌
                                </button>
                            )}
                        </div>
                    ))}

                    <button type="button" className="add-question-btn" onClick={addQuestion}>
                        ➕ Add Question
                    </button>

                    <div className="button-group">
                        <button
                            type="button"
                            className="reset-btn"
                            onClick={resetForm}
                            disabled={loading}
                        >
                            Reset
                        </button>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Submitting..." : "Create Test"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
>>>>>>> f9e3b7f (working create test and added grading model schema)
};

export default CreateTest;
