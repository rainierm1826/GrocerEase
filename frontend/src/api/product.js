import axios from "axios";

const product = axios.create({
  baseURL: "https://grocerease-backend-oif1.onrender.com/product",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getTopProduct = async () => {
  try {
    console.log("Attempting to fetch top products");
    const response = await axios.get(
      "https://grocerease-backend-oif1.onrender.com/product/top-products"
    );
    console.log("Response received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Detailed Error:", {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response ? error.response.data : "No response data",
    });
    throw error;
  }
};

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
