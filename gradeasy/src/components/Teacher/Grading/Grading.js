// src/components/Teacher/Grading/Grading.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../../Context/storecontext";
import "./Grading.css";

const Grading = () => {
  const { token } = useContext(StoreContext);
  const [evaluationGuidelines, setEvaluationGuidelines] = useState("");
  const [tests, setTests] = useState([]); // State for pending tests
  const [loadingTests, setLoadingTests] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tests created by the teacher when component mounts
  useEffect(() => {
    const fetchTests = async () => {
      setLoadingTests(true);
      try {
        const response = await axios.get("http://localhost:7656/api/tests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Assuming response.data.tests contains the array of tests
        setTests(response.data.tests);
      } catch (err) {
        console.error("Error fetching tests:", err);
        setError("Failed to fetch tests.");
      } finally {
        setLoadingTests(false);
      }
    };

    if (token) {
      fetchTests();
    }
  }, [token]);

  const handleSaveGuidelines = () => {
    console.log("Teacher guidelines updated:", evaluationGuidelines);
    // You can add saving logic here (e.g., sending to backend)
  };

  // Function to trigger analysis for a specific test
  const handleAnalyze = async (testId) => {
    try {
      const response = await axios.post(
        `http://localhost:7656/api/grading/analyze/${testId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Analysis triggered successfully!");
      console.log("Analysis Response:", response.data);
    } catch (err) {
      console.error("Error triggering analysis:", err);
      alert("Failed to trigger analysis.");
    }
  };

  return (
    <div className="grading-container">
      {/* Header */}
      <div className="grading-header">
        <h2>Grading Center</h2>
        <p>Review and manage AI-assisted grading</p>
      </div>

      {/* Guidelines Section */}
      <div className="guidelines-section">
        <h3>Teacher Evaluation Guidelines (Optional)</h3>
        <textarea
          value={evaluationGuidelines}
          onChange={(e) => setEvaluationGuidelines(e.target.value)}
          placeholder="Add instructions for the AI model..."
        />
        <button className="save-guidelines-btn" onClick={handleSaveGuidelines}>
          Save Guidelines
        </button>
      </div>

      {/* Pending Assignments Section */}
      <div className="pending-assignments">
        <h3>Pending Assignments</h3>
        {loadingTests ? (
          <p>Loading tests...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : tests.length === 0 ? (
          <p>No tests available.</p>
        ) : (
          tests.map((test) => (
            <AssignmentItem
              key={test._id}
              test={test}
              onAnalyze={() => handleAnalyze(test._id)}
            />
          ))
        )}
      </div>

      {/* Current Grading Section (Example with dummy data) */}
      <div className="grading-box grading-large">
        <div className="grading-box-header grading-flex">
          <h3>Science Test 2 - Question 3</h3>
          <div>
            <button className="grading-btn save">Save</button>
            <button className="grading-btn next">Next</button>
          </div>
        </div>

        <div className="grading-box-content">
          <GradingSection title="Question">
            <p>
              Explain the process of photosynthesis and its importance in the
              ecosystem.
            </p>
          </GradingSection>

          <GradingSection title="Student Response">
            <div className="grading-response">
              <p>
                Photosynthesis is the process where plants convert sunlight
                into energy. They use water and carbon dioxide to make glucose
                and oxygen...
              </p>
            </div>
          </GradingSection>

          <GradingSection title="AI Analysis">
            <AIAnalysis
              confidence="85%"
              keyPoints={[
                "Basic process explanation",
                "Reactants and products mentioned",
                "Ecological importance",
              ]}
              missingElements={[
                "Chlorophyll's role",
                "Light-dependent reactions",
                "Detailed chemical equation",
              ]}
            />
          </GradingSection>

          <GradingSection title="Grade Assignment">
            <div className="grading-score">
              <span>AI Suggested Score:</span>
              <strong>7/10</strong>
            </div>
            <div className="grading-input">
              <input type="number" defaultValue="7" min="0" max="10" /> / 10
            </div>
            <div className="grading-feedback">
              <label>Feedback</label>
              <textarea
                rows="3"
                defaultValue="Good basic understanding of photosynthesis. Consider including more details..."
              />
            </div>
          </GradingSection>
        </div>
      </div>
    </div>
  );
};

// Reusable Components

const AssignmentItem = ({ test, onAnalyze }) => {
  return (
    <div className="assignment-item">
      <div>
        <h4>{test.title}</h4>
        <p>
          Date: {new Date(test.date).toLocaleDateString()} | Subject: {test.subject}
        </p>
      </div>
      <div className="assignment-right">
        <span className="pending-label yellow">
          {test.submissionsPending ? test.submissionsPending : 0} Pending
        </span>
        <button className="grading-btn analyze" onClick={onAnalyze}>
          Analyze
        </button>
      </div>
    </div>
  );
};

const GradingSection = ({ title, children }) => {
  return (
    <div className="grading-section">
      <h4>{title}</h4>
      {children}
    </div>
  );
};

const AIAnalysis = ({ confidence, keyPoints, missingElements }) => {
  return (
    <div className="ai-analysis">
      <h4>
        Key Concepts Identified <span className="confidence">{confidence}</span>
      </h4>
      <div className="analysis-box">
        <h5>Key Points:</h5>
        <ul>
          {keyPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="analysis-box missing">
        <h5>Missing Elements:</h5>
        <ul>
          {missingElements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Grading;
