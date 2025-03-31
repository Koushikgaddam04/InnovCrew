import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

dotenv.config();

/**
 * Middleware to authenticate users (teachers & students)
 */
export const authMiddleware = async (req, res, next) => {
  try {
      const token = req.header("Authorization")?.split(" ")[1];

      if (!token) {
          return res.status(401).json({ success: false, message: "Access denied. No token provided." });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Debugging

      let user;
      if (decoded.role === "teacher") {
          user = await Teacher.findById(decoded.id).select("_id role name");
      } else if (decoded.role === "student") {
          user = await Student.findById(decoded.id).select("_id role name");
      }

      if (!user) {
          return res.status(404).json({ success: false, message: "User not found." });
      }

      req.user = { id: user._id, role: user.role, name: user.name };
      console.log("Final req.user:", req.user); // Debugging

      next();
  } catch (err) {
      console.error("Authentication Error:", err.message);
      return res.status(403).json({ success: false, message: "Invalid or expired token." });
  }
};



/**
 * Middleware to verify JWT token without fetching user details
 */
export const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user details to request
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};
