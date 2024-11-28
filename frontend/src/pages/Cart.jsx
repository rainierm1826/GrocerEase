import React from "react";
import Sidebar from "../components/Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";

const Cart = () => {
  return (
    <div className=" relative">
      <div className="grid grid-cols-4 container">
        <div className="hidden sticky top-0 lg:block lg:col-span-1 pl-5">
          <Sidebar />
        </div>
        <div className="col-span-4 flex flex-col justify-start items-start px-5 py-2 lg:col-span-3">
          <div className="flex justify-between items-center w-full mb-5 shadow-md py-2 px-5">
            <h1 className="font-bold text-2xl text-primaryBlue">Your Cart</h1>
            <button
              type="button"
              className="text-2xl text-primaryBlue md:hidden"
            >
              <RxHamburgerMenu />
            </button>
          </div>
          <p>Cart</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
