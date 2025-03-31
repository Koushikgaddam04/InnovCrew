import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewTests = () => {
  const [tests, setTests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:7656/api/tests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTests(response.data.tests);
      } catch (error) {
        setMessage("Error fetching tests");
      }
    };

    fetchTests();
  }, []);

  return (
    <div>
      <h2>Available Tests</h2>
      {message && <p>{message}</p>}
      {tests.length > 0 ? (
        <ul>
          {tests.map((test) => (
            <li key={test._id}>
              <h3>{test.title}</h3>
              <p>Department: {test.department}</p>
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
