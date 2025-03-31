import express from "express";
import {authenticateTeacher} from "../middlewares/auth.js";
import Assignment from "../models/Assignment.js";

const router = express.Router();

// Create Assignment (Only for authenticated teachers)
router.post("/create", authenticateTeacher, async (req, res) => {
  const { title, department, questions } = req.body;

  if (!title || !department || !questions || questions.length === 0) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const assignment = await Assignment.create({
      title,
      department,
      questions,
      teacher: req.teacher._id, // Teacher ID from token
    });

    res.status(201).json({ message: "Assignment created successfully", assignment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Assignments for a Department (Students can access)
router.get("/:department", async (req, res) => {
  try {
    const assignments = await Assignment.find({ department: req.params.department });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
