import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../models/Admin.js"; 
import {authMiddleware} from "../middlewares/auth.js";

dotenv.config();
const router = express.Router();

// ✅ Admin Registration (Only One Admin Allowed)
router.post("/register", async (req, res) => {
  const { name, email, password, secretCode } = req.body;

  if (!name || !email || !password || !secretCode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if an admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Validate secret code
    if (secretCode !== process.env.ADMIN_SECRET_CODE) {
      return res.status(403).json({ error: "Invalid secret code" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Admin Login
router.post("/login", async (req, res) => {
  const { email, password, secretCode } = req.body;

  if (!email || !password || !secretCode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    if (secretCode !== process.env.ADMIN_SECRET_CODE) {
      return res.status(403).json({ error: "Invalid secret code" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" } // ⏳ Token valid for 2 hours
    );

    res.json({ token, message: "Admin logged in successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get Admin Profile (Protected Route)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    if (req.userType !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
