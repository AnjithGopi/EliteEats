import mongoose from "mongoose";

const MenuCategorySchema = new mongoose.Schema({
  hotelId:{type:mongoose.Schema.ObjectId,ref:"Vendor"},
  name: { type: String },
  description:{type:String}
});

const MenuCategory = mongoose.model("MenuCategory", MenuCategorySchema);

export default MenuCategory;
