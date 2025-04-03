import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import { authMiddleware } from "../middlewares/auth.js";


dotenv.config();
const router = express.Router();

// Register Teacher
router.post("/register", async (req, res) => {
  const { name, email, password, subjects, experience, qualification, department } = req.body;

  if (!name || !email || !password || !subjects || !experience || !qualification || !department) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) return res.status(400).json({ error: "Teacher already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = await Teacher.create({
      name,
      email,
      password: hashedPassword,
      subjects,
      experience,
      qualification,
      department, // Added department field
    });

    res.status(201).json({ message: "Teacher registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Teacher
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(400).json({ error: "Teacher not found" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: teacher._id, role: "teacher" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Teacher Profile (Protected)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    if (req.userType !== "teacher") {
      return res.status(403).json({ error: "Access denied. Teachers only." });
    }

    const teacher = await Teacher.findById(req.user.id).select("-password"); // Exclude password from response
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/students", authMiddleware, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Fetch students with the same department
    const students = await Student.find({ department: teacher.department });

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
