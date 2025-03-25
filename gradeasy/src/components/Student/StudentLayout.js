// src/components/Student/StudentLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import StudentNavbar from "./Navbar/StudentNavbar";

const StudentLayout = () => {
  return (
    <>
      {/* Always show the student navbar */}
      <StudentNavbar />
      {/* Nested routes (Dashboard, Performance, etc.) render here */}
      <Outlet />
    </>
  );
};

export default StudentLayout;
