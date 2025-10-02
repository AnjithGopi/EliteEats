// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     orderId: { type: String },
//     userId: { type: mongoose.Schema.ObjectId, ref: "User" },

//     products: {
//       type: [[mongoose.Schema.Types.Mixed]], // supports ['name', qty] formats
//       required: true,
//     },

//     hotelId: { type: mongoose.Schema.ObjectId, ref: "Vendor" },

//     totalAmount: { type: Number },
//     paymentMethod: { type: String, enum: ["cod", "razorpay", "RazorPay"] },
//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Recieved", "Failed", "Refund"],
//       default: "Pending",
//     },
//     orderStatus: {
//       type: String,
//       enum: [
//         "Order Placed",
//         "Confirmed",
//         "Shipped",
//         "Delivered",
//         "Cancelled",
//         "Returned",
//         "Pending",
//       ],
//       default: "Order Placed",
//     },
//     address: { type: String },
//     landMark: { type: String },
//     deliveryInstructions: { type: String },
//     deliveryfee: { type: Number },
//     latitude: { type: Number },
//     longitude: { type: Number },
//     subtotal: { type: Number },
//     tax: { type: Number },
//   },
//   { timestamps: true }
// );

// const Order = mongoose.model("Orders", orderSchema);

// export default Order;


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    hotelId: { type: mongoose.Schema.ObjectId, ref: "Vendor" },

    products: [
      {
        productId: { type: mongoose.Schema.ObjectId, ref: "Menu" },
        productName: { type: String },
        quantity: { type: Number, required: true },
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
        originalItemPrice: { type: Number },
      },
    ],

    subtotal: { type: Number },
    tax: { type: Number },
    deliveryfee: { type: Number },
    totalAmount: { type: Number },

    paymentMethod: { type: String, enum: ["cod", "razorpay", "RazorPay"] },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Received", "Failed", "Refund"],
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

    address: { type: String },
    landMark: { type: String },
    deliveryInstructions: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  { timestamps: true }
);

const Order = mongoose.model("Orders", orderSchema);

export default Order;
