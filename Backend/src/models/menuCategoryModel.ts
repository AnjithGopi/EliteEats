import mongoose from "mongoose";

const MenuCategorySchema = new mongoose.Schema({
  name: { type: String },
});

const MenuCategory = mongoose.model("MenuCategory", MenuCategorySchema);

export default MenuCategory;
