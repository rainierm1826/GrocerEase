import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: True,
      unique: true,
    },
    price: {
      type: String,
      require: true,
    },
    stock: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);
export default Product;
