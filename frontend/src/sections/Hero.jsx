import React from "react";
import Filter from "../components/Filters";
import HeroCards from "../components/HeroCards";
import HeroProductCards from "../components/HeroProductCards";
import heroImage from "../assets/heroImage.png";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { getUserProducts } from "../api/product";
import { topProducts } from "../admin/api/sales";

const Hero = () => {
  const userInfo = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const query = useSelector((state) => state.search.query.toLowerCase());

  const { data, isLoading, isError } = useQuery(
    ["userProduct"],
    getUserProducts
  );
  const { data: topProduct = [], isLoading: isTopProductLoading } = useQuery(
    ["top-product"],
    topProducts
  );

  const top = topProduct.topProducts || [];
  const products = data?.products || [];

  const filteredProducts = products?.filter((product) =>
    product.productName.toLowerCase().includes(query)
  );

  if (isError) {
    return <div className="text-red-500">Error fetching products!</div>;
  }

  return (
    <div className="relative">
      <div className="bg-gradient-radial from-[#23c3cb] to-[#137db8]">
        <div className="container grid grid-cols-1 md:grid-cols-2">
          <div>
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

      {isLoading || isTopProductLoading ? (
        <div className="flex justify-center items-center h-screen">
          <PulseLoader color="#0cc0df" size={15} />
        </div>
      ) : (
        <>
          {/* Top Products */}
          <div className="grid grid-cols-1 py-3 px-7 -mt-14 gap-5 container lg:grid-cols-3 lg:-mt-14 md:grid-cols-2 md:px-10 md:-mt-4 sm:grid-cols-1 sm:px-16">
            {top.length > 0 ? (
              top
                .slice(0, 3)
                .map((items) => (
                  <HeroCards
                    key={items.productId}
                    productName={items.productName}
                    category={items.category}
                    image={items.image}
                    price={items.price}
                    _id={items.productId}
                  />
                ))
            ) : (
              <div>No Top Products Available</div>
            )}
          </div>

          {/* Filtered Products */}
          <div className="container grid grid-cols-2 gap-5 py-3 px-5 md:grid-cols-4 lg:grid-cols-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <HeroProductCards
                  key={product._id}
                  productName={product.productName}
                  image={product.image}
                  price={product.price}
                  _id={product._id}
                />
              ))
            ) : (
              <div>No Products Found</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
