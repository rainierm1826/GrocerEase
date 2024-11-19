import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);
export default Product;
