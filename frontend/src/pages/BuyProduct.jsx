import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProduct } from "../api/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import { checkout } from "../api/order";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setOpen } from "../features/loginSlice";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { addCart } from "../api/cart";

const BuyProduct = () => {
  const { productId } = useParams();
  const userInfo = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["userOneProduct", productId],
    () => getUserProduct(productId),
    { enabled: !!productId }
  );

  const [paymentMethod, setPaymentMethod] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
    console.log("payment: ", paymentMethod);
  };

  const addQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const subQuantity = () => {
    setQuantity((prev) => prev - 1);
  };

  const totalAmount = data?.product ? quantity * data.product.price : 0;

  const checkoutMutation = useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      toast.success("Checkout Successfully");
      queryClient.invalidateQueries("userOneProduct");
    },
    onError: () => {
      toast.error("Checkout Unsuccessfully");
    },
  });

  const handleCheckout = () => {
    if (!userInfo) {
      dispatch(setOpen(true));
      return;
    }

    if (!paymentMethod) {
      toast.error("Choose payment method");
      return;
    }

    if (quantity > data.product.stock) {
      toast.error("Not enough stocks");
      return;
    }

    if (quantity <= 0) {
      toast.error("Quantity should be more than one");
      return;
    }

    if (totalAmount <= 200) {
      toast.error("Minimum order of ₱ 200");
      return;
    }

    checkoutMutation.mutate({
      productId,
      userId: userInfo.user._id,
      paymentMethod,
      quantity,
      totalAmount,
      purchaseAtPrice: data.product.price,
    });
  };

  const addCartMutation = useMutation({
    mutationFn: addCart,
    onSuccess: () => {
      toast.success("Add To Cart Successfully");
    },
    onError: () => {
      toast.error("Can't Add To Cart");
    },
  });

  const handleAddCart = () => {
    if (!userInfo) {
      dispatch(setOpen(true));
      return;
    }

    if (quantity > data.product.stock) {
      toast.error("Not enough stocks");
      return;
    }
    if (!paymentMethod) {
      toast.error("Choose payment method");
      return;
    }

    addCartMutation.mutate({
      userId: userInfo.user._id,
      productId,
      quantity,
      paymentMethod,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PulseLoader color="#0cc0df" size={15} />
      </div>
    );
  }

  return (
    <div className="container py-10 px-5">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex justify-center items-center shadow-md p-5 ">
            <img src={data.product.image} alt="" className="h-56" />
          </div>
          <p className="text-xl font-bold mt-5 text-primaryBlue">
            Product Specifications
          </p>
          <div className="grid grid-cols-2 w-3/4">
            <p className="text-primaryGray font-semibold">Category: </p>
            <p className="font-semibold">{data.product.category}</p>
          </div>
          <div className="grid grid-cols-2 w-3/4">
            <p className="text-primaryGray font-semibold">Stock: </p>
            <p className="font-semibold">{data.product.stock}</p>
          </div>
          <div className="grid grid-cols-2 w-3/4">
            <p className="text-primaryGray font-semibold">Measurement: </p>
            <p className="font-semibold">{data.product.measurement}</p>
          </div>

          <p className="text-xl font-bold mt-5 text-primaryBlue">
            Product Description
          </p>
          <p className="line-clamp-3">{data.product.description}</p>
        </div>
        <div className="col-span-1 md:col-span-3">
          <h3 className="text-2xl font-bold">
            {data.product.productName} {data.product.measurement}
          </h3>
          <p className="border rounded mt-5 p-2 text-primaryBlue text-lg font-bold">{`₱ ${data.product.price}`}</p>
          <select
            className="shadow-md p-2 mt-2 text-primaryBlue text-lg font-bold w-full md:w-1/2"
            name=""
            id=""
            onChange={(e) => handlePaymentMethod(e)}
            value={paymentMethod}
          >
            <option value="" disabled>
              Select Payment Method
            </option>
            <option value="cod">COD</option>
          </select>

          <div className="grid grid-cols-2 w-full mt-5 md:w-1/2">
            <p className="text-primaryGray font-semibold p-2">Quantity: </p>
            <div className="flex">
              <button
                className="border border-primaryBlue text-sm p-3"
                onClick={() => subQuantity()}
              >
                <FaMinus />
              </button>
              <input
                type="text"
                className="focus:outline-none border-y w-full border-primaryBlue text-center text-primaryBlue"
                value={quantity}
                readOnly
              />

              <button
                className="border border-primaryBlue text-sm p-3"
                onClick={() => addQuantity()}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 w-full mt-5 md:w-1/2">
            <p className="text-primaryGray font-semibold p-2">Total Amount: </p>
            <p className="border border-primaryBlue p-2 text-center text-primaryBlue">
              ₱ {totalAmount}
            </p>
          </div>
          <div className="mt-10 w-full flex justify-center gap-5">
            <button
              className="bg-primaryWhite border border-primaryBlue px-10 py-2 rounded font-bold"
              onClick={() => handleAddCart()}
            >
              Add To Cart
            </button>
            <button
              onClick={() => handleCheckout(data.product._id)}
              className="bg-primaryBlue text-primaryWhite px-10 py-2 rounded font-bold"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
