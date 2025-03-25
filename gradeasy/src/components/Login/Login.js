import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  // State to track the selected role and form type
  const [role, setRole] = useState("Student");
  const [isSignup, setIsSignup] = useState(false);

  // ======= REMOVE OR COMMENT OUT THE AUTO-REDIRECT =======
  // useEffect(() => {
  //   const alreadyLoggedIn = localStorage.getItem("loggedIn");
  //   const savedRole = localStorage.getItem("role");
  //   if (alreadyLoggedIn === "true" && savedRole) {
  //     // This line auto-redirects the user to their dashboard:
  //     navigate(`/${savedRole.toLowerCase()}`);
  //   }
  // }, [navigate]);
  // ========================================================

  // Handle login/sign-up
  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, skip real validation. Just set local storage and navigate.
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", role);

    // Navigate to the correct dashboard
    navigate(`/${role.toLowerCase()}`);
  };

  return (
    <div className="login-container">
      {/* Top Toggle for Student / Teacher / Admin */}
      <div className="toggle-container">
        <button
          className={`toggle-button ${role === "Student" ? "active" : ""}`}
          onClick={() => setRole("Student")}
        >
          Student
        </button>
        <button
          className={`toggle-button ${role === "Teacher" ? "active" : ""}`}
          onClick={() => setRole("Teacher")}
        >
          Teacher
        </button>
        <button
          className={`toggle-button ${role === "Admin" ? "active" : ""}`}
          onClick={() => setRole("Admin")}
        >
          Admin
        </button>

        {/* Sliding blue background */}
        <div
          className="toggle-bg"
          style={{
            left:
              role === "Teacher" ? "110px"
              : role === "Admin" ? "220px"
              : "0px",
          }}
        ></div>
      </div>

      {/* Sliding Login / Signup Forms */}
      <div className="slider-container">
        <div className={`form-slider ${isSignup ? "shift-left" : ""}`}>
          {/* --- LOGIN FORM --- */}
          <div className="form-box login-form">
            <h2>Login as {role}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
              <button className="btn-primary" type="submit">
                Log In
              </button>
            </form>
            <p className="toggle-text" onClick={() => setIsSignup(true)}>
              Don’t have an account? Sign up
            </p>
          </div>

          {/* --- SIGNUP FORM --- */}
          <div className="form-box signup-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Username" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone Number" required />
              <input type="password" placeholder="Password" required />
              <button className="btn-primary" type="submit">
                Sign Up
              </button>
            </form>
            <p className="toggle-text" onClick={() => setIsSignup(false)}>
              Already have an account? Log in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;