import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRegister = () => {
  const [name, setName] = useState(""); // Added name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretCode, setSecretCode] = useState(""); // Required for admin registration
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:7656/api/admin/register", {
        name, // Include name in request
        email,
        password,
        secretCode, // Backend should verify this code before creating an admin
      });

      if (response.data.message) {
        setSuccess("Admin registered successfully!");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
      }
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed! Invalid secret code or other issue.");
      console.error("Admin Registration Error:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Admin Registration</h2>
      <form onSubmit={handleRegister} style={formStyle}>
        <input
          type="text"
          placeholder="Admin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Secret Code"
          value={secretCode}
          onChange={(e) => setSecretCode(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Register</button>

        {error && <p style={errorStyle}>{error}</p>}
        {success && <p style={successStyle}>{success}</p>}
      </form>
    </div>
  );
};

// Styles
const containerStyle = { textAlign: "center", marginTop: "50px" };
const formStyle = { display: "flex", flexDirection: "column", alignItems: "center" };
const inputStyle = { margin: "10px", padding: "10px", width: "250px" };
const buttonStyle = { padding: "10px 20px", marginTop: "10px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" };
const errorStyle = { color: "red", marginTop: "10px" };
const successStyle = { color: "green", marginTop: "10px" };

export default AdminRegister;
