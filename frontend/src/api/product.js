import axios from "axios";

const product = axios.create({
  baseURL: "https://grocerease-backend-oif1.onrender.com/product",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getTopProducts = async () => {
  try {
    console.log("Attempting to fetch top products");
    const response = await sales.get("/top-products");
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

export const filterProducts = async (category) => {
  try {
    const response = await product.get(`/${category}`);
    console.log("filterProducts Response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "filterProducts Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getUserProduct = async (productId) => {
  try {
    const response = await product.get(`/${productId}`);
    console.log("getUserProduct Response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "getUserProduct Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
