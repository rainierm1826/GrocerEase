import axios from "axios";

const backendURL = "https://grocerease-backend-oif1.onrender.com";
const product = axios.create({
  baseURL: `${backendURL}/product`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const getUserProducts = async () => {
  try {
    const response = await product.get("/get");
    return response.data;
  } catch (error) {
    console.error('getUserProducts Error:', {
      message: error.message,
      response: error.response ? error.response.data : 'No response',
      config: error.config
    });
    throw error;
  }
};

export const filterProducts = async (category) => {
  try {
    const response = await product.get(`/${category}`);
    console.log('filterProducts Response:', response);
    return response.data;
  } catch (error) {
    console.error('filterProducts Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getUserProduct = async (productId) => {
  try {
    const response = await product.get(`/${productId}`);
    console.log('getUserProduct Response:', response);
    return response.data;
  } catch (error) {
    console.error('getUserProduct Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};
