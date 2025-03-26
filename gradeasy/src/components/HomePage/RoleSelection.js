// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { StoreContext } from "../Context/storecontext";

// const RoleSelection = () => {
//   const navigate = useNavigate();
//   const { setRole } = useContext(StoreContext);

//   const handleRoleSelect = (selectedRole) => {
//     setRole(selectedRole);
//     navigate("/login"); // Redirect to login after role selection
//   };

//   return (
//     <div style={containerStyle}>
//       <h2>Select Your Role</h2>
//       <button onClick={() => handleRoleSelect("student")} style={buttonStyle}>
//         Student
//       </button>
//       <button onClick={() => handleRoleSelect("teacher")} style={buttonStyle}>
//         Teacher
//       </button>
//     </div>
//   );
// };

// const containerStyle = {
//   textAlign: "center",
//   marginTop: "100px",
// };

// const buttonStyle = {
//   margin: "10px",
//   padding: "15px 30px",
//   fontSize: "18px",
//   cursor: "pointer",
//   border: "none",
//   borderRadius: "5px",
//   backgroundColor: "#007BFF",
//   color: "#fff",
// };

// export default RoleSelection;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/storecontext";

const RoleSelection = () => {
  const navigate = useNavigate();
  const { setRole } = useContext(StoreContext);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    navigate("/login"); // Redirect to login after role selection
  };

  return (
    <div style={containerStyle}>
      <h2>Select Your Role</h2>
      <button onClick={() => handleRoleSelect("student")} style={buttonStyle}>
        Student
      </button>
      <button onClick={() => handleRoleSelect("teacher")} style={buttonStyle}>
        Teacher
      </button>
      <button onClick={() => handleRoleSelect("admin")} style={adminButtonStyle}>
        Admin
      </button>
    </div>
  );
};

const containerStyle = {
  textAlign: "center",
  marginTop: "100px",
};

const buttonStyle = {
  margin: "10px",
  padding: "15px 30px",
  fontSize: "18px",
  cursor: "pointer",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#007BFF",
  color: "#fff",
};

const adminButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#FF5733", // Different color for Admin button
};

export default RoleSelection;
