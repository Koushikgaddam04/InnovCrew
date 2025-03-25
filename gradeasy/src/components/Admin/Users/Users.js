import React from "react";
import "./Users.css";

const Users = () => {
  // Sample data
  const users = [
    { id: 1, name: "John Doe", role: "Student", email: "john@example.com" },
    { id: 2, name: "Jane Smith", role: "Teacher", email: "jane@example.com" },
  ];

  return (
    <div className="admin-users-page">
      <h2>Manage Users</h2>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>{u.email}</td>
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

export default Users;
