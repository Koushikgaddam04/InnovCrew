import React, { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../../Context/storecontext";
import "./CreateTest.css";

const CreateTest = () => {
    const { token } = useContext(StoreContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        department: "",
        subject: "",
        date: "",
        questions: [{ question: "", type: "short" }],
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle question changes
    const handleQuestionChange = (index, e) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[index][e.target.name] = e.target.value;
        setFormData({ ...formData, questions: updatedQuestions });
    };

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

    // Reset the form
    const resetForm = () => {
        setFormData({
            title: "",
            department: "",
            subject: "",
            date: "",
            questions: [{ question: "", type: "short" }],
        });
        setSelectedClass("");
        setError(null);
    };

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

        console.log("Sending data:", formData); // Debugging

        try {
            const response = await axios.post(
                "http://localhost:7656/api/tests/",
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("Response:", response.data); // Debugging
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
                        <button type="submit" className="submit-btn" disabled={loading || !selectedClass}>
                            {loading ? "Submitting..." : "Create Test"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTest;
