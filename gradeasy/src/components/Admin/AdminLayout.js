// src/components/Admin/AdminLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <AdminSidebar />
      <div className="admin-main">
        {/* Renders nested admin routes like Dashboard, Users, etc. */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
