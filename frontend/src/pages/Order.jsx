import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { viewOrder } from "../api/order";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LuDot } from "react-icons/lu";
import { PulseLoader } from "react-spinners";
import { openSidebar } from "../features/sidebarSlice";

const Order = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.user);
  const isSidebarOpen = useSelector((state) => state.sidebar.open);

  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  // Redirect to home if userInfo is missing
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleOpenSidebar = () => {
    dispatch(openSidebar(true));
  };

  const viewOrderMutation = useMutation({
    mutationFn: viewOrder,
    onSuccess: (data) => {
      setOrders(data.order || []); // Update orders state with fetched data
    },
    onError: () => {
      toast.error("Failed to view order");
    },
  });

  // Fetch orders when user info is available
  useEffect(() => {
    if (userInfo?.user?._id) {
      viewOrderMutation.mutate({ userId: userInfo.user._id });
    }
  }, [userInfo]);

  if (viewOrderMutation.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PulseLoader color="#0cc0df" size={15} />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-4 container">
        <div
          className={`${
            isSidebarOpen
              ? "fixed inset-0 z-50 lg:static lg:block w-2/3"
              : "hidden lg:block"
          }  lg:col-span-1 pl-5 w-full h-full bg-primaryWhite`}
        >
          <Sidebar />
        </div>
        <div className="col-span-4 flex flex-col justify-start items-start px-5 py-2 lg:col-span-3">
          <div className="flex justify-between items-center w-full mb-5 shadow-md py-2 px-5">
            <h1 className="font-bold text-2xl text-primaryBlue">Your Orders</h1>
            <button
              type="button"
              className="text-2xl text-primaryBlue lg:hidden"
              onClick={() => handleOpenSidebar()}
            >
              <RxHamburgerMenu />
            </button>
          </div>

          {/* Orders Table */}
          {orders.length === 0 ? (
            <p className="text-center text-lg">No orders found</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-primaryBlue text-primaryWhite">
                  <th className="text-center py-2">Image</th>
                  <th className="text-center py-2">Name</th>
                  <th className="text-center py-2">Price</th>
                  <th className="text-center py-2">Quantity</th>
                  <th className="text-center py-2">Total</th>
                  <th className="text-center py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-[1px] border-primaryBlue hover:bg-gray-100"
                  >
                    {order.products.map((product) => (
                      <React.Fragment key={product.productId?._id}>
                        {product.productId === null ? (
                          <>
                            <td className="flex justify-center p-2">
                              <img
                                src=""
                                alt="not available"
                                className="h-12 w-12 shadow-md object-cover rounded"
                              />
                            </td>
                            <td className="text-xs text-center text-red-500">
                              Product not available
                            </td>
                            <td className="text-xs text-center text-red-500">
                              ₱ N/A
                            </td>
                            <td className="text-xs text-center text-red-500">
                              N/A
                            </td>
                            <td className="text-xs text-center text-red-500">
                              N/A
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="flex justify-center p-2">
                              <img
                                src={product.productId.image}
                                alt={product.productId.productName}
                                className="h-12 w-12 shadow-md object-cover rounded"
                              />
                            </td>
                            <td className="text-xs text-center">
                              {product.productId.productName}
                            </td>
                            <td className="text-xs text-center">
                              ₱ {product.productId.price}
                            </td>
                            {console.log(order)}
                            <td className="text-xs text-center">
                              {product.quantity}
                            </td>
                            <td className="text-xs text-center">
                              {product.total}
                            </td>
                            <td className="text-xs text-center">
                              <span className="flex justify-center items-center gap-2">
                                <LuDot
                                  className={`${
                                    order.status === "pending"
                                      ? "text-gray-500"
                                      : order.status === "cancel"
                                      ? "text-red-500"
                                      : order.status === "on delivery"
                                      ? "text-green-500"
                                      : "text-green-500"
                                  } text-4xl`}
                                />
                                {order.status === "pending" && "Pending"}
                                {order.status === "onDelivery" && "On Delivery"}
                                {order.status === "cancel" && "Cancelled"}
                              </span>
                            </td>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
