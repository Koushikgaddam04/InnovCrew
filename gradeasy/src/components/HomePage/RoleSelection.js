import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/storecontext";
import "./RoleSelection.css";

const RoleSelection = () => {
  const navigate = useNavigate();
  const { setRole } = useContext(StoreContext);

  // Handle role selection and redirect
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="auth-background">
      <div className="container default-bg">
        <div className="card-wrap">
          <div className="card border-0 shadow card--welcome is-show" id="welcome">
            <div className="card-body">
              <h2 className="card-title">Select Your Role</h2>
              <p>Welcome to the login page. Please choose your role to continue.</p>
              <div className="btn-wrap">
                <button onClick={() => handleRoleSelect("student")} className="btn btn-lg btn-register stu">
                  Student
                </button>
                <button onClick={() => handleRoleSelect("teacher")} className="btn btn-lg btn-login tea">
                  Teacher
                </button>
                <button onClick={() => handleRoleSelect("admin")} className="btn btn-lg btn-admin adm">
                  Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
