import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Student from "../models/Student.js";
import {authMiddleware} from "../middlewares/auth.js";

dotenv.config();
const router = express.Router();

// Register Student
router.post("/register", async (req, res) => {
  const { name, email, password, year,department } = req.body;

  if (!name || !email || !password || !department || !year) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) return res.status(400).json({ error: "Student already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await Student.create({ name, email, password: hashedPassword,year, department });

    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Student Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ error: "Student not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Student Profile (Protected)
router.get("/profile", authMiddleware, (req, res) => {
  if (req.userType !== "student") {
    return res.status(403).json({ error: "Access denied. Students only." });
  }
  res.json(req.user);
});

export default router;
