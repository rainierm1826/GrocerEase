import axios from "axios";

const sales = axios.create({
  baseURL: "https://final-project-grocerease.onrender.com/sales",
});

export const salesCount = async () => {
  try {
    const { data } = await sales.get("/sales-count");
    return data;
  } catch (error) {
    return error;
  }
};

export const getStatusDistributionCount = async () => {
  try {
    const { data } = await sales.get("/status-distribution");
    return data;
  } catch (error) {
    return error;
  }
};

export const totalSales = async () => {
  try {
    const { data } = await sales.get("/sales-by-day");
    return data;
  } catch (error) {
    return error;
  }
};

export const topProducts = async () => {
  try {
    const { data } = await sales.get("/top-products");
    return data;
  } catch (error) {
    return error;
  }
};

export const getLocationDistribution = async () => {
  try {
    const { data } = await sales.get("/location-distribution");
    return data;
  } catch (error) {
    return error;
  }
};

export const getSalesByCategory = async () => {
  try {
    const { data } = await sales.get("/sales-by-category");
    return data;
  } catch (error) {
    return error;
  }
};
