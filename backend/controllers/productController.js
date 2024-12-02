import Product from "../models/productModel.js";

// get products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products)
      return res.status(400).json({ status: false, message: "no product" });

    return res.status(200).json({ status: true, products });
  } catch (error) {
    return res.status(500).json({ status: false, message: "internal error" });
  }
};

// get product
export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product)
      return res.status(400).json({ status: false, message: "no product" });

    return res.status(200).json({ status: true, product });
  } catch (error) {
    return res.status(500).json({ status: false, message: "internal error" });
  }
};

// filter products
export const filterProducts = async (req, res) => {
  try {
    const { category } = req.params;
    const product = await Product.find({ category });

    if (!product)
      return res.status(400).json({ status: false, message: "no product" });

    return res.status(200).json({ status: true, product });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "internal error", error: error.message });
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
  const {
    image,
    productName,
    category,
    price,
    stock,
    measurement,
    description,
  } = req.body;

  try {
    const newProduct = new Product({
      image,
      productName,
      category,
      price,
      stock,
      measurement,
      description,
    });

    await newProduct.save();

    return res
      .status(200)
      .json({ status: true, newProduct, message: "Added Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "internal error", error: error });
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
    return res.status(500).json({ status: false, message: "internal error" });
  }
};


