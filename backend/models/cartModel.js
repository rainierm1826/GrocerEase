import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      purchaseAtPrice: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
