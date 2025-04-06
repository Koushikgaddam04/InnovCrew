import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../Context/storecontext";
import "./TeacherRegister.css"

const TeacherRegister = () => {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    subjects: "",
    experience: "",
    qualification: "",
    department: "", // Added department field
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/teacher/register`, data);
      if (response.status === 201) {
        alert("Registration successful! Please log in.");
        navigate("/login?role=teacher");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Error registering. Please try again.");
    }
  };

  return (
    <div className="register">
      <form onSubmit={onRegister}>
        <h2>Teacher Registration</h2>
        <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Full Name" required />
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" required />
        <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        <input name="subjects" onChange={onChangeHandler} value={data.subjects} type="text" placeholder="Subjects (comma-separated)" required />
        <input name="experience" onChange={onChangeHandler} value={data.experience} type="number" placeholder="Experience (years)" required />
        <input name="qualification" onChange={onChangeHandler} value={data.qualification} type="text" placeholder="Qualification" required />
        <input name="department" onChange={onChangeHandler} value={data.department} type="text" placeholder="Department" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default TeacherRegister;
