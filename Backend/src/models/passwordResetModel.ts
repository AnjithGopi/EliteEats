import mongoose from "mongoose";

const passwordresetTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    refPath: "userModel",
  },

  userModel: {
    type: String,
    required: true,
    enum: ["User", "Rider", "Vendor"],
  },
  token: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "1h", // Auto-delete after 1 hour 
  },
});

const Token = mongoose.model("PasswordResetToken", passwordresetTokenSchema);

export default Token
