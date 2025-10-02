import mongoose, { Schema,Model } from "mongoose";
import { IVendor } from "../interface/Vendor/IVendorModel";



const vendorSchema:Schema<IVendor> = new mongoose.Schema({
  restaurentId: { type: String, unique: true },
  name: { type: String },
  displayPicture: { type: String },
  address: { type: String },
  pincode: { type: Number },
  email: { type: String, unique: true },
  password: { type: String },
  phone: { type: String },
  description: { type: String },
  cuisineType: { type: String },
  isActive: { type: Boolean, default: true },
  adminVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number] },
  },
});

 vendorSchema.index({ location: "2dsphere" });

//const Vendor = mongoose.model("Vendor", vendorSchema);
const Vendor: Model<IVendor> = mongoose.model<IVendor>("Vendor", vendorSchema);

export default Vendor;
