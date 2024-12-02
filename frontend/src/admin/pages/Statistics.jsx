import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";
import {
  salesCount,
  totalSales,
  topProducts,
  getLocationDistribution,
  getStatusDistributionCount,
  getSalesByCategory,
} from "../api/sales";
import { useQuery } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import {
  PieChart,
  Pie,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Line,
  ResponsiveContainer,
  Cell,
} from "recharts";
import BarCharts from "../components/BarCharts";

const COLORS = ["#B6EADA", "#5B8FB9", "#301E67", "#03001C", "#0A97B0"];

const Statistics = () => {
  const { data = { totalProducts: 0, totalUser: 0 }, isLoading } = useQuery(
    ["sales-count"],
    salesCount
  );

  const {
    data: statusDistributionCount = [],
    isLoading: isStatusDistributionCountLoading,
  } = useQuery(["status-distribution-count"], getStatusDistributionCount);

  const {
    data: locationDistributionCount = [],
    isLoading: islocationDistributionCountLoading,
  } = useQuery(["location-distribution-count"], getLocationDistribution);

  const { data: dataSales = [], isLoading: isSalesByDayLoading } = useQuery(
    ["sales-by-day"],
    totalSales
  );

  const { data: topProduct = [], isLoading: isTopProductLoading } = useQuery(
    ["top-product"],
    topProducts
  );

  const { data: topCategories = [], isLoading: isTopCategoryLoading } =
    useQuery(["top-category"], getSalesByCategory);

  const daySales = dataSales.salesByDay;
  const top = topProduct.topProducts;
  const statusesCount = statusDistributionCount.statusesCount || [];
  const locationCount = locationDistributionCount.locationDistribution || [];
  const topCategory = topCategories.salesByCategory || [];

  console.log(topCategory);

  return (
    <div className=" relative">
      <div className="grid grid-cols-4 container">
        <div className="hidden sticky top-0 lg:block lg:col-span-1 pl-5">
          <AdminSidebar />
        </div>
        <div className="col-span-4 flex flex-col justify-start items-start px-5 py-2 lg:col-span-3">
          <Header title="Statistics" />
          {isLoading && (
            <div className="flex justify-center items-center h-screen w-full">
              <PulseLoader color="#0cc0df" size={15} />
            </div>
          )}
          <div className="grid grid-cols-3 gap-5 container lg:grid-cols-6">
            {/* Number of Products */}
            <div className="relative shadow-md h-24 border-2 border-primaryBlue rounded-md flex justify-center items-center">
              <span className="absolute top-1 left-1 text-xs font-bold">
                Number of Products
              </span>
              <p className="text-2xl text-primaryBlue font-bold">
                {data.totalProducts || 0}
              </p>
            </div>

            {/* Number of Users */}
            <div className="relative shadow-md h-24 border-2 border-primaryBlue rounded-md flex justify-center items-center">
              <span className="absolute top-1 left-1 text-xs font-bold">
                Number of Users
              </span>
              <p className="text-2xl text-primaryBlue font-bold">
                {data.totalUser || 0}
              </p>
            </div>

            {/* Status Count */}
            {statusesCount.map((count, index) => (
              <div
                key={index}
                className="relative shadow-md h-24 border-2 border-primaryBlue rounded-md flex justify-center items-center"
              >
                <span className="absolute top-1 left-1 text-xs font-bold">
                  {count._id === "onDelivery"
                    ? "On Delivery"
                    : count._id === "pending"
                    ? "Pending"
                    : count._id === "cancel"
                    ? "Cancel"
                    : "Product Deleted"}
                </span>
                <p className="text-2xl text-primaryBlue font-bold">
                  {count.count || 0}
                </p>
              </div>
            ))}
          </div>

          {isSalesByDayLoading && (
            <div className="flex justify-center items-center h-screen w-full">
              <PulseLoader color="#0cc0df" size={15} />
            </div>
          )}
          <div className="flex justify-center items-center container mt-10 gap-10">
            <div className="w-full">
              <h2 className="text-left text-lg font-bold mb-4 text-primaryBlue">
                Sales Distribution by Location
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={locationCount}
                    dataKey="uniqueUserCount"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    label={(entry) => `${entry._id}`}
                  >
                    {locationCount.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full">
              <h2 className="text-left text-lg font-bold mb-4 text-primaryBlue">
                Most Sold Products by Category
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={topCategory}
                    dataKey="totalSales"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={60} // Adjusted outer radius to make it smaller
                    fill="#8884d8"
                    label={(entry) => `${entry._id}`}
                  >
                    {topCategory.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="container mt-5">
            <h2 className="text-left text-lg font-bold mb-4 text-primaryBlue">
              Sales Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart width={730} height={250} data={daySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalSales" stroke="#0cc0df" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {isTopProductLoading && (
            <div className="flex justify-center items-center h-screen w-full">
              <PulseLoader color="#0cc0df" size={15} />
            </div>
          )}
          <BarCharts
            title="Top Selling Products"
            data={top}
            xDataKey="productName"
            barDatakey="totalQuantity"
          />
          <BarCharts
            title="Most Profitable Products"
            data={top}
            xDataKey="productName"
            barDatakey="totalRevenue"
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
