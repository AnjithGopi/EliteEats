import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.ObjectId, ref: "Vendor" },
  itemName: { type: String, required: true },
  category: { type: mongoose.Schema.ObjectId, ref: "MenuCategory" },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  images: { type: String },
  price: { type: Number },
  availableFrom: {
    start: { type: Date },
    end: { type: Date },
  },
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;


