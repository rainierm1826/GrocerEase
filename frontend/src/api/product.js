import axios from "axios";

const product = axios.create({
  baseURL: "http://localhost:5000/product",
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

export const filterProducts = async () => {
  try {
    const { data } = await product.get(`/${category}`);
    return data;
  } catch (error) {
    console.error(error);
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
