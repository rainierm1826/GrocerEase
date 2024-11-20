import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

// checkout
export const checkout = async (req, res) => {
  try {
    const {
      userId,
      productId,
      totalAmount,
      status,
      paymentMethod,
      quantity,
      purchaseAtPrice,
    } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found", id: productId });
    }

    // Check stock availability
    if (product.stock < quantity) {
      return res.status(400).json({
        status: false,
        message: `Insufficient stock. Available: ${product.stock}`,
      });
    }

    const checkOutOrder = new Order({
      user: userId,
      products: [
        {
          productId,
          quantity,
          purchaseAtPrice,
          total: quantity * purchaseAtPrice,
        },
      ],
      totalAmount,
      status,
      paymentMethod,
    });
    await checkOutOrder.save();

    product.stock -= quantity;
    await product.save();

    return res.status(200).json({
      status: true,
      message: "Checkout Successfully",
      order: checkOutOrder,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal error",
      error: error.message,
    });
  }
};

// view orders or history
export const getOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const order = await Order.findOne({ user: userId });

    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    return res.status(200).json({ status: true, order });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal error",
      error: error.message,
    });
  }
};
