import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../Context/storecontext.js";

const StudentRegister = () => {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    year: "",
    department: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/student/register`, data);
      if (response.data.success) {
        alert("Registration successful! Please log in.");
        navigate("/login?role=student");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error registering. Please try again.");
    }
  };

  return (
    <div className="register">
      <h2>Student Registration</h2>
      <form onSubmit={onRegister}>
        <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Full Name" required />
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" required />
        <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        <input name="year" onChange={onChangeHandler} value={data.year} type="text" placeholder="Year" required />
        <input name="department" onChange={onChangeHandler} value={data.department} type="text" placeholder="Department" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default StudentRegister;
