import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Teacher from "../models/Teacher.js";
import {authMiddleware} from "../middlewares/auth.js";

dotenv.config();
const router = express.Router();

// Register Teacher
router.post("/register", async (req, res) => {
  const { name, email, password, subjects, experience, qualification } = req.body;

  if (!name || !email || !password || !subjects || !experience || !qualification) {
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
router.get("/profile", authMiddleware, (req, res) => {
  if (req.userType !== "teacher") {
    return res.status(403).json({ error: "Access denied. Teachers only." });
  }
  res.json(req.user);
});

export default router;
