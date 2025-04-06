import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../Context/storecontext";
import "./Login.css";

const Login = () => {
  const { setToken, role } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const requestData = { email, password };
      if (role === "admin") {
        requestData.secretCode = secretCode;
      }

      const response = await axios.post(
        `http://localhost:7656/api/${role}/login`,
        requestData
      );

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("role", role);
        
        if (role === "student") {
          navigate("/student");
        } else if (role === "teacher") {
          navigate("/teacher");
        } else if (role === "admin") {
          navigate("/admin");
        }
      }
    } catch (error) {
      setError("Login failed! Please check your credentials.");
      console.error("Login failed", error);
    }
  };



  
  // Code for testing
  
    // const handleLogin = async (e) => {
    //   e.preventDefault();
    //   setError(""); // Reset error before login attempt
    //   try {
    //     const requestData = { email, password };
    //     if (role === "admin") {
    //       requestData.secretCode = secretCode; // Add secret code for admin login
    //     }
    //     if (role === "student") {
    //       navigate("/student");
    //     } else if (role === "teacher") {
    //       navigate("/teacher");
    //     } else if (role === "admin") {
    //       navigate("/admin");
    //     }
    //   } catch (error) {
    //     setError("Login failed! Please check your credentials.");
    //     console.error("Login failed", error);
    //   }
    // };




  const handleRegisterRedirect = () => {
    if (role === "student") {
      navigate("/register/student");
    } else if (role === "teacher") {
      navigate("/register/teacher");
    }
  };

  return (
    <div className={`auth-background login-${role}`}>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />

          {role === "admin" && (
            <input
              type="text"
              placeholder="Secret Code"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              required
              className="form-control"
            />
          )}

          <button type="submit" className="btn">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>

        {role !== "admin" && (
          <p>
            Don't have an account?{" "}
            <button onClick={handleRegisterRedirect} className="link-button">
              Register
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;


