import mongoose, { model } from "mongoose";

const vendorSchema = new mongoose.Schema({
  restaurentId:{type:String,unique:true},
  name: { type: String },
  address:{type:String},
  email: { type: String, unique: true },
  password: { type: String },
  phone: { type: String||null||undefined },
  description: { type: String },
  cuisineType: { type: String },
  isActive: { type: Boolean, default: true },
  adminVerified: { type: Boolean, default: false },
  createdAt:{type:Date,default:Date.now()}

});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
