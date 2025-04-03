import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/storecontext";
import axios from "axios";

const Login = () => {
  const { setToken, role } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretCode, setSecretCode] = useState(""); // Secret code for admin
  const [error, setError] = useState(""); // Store login error messages
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError(""); // Reset error before login attempt

  //   try {
  //     const requestData = { email, password };
  //     if (role === "admin") {
  //       requestData.secretCode = secretCode; // Add secret code for admin login
  //     }

  //     const response = await axios.post(`http://localhost:7656/api/${role}/login`, requestData);

  //     if (response.data.token) {
  //       setToken(response.data.token);
  //       localStorage.setItem("role", role);

  //       // Redirect based on role
  //       if (role === "student") {
  //         navigate("/student");
  //       } else if (role === "teacher") {
  //         navigate("/teacher");
  //       } else if (role === "admin") {
  //         navigate("/admin");
  //       }
  //     }
  //   } catch (error) {
  //     setError("Login failed! Please check your credentials.");
  //     console.error("Login failed", error);
  //   }
  // };



// Code for testing

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before login attempt
    try {
      const requestData = { email, password };
      if (role === "admin") {
        requestData.secretCode = secretCode; // Add secret code for admin login
      }
      if (role === "student") {
        navigate("/student");
      } else if (role === "teacher") {
        navigate("/teacher");
      } else if (role === "admin") {
        navigate("/admin");
      }
    } catch (error) {
      setError("Login failed! Please check your credentials.");
      console.error("Login failed", error);
    }
  };







  const handleRegisterRedirect = () => {
    if (role === "student") {
      navigate("/register/student");
    } else if (role === "teacher") {
      navigate("/register/teacher");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={formStyle}>
        <input
          type="email"
          placeholder="Email"
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

        {/* Show Secret Code input only if admin is logging in */}
        {role === "admin" && (
          <input
            type="text"
            placeholder="Secret Code"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            required
            style={inputStyle}
          />
        )}

        <button type="submit" style={buttonStyle}>Login</button>

        {error && <p style={errorStyle}>{error}</p>}
      </form>

      {role !== "admin" && (
        <p>
          Don't have an account?{" "}
          <button onClick={handleRegisterRedirect} style={linkButtonStyle}>
            Register
          </button>
        </p>
      )}
    </div>
  );
};

// Styles for better UI
const containerStyle = {
  textAlign: "center",
  marginTop: "50px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const inputStyle = {
  margin: "10px",
  padding: "10px",
  width: "250px",
};

const buttonStyle = {
  padding: "10px 20px",
  marginTop: "10px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
  marginTop: "10px",
};

const linkButtonStyle = {
  background: "none",
  border: "none",
  color: "#007BFF",
  cursor: "pointer",
};

export default Login;
