import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Ensure the `.js` extension is included

// Import routes
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import teacherRoutes from "./routes/teachers.js";
//import assignmentRoutes from "./routes/assignments.js";
import studentRoutes from "./routes/students.js";
import testRoutes from "./routes/tests.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));
//app.use(cors());

// Connect to DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student",studentRoutes);
//app.use("/api/assignments", assignmentRoutes);
app.use("/api/tests", testRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
