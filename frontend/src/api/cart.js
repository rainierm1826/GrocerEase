import axios from "axios";

const cart = axios.create({
  baseURL: "https://final-project-grocerease.onrender.com/cart",
  withCredentials: true,
});

export const addCart = async ({
  userId,
  productId,
  quantity,
  paymentMethod,
}) => {
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
    return error.message;
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

export const checkoutFromCart = async ({ userId, products, totalAmount }) => {
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
    console.log(error.message);
    return error;
  }
};

export const deleteCart = async ({ userId, productId }) => {
  console.log(userId, productId);
  try {
    const { data } = await cart.delete("/deleteCart", {
      data: { userId, productId },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const editCart = async ({ userId, productId, quantity }) => {
  console.log(quantity)
  try {
    const { data } = cart.post("/updateCart", { userId, productId, quantity });
    return data;
  } catch (error) {
    return error;
  }
};
