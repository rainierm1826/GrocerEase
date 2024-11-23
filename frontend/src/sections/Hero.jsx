import React from "react";
import Filter from "../components/Filters";
import HeroCards from "../components/HeroCards";
import HeroProductCards from "../components/HeroProductCards";
import heroImage from "../assets/heroImage.png";
import Login from "../pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { RotateLoader } from "react-spinners";

const Hero = () => {
  const userInfo = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

  return (
    <div className="relative">
      {/* <Filter /> */}

      <div className="bg-gradient-radial from-[#23c3cb] to-[#137db8]">
        <div className="container grid grid-cols-1 md:grid-cols-2">
          <div className="">
            <h1 className="text-xl text-white font-bold font-sans mt-10 px-5 w-2/3 md:text-4xl md:w-full">
              Welcome To GrocerEase
              {loading ? (
                <RotateLoader
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
            <img src={heroImage} alt="" className="w-1/2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 py-3 px-7 -mt-14 gap-5 container md:grid-cols-3 md:px-16">
        <HeroCards />
        <HeroCards />
        <HeroCards />
      </div>
      <div className="container grid grid-cols-2 gap-5 py-3 px-5 md:grid-cols-5">
        <HeroProductCards />
        <HeroProductCards />
        <HeroProductCards />
        <HeroProductCards />
        <HeroProductCards />
      </div>
      <Login />
    </div>
  );
};

export default Hero;
