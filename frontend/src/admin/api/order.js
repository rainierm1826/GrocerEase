import axios from "axios";
import Order from "../../../../backend/models/orderModel";

const adminOrder = axios.create({
  baseURL: "http://localhost:5000/order",
  withCredentials: true,
});

export const getOrders = async () => {
  try {
    const { data } = await adminOrder.get("/getOrder");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const { data } = await adminOrder.post("/updatestatus", {
      orderId,
      status,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
