import React from "react";
import "./AdminCard.css";

const AdminCard = ({ icon, title, value, onClick }) => {
  return (
    <div className="admin-card" onClick={onClick}>
      <div className="admin-card-icon">{icon}</div>
      <div className="admin-card-content">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default AdminCard;
