import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// add to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, products } = req.body;
    console.log(products);

    const quantity = products[0]?.quantity;
    const productId = products[0]?.productId;
    const paymentMethod = products[0]?.paymentMethod;

    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      userCart = new Cart({
        user: userId,
        products,
      });
    } else {
      const productIndex = userCart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
        // Update quantity of an existing product
        userCart.products[productIndex].quantity += quantity;
      } else {
        // Add a new product
        userCart.products.push({ productId, quantity, paymentMethod });
      }
    }

    await userCart.save();

    return res
      .status(200)
      .json({ status: true, message: "Cart updated successfully" });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal error",
      error: error.message,
    });
  }
};

// view prducts in cart
export const viewCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userCart = await Cart.findOne({ user: userId }).populate(
      "products.productId"
    );

    if (!userCart)
      return res.status(404).json({
        status: false,
        message: "no user found",
      });

    const cart = userCart.products;

    return res.status(200).json({ status: true, cart });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "internal error",
      error: error.message,
    });
  }
};

export const checkoutCart = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;
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
    return res.status(500).json({
      status: false,
      message: "internal error",
      error: error.message,
    });
  }
};
