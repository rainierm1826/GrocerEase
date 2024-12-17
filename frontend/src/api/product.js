import axios from "axios";

const product = axios.create({
  baseURL: "https://grocerease-backend-7b5o.onrender.com/product",
  withCredentials: true,
});

export const getUserProducts = async () => {
  try {
    const { data } = await product.get("/get/shit");
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
