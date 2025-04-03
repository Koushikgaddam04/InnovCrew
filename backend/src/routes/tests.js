import express from "express";
import Test from "../models/Assignment.js";
import { authMiddleware } from "../middlewares/auth.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route   POST /api/tests
 * @desc    Create a test (Only Teachers)
 * @access  Private
 */
router.post("/", authMiddleware, async (req, res) => {
    try {
        if (!req.user || req.user.role !== "teacher") {
            return res.status(403).json({ success: false, message: "Access denied: Teachers only" });
        }

        const { title, questions, department, subject, date } = req.body;

        if (!title || !subject || !date || !Array.isArray(questions) || questions.length === 0 || !department) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Convert department to uppercase
        const formattedDepartment = department.trim().toUpperCase();

        const newTest = new Test({
            title,
            subject,
            date,
            questions,
            department: formattedDepartment,  // Now stores in UPPERCASE
            createdBy: req.user.id,
        });

        await newTest.save();
        console.log(`✅ Test created by Teacher (${req.user.id}) in department: ${formattedDepartment}`);
        res.status(201).json({ success: true, message: "Test created successfully!", test: newTest });

    } catch (error) {
        console.error("❌ Error in creating test:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

/**
 * @route   GET /api/tests
 * @desc    Get tests for students (filtered by department) or teachers (their own tests)
 * @access  Private
 */
router.get("/", authMiddleware, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        let tests;
        if (req.user.role === "teacher") {
            tests = await Test.find({ createdBy: req.user.id }).select("-__v");
            console.log(`👨‍🏫 Teacher (${req.user.id}) fetching tests. Found: ${tests.length}`);
        } else if (req.user.role === "student") {
            const student = await User.findById(req.user.id).select("department");
            if (!student) {
                console.log("❌ Student not found in DB");
                return res.status(404).json({ success: false, message: "Student not found." });
            }

            // Convert department to uppercase for filtering
            const formattedDepartment = student.department.trim().toUpperCase();
            console.log(`🎓 Student (${req.user.id}) department: ${formattedDepartment}`);

            tests = await Test.find({ department: formattedDepartment }).select("-__v");
            console.log(`✅ Tests found for student: ${tests.length}`);

        } else {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        res.status(200).json({ success: true, tests });

    } catch (error) {
        console.error("❌ Error fetching tests:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default router;
