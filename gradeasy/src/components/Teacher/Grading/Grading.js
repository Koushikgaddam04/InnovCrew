// src/components/Teacher/Grading/Grading.js
import React, { useState } from "react";
import "./Grading.css";

const Grading = () => {
  // Optional teacher guidelines for AI
  const [evaluationGuidelines, setEvaluationGuidelines] = useState("");

  const handleSaveGuidelines = () => {
    console.log("Teacher guidelines updated:", evaluationGuidelines);
    // For now, we just log to console. You could store in localStorage or send to backend.
  };

  return (
    <div className="grading-container">
      {/* Header */}
      <div className="grading-header">
        <h2>Grading Center</h2>
        <p>Review and manage AI-assisted grading</p>
      </div>

      {/* Guidelines Section at the top */}
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

      {/* Grading Sections */}
      <div className="grading-sections">
        {/* Pending Assignments List */}
        <div className="grading-box">
          <div className="grading-box-header">
            <h3>Pending Assignments</h3>
          </div>
          <div className="grading-box-content">
            <AssignmentItem
              title="Mathematics Quiz 3"
              due="Oct 15, 2024"
              pending="25"
              color="yellow"
            />
            <AssignmentItem
              title="Science Test 2"
              due="Oct 12, 2024"
              pending="12"
              color="green"
            />
            <AssignmentItem
              title="English Essay"
              due="Oct 10, 2024"
              pending="5"
              color="red"
            />
          </div>
        </div>

        {/* Current Grading Section */}
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

            {/* Grading Input */}
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
    </div>
  );
};

// Reusable Components

const AssignmentItem = ({ title, due, pending, color }) => {
  // Called when Analyze is clicked
  const handleAnalyze = () => {
    console.log(`Analyzing ${title} assignment...`);
  };

  return (
    <div className="assignment-item">
      <div>
        <h4>{title}</h4>
        <p>Due: {due}</p>
      </div>
      <div className="assignment-right">
        <span className={`pending-label ${color}`}>{pending} Pending</span>
        <button className="grading-btn analyze" onClick={handleAnalyze}>
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
