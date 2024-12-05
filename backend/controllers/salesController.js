import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

// number of products
export const salesCount = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({});
    const totalUser = await User.countDocuments({});

    if (!totalProducts) {
      return res
        .status(200)
        .json({ status: true, totalProducts: 0, totalUser: 0 });
    }
    return res.status(200).json({ status: true, totalProducts, totalUser });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "internal error", error });
  }
};

export const getTotalSales = async (req, res) => {
  try {
    const salesByDay = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    return res.status(200).json({ status: true, salesByDay });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "internal error", error: error.message });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.productId",
          totalQuantity: { $sum: "$products.quantity" },
          totalRevenue: { $sum: "$products.total" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          productName: "$productDetails.productName",
          price: "$productDetails.price",
          image: "$productDetails.image",
          category: "$productDetails.category",
          totalQuantity: 1,
          totalRevenue: 1,
        },
      },
      { $sort: { totalQuantity: -1 } },
    ]);

    return res.status(200).json({ status: true, topProducts });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "internal error", error: error.message });
  }
};

export const statusDistribution = async (req, res) => {
  try {
    const statusesCount = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json({ status: true, statusesCount });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "internal error", error: error.message });
  }
};

export const locationDistribution = async (req, res) => {
  try {
    const locationDistribution = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $group: {
          _id: "$userDetails.location.province",
          uniqueUsers: { $addToSet: "$userDetails._id" },
        },
      },
      {
        $project: {
          _id: 1,
          uniqueUserCount: { $size: "$uniqueUsers" },
        },
      },
      {
        $sort: { uniqueUserCount: -1 },
      },
    ]);

    return res.status(200).json({ status: true, locationDistribution });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "internal error", error: error.message });
  }
};

export const getTopCategories = async (req, res) => {
  try {
    const salesByCategory = await Order.aggregate([
      { $unwind: "$products" }, // Unwind the products array to process each product in an order
      {
        $lookup: {
          from: "products", // Join with the Product collection
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" }, // Unwind the productDetails array to access product data
      {
        $group: {
          _id: "$productDetails.category", // Group by category
          totalSales: { $sum: "$products.total" }, // Sum the sales amount
          totalQuantity: { $sum: "$products.quantity" }, // Optionally, count the quantity sold
        },
      },
      {
        $sort: { totalSales: -1 }, // Sort by total sales in descending order
      },
    ]);
    return res.status(200).json({ status: true, salesByCategory });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "internal error", error });
  }
};
