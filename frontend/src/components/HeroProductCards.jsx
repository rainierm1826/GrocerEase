import React from "react";
import { useNavigate } from "react-router-dom";

const HeroProductCards = ({ productName, image, _id, price }) => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div
        className="shadow-lg rounded-lg relative overflow-hidden cursor-pointer"
        onClick={() => navigate(`/product/${_id}`)}
      >
        <img src={image} alt="" className="w-full h-48" />
        <p className="absolute bottom-0 bg-primaryBlue text-primaryWhite w-full text-center font-bold py-1">
          {productName}
        </p>
      </div>
      <p className="text-center">{`₱ ${price}`}</p>
    </div>
  );
};

export default HeroProductCards;
