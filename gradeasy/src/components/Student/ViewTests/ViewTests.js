import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewTests = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure authentication
        const res = await axios.get("http://localhost:7656/api/student/tests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTests(res.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, []);

  const handleTestClick = (testId) => {
    navigate(`/student/test/${testId}`); // Redirect to TestPage with testId
  };

  return (
    <div>
      <h2>Available Tests</h2>
      {tests.length > 0 ? (
        <ul>
          {tests.map((test) => (
            <li key={test._id}>
              <button 
                onClick={() => handleTestClick(test._id)} 
                style={{
                  background: "none",
                  border: "none",
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                {test.title}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tests available for your department.</p>
      )}
    </div>
  );
};

export default ViewTests;
