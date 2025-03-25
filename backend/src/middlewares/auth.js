import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

dotenv.config();

const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    let user;
    if (decoded.role === "teacher") {
      user = await Teacher.findById(decoded.id);
    } else if (decoded.role === "student") {
      user = await Student.findById(decoded.id);
    }

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = user;
    req.userType = decoded.role; // Store role in request

    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

export default authenticateUser;  