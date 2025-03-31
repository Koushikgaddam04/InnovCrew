import mongoose from "mongoose";

const GradingSchema = new mongoose.Schema({
  testTitle: { type: String, required: true },  
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },  
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  
  responses: [
    {
      question: { type: String, required: true },
      studentAnswer: { type: String, required: true },
      grade: { type: String, required: true },
      feedback: { type: String, required: true }
    }
  ],
  overallGrade: { type: String, required: true },  
  overallFeedback: { type: String, required: true },  
  createdAt: { type: Date, default: Date.now }
});

const Grading = mongoose.model("Grading", GradingSchema);
export default Grading;
