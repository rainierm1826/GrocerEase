import axios from "axios";

export const baseURL = "https://grocerease-backend-oif1.onrender.com/product";

const product = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const getUserProducts = async () => {
  try {
    const { data } = await product.get("/get");
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
