// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 1) Login
import Login from "./components/Login/Login";

// 2) Student Layout & Pages
import StudentLayout from "./components/Student/StudentLayout";
import StudentDashboard from "./components/Student/Dashboard/StudentDashboard";
import StudentPerformance from "./components/Student/Performance/StudentPerformance";
import StudentTests from "./components/Student/Tests/StudentTests";
import StudentSubmissions from "./components/Student/Submissions/StudentSubmissions";

// 3) Teacher Layout & Pages
import TeacherLayout from "./components/Teacher/TeacherLayout";
import TeacherDashboard from "./components/Teacher/Dashboard/TeacherDashboard";
import PerformancePage from "./components/Teacher/Performance/Performance";
import Grading from "./components/Teacher/Grading/Grading";
import TeacherSubmissions from "./components/Teacher/Submissions/Submissions";
import ListOfStudents from "./components/Teacher/ListOfStudents/ListOfStudents";
import CreateTest from "./components/Teacher/CreateTest/CreateTest";

// 4) Admin Layout & Pages
import AdminLayout from "./components/Admin/AdminLayout"; // Must exist in: src/components/Admin/
import Dashboard from "./components/Admin/Dashboard/Dashboard"; // e.g. src/components/Admin/Dashboard/Dashboard.js
import Users from "./components/Admin/Users/Users";             // e.g. src/components/Admin/Users/Users.js
import Tests from "./components/Admin/Tests/Tests";             // e.g. src/components/Admin/Tests/Tests.js
import Analytics from "./components/Admin/Analytics/Analytics"; // e.g. src/components/Admin/Analytics/Analytics.js
import Settings from "./components/Admin/Settings/Settings";    // e.g. src/components/Admin/Settings/Settings.js

function App() {
  return (
    <Router>
      <Routes>
        {/* ===================== 1) LOGIN ===================== */}
        <Route path="/" element={<Login />} />

        {/* ===================== 2) STUDENT ===================== */}
        <Route path="/student" element={<StudentLayout />}>
          {/* /student => StudentDashboard */}
          <Route index element={<StudentDashboard />} />
          <Route path="performance" element={<StudentPerformance />} />
          <Route path="tests" element={<StudentTests />} />
          <Route path="submissions" element={<StudentSubmissions />} />
        </Route>

        {/* ===================== 3) TEACHER ===================== */}
        <Route path="/teacher" element={<TeacherLayout />}>
          {/* /teacher => TeacherDashboard */}
          <Route index element={<TeacherDashboard />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="grading" element={<Grading />} />
          <Route path="submissions" element={<TeacherSubmissions />} />
          <Route path="students" element={<ListOfStudents />} />
          <Route path="create-test" element={<CreateTest />} />
        </Route>

        {/* ===================== 4) ADMIN ===================== */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* /admin => AdminDashboard */}
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="tests" element={<Tests />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
