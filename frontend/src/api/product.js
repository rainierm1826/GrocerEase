import axios from "axios";

import axios from "axios";

const product = axios.create({
  baseURL: "https://grocerease-backend-oif1.onrender.com/product",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getUserProducts = async () => {
  try {
    console.log(
      "Attempting to fetch products from:",
      product.defaults.baseURL + "/get"
    );
    const response = await product.get("/get");
    return response.data;
  } catch (error) {
    console.error("Detailed Error:", {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      baseURL: error.config?.baseURL,
      fullErrorResponse: error.response || "No response",
    });
    throw error;
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
