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



// Main Menu Schema (updated)
// const menuSchema = new mongoose.Schema({
//   hotelId: { type: mongoose.Schema.ObjectId, ref: "Vendor", required: true },
//   itemName: { type: String, required: true },
//   images: { type: String },
//   category: { type: mongoose.Schema.ObjectId, ref: "MenuCategory", required: true },
//   description: { type: String, required: true },
//   quantity: { type: Number },
//   isAvailable: { type: Boolean, default: true },
//   isActive: { type: Boolean, default: true },
//   featuredItem: { type: Boolean, default: false },
//   basePrice: { type: Number }, // Optional if using variants
//   price: { type: String }, // Keep for backward compatibility
//   availableFrom: {
//     start: { type: Date },
//     end: { type: Date },
//   },
// }, { timestamps: true });

// // Separate Variant Schema
// const variantSchema = new mongoose.Schema({
//   menuItemId: { type: mongoose.Schema.ObjectId, ref: "Menu", required: true },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   isAvailable: { type: Boolean, default: true },
//   sortOrder: { type: Number, default: 0 }
// }, { timestamps: true });

// // Separate Addon Schema
// const addonSchema = new mongoose.Schema({
//   menuItemId: { type: mongoose.Schema.ObjectId, ref: "Menu", required: true },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   isAvailable: { type: Boolean, default: true },
//   sortOrder: { type: Number, default: 0 }
// }, { timestamps: true });

// // Indexes
// menuSchema.index({ hotelId: 1, category: 1 });
// variantSchema.index({ menuItemId: 1 });
// addonSchema.index({ menuItemId: 1 });

// const Menu = mongoose.model("Menu", menuSchema);
// const MenuVariant = mongoose.model("MenuVariant", variantSchema);
// const MenuAddon = mongoose.model("MenuAddon", addonSchema);

// export { Menu, MenuVariant, MenuAddon };


