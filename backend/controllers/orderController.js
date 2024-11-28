import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// checkout
export const checkout = async (req, res) => {
  try {
    const { userId, products, totalAmount, paymentMethod } = req.body;

    const quantity = products[0]?.quantity;
    const purchaseAtPrice = products[0]?.purchaseAtPrice;
    const total = products[0]?.total;
    const productId = products[0]?.productId;

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
          total,
        },
      ],
      totalAmount,

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
    console.log(error.message);
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
    const order = await Order.find({ user: userId })
      .populate("products.productId")
      .sort({ createdAt: -1 })
      .exec();
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

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res
        .status(400)
        .json({ message: "Order ID and status are required." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({
      message: "Order status updated successfully.",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// get full orders by admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.productId")
      .exec();

    return res.status(200).json({ status: true, orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};
