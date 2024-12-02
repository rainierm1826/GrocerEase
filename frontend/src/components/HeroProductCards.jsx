import React from "react";
import { useNavigate } from "react-router-dom";

const HeroProductCards = ({ productName, image, _id, price }) => {
  const navigate = useNavigate();

  return (
    <div className=" cursor-pointer max-w-48 mx-auto rounded-lg shadow-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-xl w-full duration-150 ease-in">
      <div
        className="relative overflow-hidden"
        onClick={() => navigate(`/product/${_id}`)}
      >
        <img
          src={image}
          alt={productName}
          className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-40"></div>
      </div>

      <div className="p-4">
        <p className="font-semibold text-lg text-gray-800 hover:text-primaryBlue transition-colors duration-150 ease-in">
          {productName}
        </p>
        <p className="text-sm font-bold text-black mt-2">₱{price}</p>
      </div>
    </div>
  );
};

export default HeroProductCards;
