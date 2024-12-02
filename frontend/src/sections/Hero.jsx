import React, { useEffect } from "react";
import Filter from "../components/Filters";
import HeroCards from "../components/HeroCards";
import HeroProductCards from "../components/HeroProductCards";
import heroImage from "../assets/heroImage.png";
import Login from "../pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { getUserProducts } from "../api/product";

const Hero = () => {
  const userInfo = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

  const { data, isLoading, isError } = useQuery(
    ["userProduct"],
    getUserProducts
  );

  if (isError) {
    return <div className="text-red-500">Error fetching products!</div>;
  }

  const products = data?.products || [];

  if (!products) {
    return (
      <div className="flex justify-center items-center font-bold text-2xl text-primaryBlue">
        No Product Found
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="bg-gradient-radial from-[#23c3cb] to-[#137db8]">
        <div className="container grid grid-cols-1 md:grid-cols-2">
          <div className="">
            <h1 className="text-xl text-white font-bold font-sans mt-10 px-5 w-2/3 md:text-4xl md:w-full">
              Welcome To GrocerEase
              {loading ? (
                <PulseLoader
                  color="#fffffe"
                  size={15}
                  className="ml-10 text-xs"
                />
              ) : (
                `${userInfo ? " " + userInfo.user.firstName : " Guest"}`
              )}
            </h1>
          </div>

          <div className="flex justify-end w-full">
            <img src={heroImage} alt="Hero" className="w-1/2" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#0cc0df" size={15} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 py-3 px-7 -mt-14 gap-5 container lg:grid-cols-3 lg:-mt-14 md:grid-cols-2 md:px-10 md:-mt-4 sm:grid-cols-1 sm:px-16">
            <HeroCards />
            <HeroCards />
            <HeroCards />
          </div>

          <div className="container grid grid-cols-2 gap-5 py-3 px-5 md:grid-cols-4 lg:grid-cols-6">
            {products.map((product) => (
              <HeroProductCards
                key={product._id}
                productName={product.productName}
                image={product.image}
                price={product.price}
                _id={product._id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
