import mongoose, { model, mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: Number, unique: true, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  otpVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

userSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 240, // 4 minutes = 240 seconds
    partialFilterExpression: { otpVerified: false },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
