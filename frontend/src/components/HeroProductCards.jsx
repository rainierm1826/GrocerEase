import React from "react";

const img =
  "https://afodltd.com/wp-content/uploads/2019/03/CK-10-008-600x450.png";

const HeroProductCards = () => {
  return (
    <div className="">
      <div className="shadow-lg rounded-lg relative overflow-hidden">
        <img src={img} alt="" className="w-full" />
        <p className="absolute bottom-0 bg-primaryBlue text-primaryWhite w-full text-center font-bold py-1">
          Item Name
        </p>
      </div>
      <p className="text-center">₱100</p>
    </div>
  );
};

export default HeroProductCards;
