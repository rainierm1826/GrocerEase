import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import ProductList from "../components/ProductList";
import { RxHamburgerMenu } from "react-icons/rx";
import AddProduct from "../components/AddProduct";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const Product = () => {
  const isAddProductOpen = useSelector((state) => state.addProduct.open);

  return (
    <div className=" relative">
      <div
        className={`${
          !isAddProductOpen ? "hidden" : "fixed"
        } inset-0 bg-black bg-opacity-70 flex justify-center items-center z-20`}
      >
        <div className="rounded-lg shadow-lg">
          <AddProduct />
        </div>
      </div>

      <div className="grid grid-cols-4 container">
        <div className="hidden sticky top-0 lg:block lg:col-span-1 pl-5">
          <AdminSidebar />
        </div>
        <div className="col-span-4 flex flex-col justify-start items-start px-5 py-2 lg:col-span-3">
          <Header title="Manage Products" />
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Product;
