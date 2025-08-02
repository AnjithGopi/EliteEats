import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String },
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  products: [
    {
      productName: { type: String },
      hotelId: { type: mongoose.Schema.ObjectId, ref: "Vendor" },
      quantity: { type: Number },
    },
  ],
  totalAmount: { type: Number },
  paymentMethod: { type: String, enum: ["cod", "RazorPay"] },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Recieved", "Failed", "Refund"],
    default: "Pending",
  },
  orderStatus: {
    type: String,
    enum: [
      "Order Placed",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Returned",
      "Pending",
    ],
    default: "Order Placed",
  },
});

const Order = mongoose.model("Orders", orderSchema);

export default Order;
