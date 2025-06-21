import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.ObjectId, ref: "Menu" },
      quantity: { type: Number },
    },
  ],
});



const Cart= mongoose.model("Cart",cartSchema)

export default Cart