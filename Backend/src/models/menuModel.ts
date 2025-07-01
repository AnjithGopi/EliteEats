import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.ObjectId, ref: "Vendor" },
  itemName: { type: String, required: true },
  images:{type:String},
  category: { type: mongoose.Schema.ObjectId, ref: "MenuCategory" },
  description: { type: String, required: true },
  quantity: { type: Number },
  isAvailable: { type: Boolean, default: true },
  isActive:{type:Boolean,default:true},
  featuredItem:{type:Boolean,default:false},
  price: { type: String },
  availableFrom: {
    start: { type: Date },
    end: { type: Date },
  },
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;


