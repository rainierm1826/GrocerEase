import axios from "axios";

const cart = axios.create({
  baseURL: "http://localhost:5000/cart",
  withCredentials: true,
});

export const addCart = async ({
  userId,
  productId,
  quantity,
  paymentMethod,
}) => {
  console.log(productId);
  try {
    const { data } = await cart.post("/add", {
      userId,
      products: [
        {
          productId,
          quantity,
          paymentMethod,
        },
      ],
    });
    return data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return (
      error.response?.data || { status: false, message: "An error occurred" }
    );
  }
};

export const viewCart = async ({ userId }) => {
  try {
    const { data } = await cart.post("/get", { userId });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const checkOutFromCart = async ({ userId, products, totalAmount }) => {
  try {
    const productsToSend = products.map((product) => {
      const { productId, quantity, purchaseAtPrice, paymentMethod } = product;

      return {
        productId,
        quantity,
        purchaseAtPrice,
        total: quantity * purchaseAtPrice,
        paymentMethod,
      };
    });

    const { data } = await cart.post("/checkoutCart", {
      userId,
      products: productsToSend,
      totalAmount,
    });

    return data;
  } catch (error) {
    console.error("Checkout Error:", error.response?.data || error.message);
    return error;
  }
};
