import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    products: [
      {
        quantity: {
          type: Number,
          required: True,
        },
        purchaseAtPrice: {
          type: Number,
          required: True,
        },
        total: {
          type: Number,
          required: True,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: True,
    },
    status: {
      type: String,
      required: True,
    },
    paymentMethod: {
      type: String,
      required: True,
    },
  },
  {
    timestamps: True,
  }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
