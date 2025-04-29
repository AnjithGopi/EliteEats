import mongoose, { model } from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  adminVerified: { type: Boolean, default: false },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
