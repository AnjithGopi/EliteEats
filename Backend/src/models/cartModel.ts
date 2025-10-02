// import mongoose from "mongoose";

// const cartSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.ObjectId, ref: "User" },
//   hotelId: { type: mongoose.Schema.ObjectId, ref: "Vendor" },
//   items: [
//     {
//       productId: { type: mongoose.Schema.ObjectId, ref: "Menu" },
//       quantity: { type: Number },
//       productName: { type: String },
//       productImage: { type: String },
//       productPrice: { type: Number },
//     },
//   ],
//   totalPrice: { type: Number, default: 0 },
// });

// const Cart = mongoose.model("Cart", cartSchema);

// export default Cart;

import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    hotelId: { type: mongoose.Schema.ObjectId, ref: "Vendor" },
    items: [
      {
        productId: { type: mongoose.Schema.ObjectId, ref: "Menu" },
        quantity: { type: Number },
        productName: { type: String },
        productImage: { type: String },
        productPrice: { type: Number },

        selectedVariant: {
          name: { type: String },
          price: { type: Number, default: 0 },
        },

        selectedAddons: [
          {
            name: { type: String },
            price: { type: Number, default: 0 },
          },
        ],

        itemTotalPrice: { type: Number },

        originalItemPrice: { type: Number }, // Base item price without modifications
      },
    ],
    totalPrice: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Add createdAt and updatedAt automatically
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
