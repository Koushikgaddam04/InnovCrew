import React from "react";
import "./Tests.css";

const Tests = () => {
  // Sample test data
  const tests = [
    { id: 1, title: "Math Quiz 1", createdBy: "Teacher Jane", status: "Active" },
    { id: 2, title: "Science Test 2", createdBy: "Teacher John", status: "Draft" },
  ];

  return (
    <div className="admin-tests-page">
      <h2>Manage Tests</h2>
      <button className="create-test-btn">+ Create New Test</button>
      <div className="tests-table-container">
        <table className="tests-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test.id}>
                <td>{test.title}</td>
                <td>{test.createdBy}</td>
                <td>{test.status}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tests;
