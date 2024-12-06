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

// Add an interceptor to log request details
product.interceptors.request.use(
  (config) => {
    console.log('Request Config:', {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

export const getUserProducts = async () => {
  try {
    const response = await product.get("/get");
    console.log('getUserProducts Response:', response);
    return response.data;
  } catch (error) {
    console.error('getUserProducts Error:', error.response ? error.response.data : error.message);
    throw error; // Re-throw to allow caller to handle
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
