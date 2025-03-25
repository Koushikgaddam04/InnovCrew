// src/components/Teacher/TeacherLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import TeacherNavbar from "./Navbar/TeacherNavbar";

const TeacherLayout = () => {
  return (
    <>
      {/* Teacher navbar is always visible */}
      <TeacherNavbar />

      {/* The child routes (Dashboard, Performance, etc.) appear here */}
      <Outlet />
    </>
  );
};

export default TeacherLayout;
