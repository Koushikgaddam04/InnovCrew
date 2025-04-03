import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../../Context/storecontext";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const { url, token } = useContext(StoreContext);
  const [students, setStudents] = useState([]);
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    pendingReviews: 0,
    averageScore: 0,
    assignments: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch students in the teacher's department
        const studentsRes = await axios.get(`${url}/api/teacher/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch other metrics (You can adjust API endpoints accordingly)
        const metricsRes = await axios.get(`${url}/api/teacher/metrics`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudents(studentsRes.data);
        setMetrics(metricsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [url, token]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Teacher Dashboard</h1>
      <p>Welcome back! Here's your teaching overview.</p>

      {/* Metrics Section */}
      <div className="dashboard-metrics">
        <div className="metric-card">
          <h3>Total Students</h3>
          <p>{metrics.totalStudents}</p>
        </div>
        <div className="metric-card">
          <h3>Pending Reviews</h3>
          <p>{metrics.pendingReviews}</p>
        </div>
        <div className="metric-card">
          <h3>Average Score</h3>
          <p>{metrics.averageScore}%</p>
        </div>
        <div className="metric-card">
          <h3>Assignments</h3>
          <p>{metrics.assignments}</p>
        </div>
      </div>

      {/* Students List */}
      <div className="students-list">
        <h2>🎓 Students in Your Department</h2>
        {students.length > 0 ? (
          <ul>
            {students.map((student) => (
              <li key={student._id}>
                {student.name} - {student.email}
              </li>
            ))}
          </ul>
        ) : (
          <p>No students found in your department.</p>
        )}
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>📌 Recent Activity</h2>
        <div className="activity-item">
          ✅ <span>Math Quiz Graded - 25 submissions reviewed</span>
        </div>
        <div className="activity-item">
          📝 <span>New Assignment Created - Science Quiz</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
