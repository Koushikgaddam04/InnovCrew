import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Ensure the frontend sends 'name'
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
