import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subjects: { type: [String], required: true }, // Example: ["Math", "Physics"]
  experience: { type: Number, required: true }, // Example: 5 years
  qualification: { type: String, required: true }, // Example: "PhD in Physics"
});

export default mongoose.model("Teacher", TeacherSchema);
