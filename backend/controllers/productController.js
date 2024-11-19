import Product from "../models/productModel.js";

// get product
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products)
      return res.status(400).json({ status: false, message: "no product" });

    return res.status(200).json({ status: true, products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "internal error" });
  }
};

// update product
export const updateProduct = async (req, res) => {
  try {
    const { _id, updatedProduct } = req.body;

    const updateProduct = await Product.findByIdAndUpdate(
      _id,
      { $set: updatedProduct },
      { new: true }
    );

    if (!updateProduct) {
      return res
        .status(400)
        .json({ status: false, message: "no product found" });
    }
    return res
      .status(200)
      .json({ status: true, updateProduct, message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "internal error" });
  }
};

// add product
export const addProduct = async (req, res) => {
  const { image, productName, category, price, stock } = req.body;

  try {
    const newProduct = new Product({
      image,
      productName,
      category,
      price,
      stock,
    });

    await newProduct.save();

    return res
      .status(200)
      .json({ status: true, newProduct, message: "Added Successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: "internal error" });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  try {
    const { _id } = req.body;

    const product = await Product.findByIdAndDelete(_id);

    if (!product)
      return res
        .status(404)
        .json({ status: false, message: "Deleted unsuccessfully" });

    return res
      .status(200)
      .json({ status: true, message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "internal error" });
  }
};
