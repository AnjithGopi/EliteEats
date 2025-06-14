import mongoose, { model } from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  mobile: { type: String, unique: true },
  description: { type: String },
  cusineType: { type: String },
  isActive: { type: Boolean, default: true },
  adminVerified: { type: Boolean, default: false },
  createdAt:{type:Date,default:Date.now()}

});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
