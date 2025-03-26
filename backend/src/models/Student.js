import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  year: { type: String, required: true }, 
  department: { type: String, required: true }, // To categorize students
  createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
