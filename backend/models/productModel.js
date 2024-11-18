import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: True,
      unique: True,
    },
    price: {
      type: String,
      require: True,
    },
    stock: {
      type: String,
      require: True,
    },
  },
  {
    timestamps: True,
  }
);

const Product = mongoose.model("product", productSchema);
export default Product;
