import Cart from "../models/cartModel.js";

// add to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      userCart = new Cart({
        user: userId,
        products: [{ productId, quantity }],
      });
    }

    if (userCart) {
      const productIndex = userCart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
        userCart.products[productIndex].quantity += quantity;
      } else {
        userCart.products.push({ productId, quantity });
      }

      await userCart.save();

      return res
        .status(200)
        .json({ status: true, message: "Cart updated successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "internal error",
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
