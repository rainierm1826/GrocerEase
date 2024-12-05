import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders, updateOrderStatus } from "../api/order";
import { TiCancel } from "react-icons/ti";
import { AiFillEdit } from "react-icons/ai";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Order = () => {
  const { data, isLoading } = useQuery(["orders"], getOrders);
  const [orderStatuses, setOrderStatuses] = useState(new Map());
  const queryClient = useQueryClient();

  if (data && data.orders) {
    console.log(data.orders);
  } else {
    console.log("No orders found.");
  }

  const orders = data?.orders || [];

  const handleStatus = (orderId, e) => {
    const newStatus = e.target.value;

    const updatedOrderStatuses = new Map(orderStatuses);
    updatedOrderStatuses.set(orderId, newStatus);

    console.log(newStatus);

    setOrderStatuses(updatedOrderStatuses);
  };

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }) => {
      return await updateOrderStatus(orderId, status);
    },
    onSuccess: () => {
      toast.success("Status Updated Successfully");
      queryClient.invalidateQueries("orders");
    },
  });

  const handleUpdateStatus = (orderId) => {
    const status = orderStatuses.get(orderId);
    console.log(orderId, status);
    updateOrderStatusMutation.mutate({ orderId, status });
  };

  const isAdminSidebarOpen = useSelector((state) => state.adminSidebar.open);

  return (
    <div className=" relative">
      <div className="grid grid-cols-4 container">
        <div
          className={`${
            isAdminSidebarOpen
              ? "fixed inset-0 z-50 lg:static lg:block w-2/3"
              : "hidden lg:block"
          }  lg:col-span-1 pl-5 w-full h-full bg-primaryWhite`}
        >
          <AdminSidebar />
        </div>
        <div className="col-span-4 flex flex-col justify-start items-start px-5 py-2 lg:col-span-3">
          <Header title="Manage Orders" />

          {isLoading && (
            <div className="flex justify-center items-center h-screen w-full">
              <PulseLoader color="#0cc0df" size={15} />
            </div>
          )}

          <table className="w-full table-auto overflow-x-auto">
            <thead>
              <tr className="bg-primaryBlue text-primaryWhite">
                <th className="text-center p-2">Image</th>
                <th className="text-center p-2">Buyer</th>
                <th className="text-center p-2">Products</th>
                <th className="text-center p-2">Quantity</th>
                <th className="text-center p-2">Total</th>
                <th className="text-center p-2">Location</th>
                <th className="text-center p-2">Status</th>
                <th className="text-center p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-100 border border-primaryBlue"
                >
                  {/* Image Column */}
                  <td className="flex justify-center flex-col p-2 ">
                    {order.products.map((product) => (
                      <img
                        key={product._id}
                        src={
                          product.productId?.image ||
                          "placeholder-image-url.jpg"
                        } // Placeholder image
                        alt={
                          product.productId?.productName ||
                          "Product not available"
                        }
                        className="h-12 w-12 shadow-md object-cover rounded"
                      />
                    ))}
                  </td>

                  {/* User Name Column */}
                  <td className="text-xs text-center">
                    {order.user.firstName} {order.user.lastName}
                  </td>

                  {/* Product Name Column */}
                  <td className="text-xs text-center">
                    {order.products.map((product) => (
                      <div key={product._id}>
                        {product.productId ? (
                          product.productId.productName
                        ) : (
                          <span className="text-xs text-red-500">
                            Product not available
                          </span>
                        )}
                      </div>
                    ))}
                  </td>

                  {/* Quantity Column */}
                  <td className="text-xs text-center">
                    {order.products.map((product) => (
                      <div key={product._id}>
                        {product.productId ? (
                          product.quantity
                        ) : (
                          <span className="text-xs text-red-500">N/A</span>
                        )}
                      </div>
                    ))}
                  </td>

                  {/* Total Column */}
                  <td className="text-xs text-center">
                    {order.products.map((product) => (
                      <div key={product._id}>
                        {product.productId ? `₱ ${product.total}` : "₱ 0.00"}
                      </div>
                    ))}
                  </td>

                  {/* Location Column */}
                  <td className="text-xs text-center">
                    {order.user.location.city &&
                      `${order.user.location.city}, `}
                    {order.user.location.province &&
                      `${order.user.location.province}`}
                    <br />
                    {order.user.location.barangay &&
                      `${order.user.location.barangay}`}
                    <br />
                    {order.user.location.street &&
                      `${order.user.location.street}`}
                    {order.user.location.blk &&
                      `Blk ${order.user.location.blk}`}
                    {order.user.location.lot &&
                      ` Lot ${order.user.location.lot}`}
                  </td>

                  {/* Status Update Column */}
                  <td className="text-center w-auto whitespace-nowrap">
                    <select
                      onChange={(e) => handleStatus(order._id, e)}
                      value={orderStatuses.get(order._id) || order.status}
                      className={`rounded-md shadow-md p-2 text-xs font-bold w-full max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis ${
                        order.status === "pending"
                          ? "bg-gray-200 text-gray-700"
                          : order.status === "received"
                          ? "bg-green-200 text-green-700"
                          : order.status === "cancel"
                          ? "bg-red-200 text-red-700"
                          : order.status === "onDelivery"
                          ? "bg-yellow-200 text-yellow-700"
                          : ""
                      }`}
                    >
                      {/* Options */}
                      <option value="" disabled>
                        Update Status
                      </option>
                      <option value="pending">Pending</option>
                      <option value="onDelivery">On Delivery</option>
                      <option value="received">Received</option>
                      <option value="cancel">Cancel</option>
                    </select>
                  </td>

                  {/* Actions Column */}
                  <td className="text-xs text-center">
                    <button
                      type="button"
                      className="bg-primaryBlue text-primaryWhite rounded-md px-3 py-1 shadow-md hover:opacity-80 disabled:opacity-50"
                      onClick={() => handleUpdateStatus(order._id)}
                    >
                      <AiFillEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
