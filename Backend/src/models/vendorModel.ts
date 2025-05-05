import mongoose, { model } from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  isActive: { type: Boolean, default: true },
  adminVerified: { type: Boolean, default: false },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
