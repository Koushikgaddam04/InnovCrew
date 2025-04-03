import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  date: { type: String, required: true }, 
  questions: [
    {
      question: { type: String, required: true },
      type: { type: String, enum: ["short", "long"], required: true },
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
