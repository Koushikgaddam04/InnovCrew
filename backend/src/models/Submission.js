import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
    answers: [
        {
            question: { type: String, required: true },
            answer: { type: String, required: true },
        },
    ],
    submittedAt: { type: Date, default: Date.now }
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
