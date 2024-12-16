import axios from "axios";

const isProduction = window.location.hostname !== "localhost";

const product = axios.create({
  baseURL: isProduction
    ? "https://grocerease-backend-oif1.onrender.com"
    : "http://localhost:5000",
  withCredentials: true,
});

export const getUserProducts = async () => {
  try {
    const { data } = await product.get("/get/fuck");
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getUserProduct = async (productId) => {
  try {
    const { data } = await product.get(`/${productId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
