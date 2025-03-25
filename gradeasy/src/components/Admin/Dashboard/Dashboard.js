import React from "react";
import "./Dashboard.css";
import { FaUsers, FaClipboardList, FaChartBar, FaCog } from "react-icons/fa";
import AdminCard from "../AdminCard/AdminCard";

const Dashboard = () => {
  return (
    <div className="admin-dashboard-page">
      <h2>Admin Dashboard</h2>
      <div className="card-grid">
        <AdminCard
          icon={<FaUsers />}
          title="Users"
          value="250"
          onClick={() => console.log("Users clicked")}
        />
        <AdminCard
          icon={<FaClipboardList />}
          title="Tests"
          value="12"
          onClick={() => console.log("Tests clicked")}
        />
        <AdminCard
          icon={<FaChartBar />}
          title="Analytics"
          value="View"
          onClick={() => console.log("Analytics clicked")}
        />
        <AdminCard
          icon={<FaCog />}
          title="Settings"
          value="Config"
          onClick={() => console.log("Settings clicked")}
        />
      </div>
      <div className="dashboard-lower">
        <h3>Recent Activities</h3>
        <ul>
          <li>User John added a new test.</li>
          <li>Teacher Jane updated 3 test questions.</li>
          <li>Student Mike submitted a quiz.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
