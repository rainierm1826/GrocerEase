import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../features/sidebarSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOutFromCart, viewCart } from "../api/cart";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const userInfo = useSelector((state) => state.user.user);
  const isSidebarOpen = useSelector((state) => state.sidebar.open);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleOpenSidebar = () => {
    dispatch(openSidebar(true));
  };

  const viewCartMutation = useMutation({
    mutationFn: viewCart,
    onSuccess: (data) => {
      setCart(data.cart || []);
    },
    onError: () => {
      toast.error("Failed to view order");
    },
  });

  useEffect(() => {
    if (userInfo?.user?._id) {
      viewCartMutation.mutate({ userId: userInfo.user._id });
    }
  }, [userInfo]);

  useEffect(() => {
    const totalAmount = selectedItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    setTotal(totalAmount);
  }, [selectedItems]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allItemDetails = cart.map((item) => ({
        id: item._id,
        quantity: item.quantity,
        price: item.productId?.price || 0,
        paymentMethod: item.paymentMethod || "COD",
      }));
      setSelectedItems(allItemDetails);
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.find((selected) => selected.id === item._id);

      if (exists) {
        return prev.filter((selected) => selected.id !== item._id);
      } else {
        return [
          ...prev,
          {
            id: item._id,
            quantity: item.quantity,
            price: item.productId?.price || 0,
            paymentMethod: item.paymentMethod || "COD",
          },
        ];
      }
    });
  };

  const isAllSelected = selectedItems.length === cart.length;

  const checkoutMutation = useMutation({
    mutationFn: checkOutFromCart,
    onSuccess: () => {
      toast.success("Checkout Successfully");
    },
    onError: () => {
      toast.error("Checkout Unsuccessfully");
    },
  });

  const handleCheckout = () => {
    if (total < 70) {
      toast.error("Minimum order of ₱ 70");
      return;
    }

    const products = selectedItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      purchaseAtPrice: item.price,
      total: item.quantity * item.price,
    }));

    checkoutMutation.mutate({
      userId: userInfo.user._id,
      totalAmount: total,
      products: products,
    });
  };

  if (viewCartMutation.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PulseLoader color="#0cc0df" size={15} />
      </div>
    );
  }
  return (
    <div className=" relative">
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
            <h1 className="font-bold text-2xl text-primaryBlue">Your Cart</h1>
            <button
              type="button"
              className="text-2xl text-primaryBlue md:hidden"
              onClick={() => handleOpenSidebar()}
            >
              <RxHamburgerMenu />
            </button>
          </div>
          {cart.length === 0 ? (
            <p className="text-center text-lg">No orders found</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-primaryBlue text-primaryWhite">
                  <th className="text-center py-2 flex items-center justify-center gap-2">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="h-4 w-4"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                    <span>Select All</span>
                  </th>
                  <th className="text-center py-2">Image</th>
                  <th className="text-center py-2">Name</th>
                  <th className="text-center py-2">Payment Method</th>
                  <th className="text-center py-2">Quantity</th>
                  <th className="text-center py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    {item.productId === null ? (
                      <td
                        className="text-xs text-center text-red-500"
                        colSpan={6}
                      >
                        Product not available
                      </td>
                    ) : (
                      <>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            value={item._id}
                            checked={selectedItems.some(
                              (selected) => selected.id === item._id
                            )}
                            onChange={() => handleCheckboxChange(item)}
                          />
                        </td>
                        <td className="flex justify-center p-2">
                          <img
                            src={item.productId.image}
                            alt={item.productId.productName}
                            className="h-12 w-12 shadow-md object-cover rounded"
                          />
                        </td>
                        <td className="text-xs text-center">
                          {item.productId.productName}
                        </td>
                        <td className="text-xs text-center">
                          {item.paymentMethod}
                        </td>
                        <td className="text-xs text-center">{item.quantity}</td>
                        <td className="text-xs text-center">
                          ₱ {item.productId.price}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="font-bold text-primaryBlue text-center">
                    Total:
                  </td>
                  <td colSpan={4}></td>
                  <td className="text-xs text-center font-bold">
                    ₱ {total.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} className="text-end">
                    <button
                      type="button"
                      className="text-md font-bold py-2 px-5 bg-primaryBlue text-primaryWhite rounded"
                      onClick={() => handleCheckout()}
                    >
                      Check Out
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
