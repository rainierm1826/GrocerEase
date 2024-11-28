import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProduct } from "../api/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";
import { checkout } from "../api/order";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setOpen } from "../features/loginSlice";

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

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
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

    if (totalAmount < 70) {
      toast.error("Minimum order of ₱ 70");
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PulseLoader color="#0cc0df" size={15} />
      </div>
    );
  }

  return (
    <div className="container py-2 px-5">
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-2 flex justify-center items-center p-5 shadow-md">
          <img src={data.product.image} alt="" className="h-96" />
        </div>
        <div className="col-span-3">
          <h3>{data.product.productName}</h3>
          <p>{`₱ ${data.product.price}`}</p>
          <p>{data.product.category}</p>
          <p>{data.product.description}</p>
          <p>{data.product.stock}</p>
          <select
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
          <div className="flex flex-col">
            <label className="font-bold mb-2">Quantity</label>
            <input
              type="number"
              className="rounded-md  text-xs shadow-md p-2 border border-gray-300"
              placeholder="e.g. 100"
              name="quantity"
              onChange={(e) => handleQuantity(e)}
              max={data.product.stock}
              min={1}
              value={quantity}
            />
          </div>
          <p>Total Amount: {totalAmount}</p>
          <button onClick={() => handleCheckout(data.product._id)}>
            Buy Now
          </button>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
