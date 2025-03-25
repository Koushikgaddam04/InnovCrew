import React from "react";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="admin-settings-page">
      <h2>Admin Settings</h2>
      <div className="settings-form">
        <label>Dark Mode:</label>
        <input type="checkbox" />

        <label>Notifications:</label>
        <input type="checkbox" />

        <button>Save</button>
      </div>
    </div>
  );
};

export default Settings;
