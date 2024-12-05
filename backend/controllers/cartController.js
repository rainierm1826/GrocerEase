import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

// add to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, products } = req.body;

    const quantity = products[0]?.quantity;
    const productId = products[0]?.productId;
    const paymentMethod = products[0]?.paymentMethod;

    if (!paymentMethod) {
      return "no payment method";
    }

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
    console.log(error.message);
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

// checkout
export const checkoutCart = async (req, res) => {
  const { userId, products, totalAmount } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    for (const product of products) {
      const productInDb = await Product.findById(product.productId);

      if (!productInDb) {
        return res
          .status(400)
          .json({ message: "Product not found: " + product.productId });
      }

      if (productInDb.stock < product.quantity) {
        return res.status(400).json({
          message: `Not enough stock for product: ${product.productId}`,
        });
      }

      productInDb.stock -= product.quantity;

      const productInCart = cart.products.find(
        (cartProduct) => cartProduct.productId.toString() === product.productId
      );

      if (productInCart) {
        productInCart.quantity -= product.quantity;

        if (productInCart.quantity <= 0) {
          cart.products = cart.products.filter(
            (item) => item.productId.toString() !== product.productId
          );
        }
      } else {
        return res.status(400).json({
          message: `Product ${product.productId} not found in cart`,
        });
      }

      await productInDb.save();
    }

    await cart.save();

    const newOrder = new Order({
      user: userId,
      products: products.map((product) => ({
        productId: new mongoose.Types.ObjectId(product.productId),
        quantity: product.quantity,
        purchaseAtPrice: product.purchaseAtPrice,
        total: product.total,
      })),
      totalAmount,
      paymentMethod: "cod",
    });

    await newOrder.save();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: false,
      message: "Internal error",
      error: error.message,
    });
  }
};

// edit quantity of cart
export const editCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }
    const productInCart = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (!productInCart) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    productInCart.quantity = quantity;

    await cart.save();
    return res.status(200).json({ status: true, cart });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal error",
      error: error.message,
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found for this user",
      });
    }

    const updatedProducts = cart.products.filter(
      (product) => product.productId.toString() !== productId
    );

    if (updatedProducts.length === cart.products.length) {
      return res.status(404).json({
        status: false,
        message: "Product not found in the cart",
      });
    }

    cart.products = updatedProducts;

    await cart.save();

    return res.status(200).json({
      status: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal error",
      error: error.message,
    });
  }
};
