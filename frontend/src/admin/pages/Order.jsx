import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrders, updateOrderStatus } from "../api/order";
import { TiCancel } from "react-icons/ti";
import { AiFillEdit } from "react-icons/ai";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

const Order = () => {
  const { data, isLoading } = useQuery(["orders"], getOrders);
  const [orderStatuses, setOrderStatuses] = useState(new Map());

  if (data && data.orders) {
    console.log(data.orders);
  } else {
    console.log("No orders found.");
  }

  const orders = data?.orders || [];

  const handleStatus = (orderId, e) => {
    const newStatus = e.target.value;

    // Create a map to track status changes for each order
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
    },
  });

  const handleUpdateStatus = (orderId) => {
    const status = orderStatuses.get(orderId);
    console.log(orderId, status);
    updateOrderStatusMutation.mutate({ orderId, status });
  };

  return (
    <div className=" relative">
      <div className="grid grid-cols-4 container">
        <div className="hidden sticky top-0 lg:block lg:col-span-1 pl-5">
          <AdminSidebar />
        </div>
        <div className="col-span-4 flex flex-col justify-start items-start px-5 py-2 lg:col-span-3">
          <Header title="Manage Orders" />

          {isLoading && (
            <div className="flex justify-center items-center h-screen w-full">
              <PulseLoader color="#0cc0df" size={15} />
            </div>
          )}

          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-primaryBlue text-primaryWhite">
                <th className="text-center py-2">Image</th>
                <th className="text-center py-2">Buyer</th>
                <th className="text-center py-2">Products</th>
                <th className="text-center py-2">Location</th>
                <th className="text-center py-2">Quantity</th>
                <th className="text-center py-2">Total</th>
                <th className="text-center py-2">Status</th>
                <th className="text-center py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-100 border border-primaryBlue"
                >
                  {/* Image Column */}
                  <td className="flex justify-center p-2">
                    {order.products.map((product) => (
                      <img
                        src={product.productId.image}
                        alt={product.productId.productName}
                        className="h-12 w-12 shadow-md object-cover rounded"
                      />
                    ))}
                  </td>

                  <td className="text-xs text-center">
                    {order.user.firstName} {order.user.lastName}
                  </td>

                  {/* Product Name Column */}
                  <td className="text-xs text-center">
                    {order.products.map((product) => (
                      <div key={product._id}>
                        {product.productId.productName}
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

                  {/* Quantity Column */}
                  <td className="text-xs text-center">
                    {order.products.map((product) => (
                      <div key={product._id}>{product.quantity}</div>
                    ))}
                  </td>

                  {/* Total Column */}
                  <td className="text-xs text-center">
                    {order.products.map((product) => (
                      <div key={product._id}>₱ {product.total}</div>
                    ))}
                  </td>
                  <td className="text-center w-auto">
                    <select
                      onChange={(e) => handleStatus(order._id, e)}
                      value={order.status} // Get status for this specific order
                      className={`rounded-md shadow-md p-2 text-xs w-full max-w-[120px]`}
                      name="status"
                    >
                      <option value="" disabled>
                        Update Status
                      </option>
                      <option value="pending">Pending</option>
                      <option value="onDelivery">On Delivery</option>
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
