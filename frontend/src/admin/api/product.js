import axios from "axios";

const product = axios.create({
  baseURL: "http://localhost:5000/product",
  withCredentials: true,
});

export const addProduct = async ({
  b64Image,
  productName,
  category,
  price,
  stock,
  measurement,
}) => {
  try {
    const { data } = await product.post("/add", {
      image: b64Image,
      productName,
      category,
      price,
      stock,
      measurement,
    });

    console.log("Response data:", data);
    return { data };
  } catch (error) {
    console.error("Error in addProduct:", error.message);
    throw error; // Ensure errors propagate to the caller
  }
};

export const getProduct = async () => {
  try {
    const { data } = await product.get("/get");
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (_id) => {
  try {
    const { data } = await product.delete("/delete", {
      data: { _id },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (
  _id,
  { productName, category, price, stock, measurement }
) => {
  try {
    const { data } = await product.put("/update", {
      _id,
      updatedProduct: { productName, category, price, stock, measurement },
    });
    return data;
  } catch (error) {
    console.error(error);
    return error.response?.data || { status: false, message: "Request failed" };
  }
};
