// import React, { createContext, useState, useEffect } from "react";

// export const StoreContext = createContext();

// const StoreProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const url = "http://localhost:7656"; // Update this with your backend URL

//   // Update token in localStorage whenever it changes
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   return (
//     <StoreContext.Provider value={{ token, setToken, url }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreProvider;
import React, { createContext, useState, useEffect } from "react";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || ""); // Store user role
  const url = "http://localhost:7656"; // Update this with your backend URL

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [token, role]);

  return (
    <StoreContext.Provider value={{ token, setToken, role, setRole, url }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
