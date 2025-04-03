import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Student from "../models/Student.js";
import {authMiddleware} from "../middlewares/auth.js";
import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";
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


router.get("/tests", authMiddleware, async (req, res) => {
  try {
    console.log("📌 Fetching student tests for:", req.user.id);

    const student = await Student.findById(req.user.id);
    if (!student) {
      console.log("❌ Student not found!");
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    console.log("✅ Student found. Department:", student.department);

    const tests = await Assignment.find({ department: student.department });
    console.log("📌 Found tests:", tests);

    res.json(tests);
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.get("/test/:id", async (req, res) => {
  try {
      const test = await Assignment.findById(req.params.id);
      if (!test) return res.status(404).json({ message: "Test not found" });

      res.json(test);
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
});
router.post("/submit-test", authMiddleware, async (req, res) => {
  try {
    const { testId, answers } = req.body;
    const studentId = req.user?.id; // Ensure this is not undefined

    console.log("Student ID:", studentId);
    console.log("Test ID:", testId);
    console.log("Answers:", answers);

    if (!studentId || !testId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    const submission = new Submission({
      studentId,
      testId,
      answers
    });

    await submission.save();
    res.status(201).json({ message: "Test submitted successfully!" });

  } catch (error) {
    console.error("Error submitting test:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
