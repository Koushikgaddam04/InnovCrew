import React, { useEffect, useState } from "react";

const ListOfStudents = () => {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:7656/api/teacher/students", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h2>List of Students</h2>
      <ul>
        {students.length > 0 ? (
          students.map((student) => (
            <li key={student._id}>{student.name} - {student.email}</li>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </ul>
    </div>
  );
};

export default ListOfStudents;
