

import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { StoreContext } from "./Context/storecontext";

// Role Selection Page (Now Homepage)
import RoleSelection from "./components/HomePage/RoleSelection";

// Authentication Pages
import Login from "./components/Login/Login";
import StudentRegister from "./components/Register/StudentRegister";
import TeacherRegister from "./components/Register/TeacherRegister";

// Student Layout & Pages
import StudentLayout from "./components/Student/StudentLayout";
import StudentDashboard from "./components/Student/Dashboard/StudentDashboard";
import StudentPerformance from "./components/Student/Performance/StudentPerformance";
import StudentTests from "./components/Student/Tests/StudentTests";
import StudentSubmissions from "./components/Student/Submissions/StudentSubmissions";

// Teacher Layout & Pages
import TeacherLayout from "./components/Teacher/TeacherLayout";
import TeacherDashboard from "./components/Teacher/Dashboard/TeacherDashboard";
import PerformancePage from "./components/Teacher/Performance/Performance";
import Grading from "./components/Teacher/Grading/Grading";
import TeacherSubmissions from "./components/Teacher/Submissions/Submissions";
import ListOfStudents from "./components/Teacher/ListOfStudents/ListOfStudents";
import CreateTest from "./components/Teacher/CreateTest/CreateTest";

// Admin Layout & Pages
import AdminLayout from "./components/Admin/AdminLayout";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Users from "./components/Admin/Users/Users";
import Tests from "./components/Admin/Tests/Tests";
import Analytics from "./components/Admin/Analytics/Analytics";
import Settings from "./components/Admin/Settings/Settings";

function App() {
  const { token, role } = useContext(StoreContext);

  return (
    <Router>
      <Routes>
        {/* ===================== Role Selection (Homepage) ===================== */}
        <Route path="/" element={<RoleSelection />} />

        {/* ===================== Authentication Routes ===================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/teacher" element={<TeacherRegister />} />

        {/* ===================== Student Routes (Protected) ===================== */}
        <Route
          path="/student"
          element={token && role === "student" ? <StudentLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<StudentDashboard />} />
          <Route path="performance" element={<StudentPerformance />} />
          <Route path="tests" element={<StudentTests />} />
          <Route path="submissions" element={<StudentSubmissions />} />
        </Route>

        {/* ===================== Teacher Routes (Protected) ===================== */}
        <Route
          path="/teacher"
          element={token && role === "teacher" ? <TeacherLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<TeacherDashboard />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="grading" element={<Grading />} />
          <Route path="submissions" element={<TeacherSubmissions />} />
          <Route path="students" element={<ListOfStudents />} />
          <Route path="create-test" element={<CreateTest />} />
        </Route>

        {/* ===================== Admin Routes (Protected) ===================== */}
        <Route
          path="/admin"
          element={token && role === "admin" ? <AdminLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="tests" element={<Tests />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ===================== Redirect Unknown Routes ===================== */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
