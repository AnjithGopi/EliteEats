import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  hotelId: { type: mongoose.Schema.ObjectId, ref: "Vendor" },
  items: [
    {
      productId: { type: mongoose.Schema.ObjectId, ref: "Menu" },
      quantity: { type: Number },
      productName: { type: String },
      productImage: { type: String },
      productPrice: { type: Number },
    },
  ],
  totalPrice: { type: Number, default: 0 },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
