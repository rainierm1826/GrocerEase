import axios from "axios";

const order = axios.create({
  baseURL: "http://localhost:5000/order",
  withCredentials: true,
});

// checkout
export const checkout = async ({
  productId,
  userId,
  totalAmount,
  paymentMethod,
  quantity,
  purchaseAtPrice,
}) => {
  const total = parseInt(quantity) * parseInt(purchaseAtPrice);

  try {
    const { data } = await order.post("/checkout", {
      userId,
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

    return data;
  } catch (error) {
    return error;
  }
};

// view orders
export const viewOrder = async (userId) => {
  try {
    const { data } = await order.post("/vieworder", userId);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
