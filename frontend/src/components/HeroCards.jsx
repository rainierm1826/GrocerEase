import React from "react";
import { useNavigate } from "react-router-dom";

const HeroCards = ({ productName, category, price, image, _id }) => {
  const navigate = useNavigate();

  return (
    <figure
      className="rounded-lg py-2 px-5 bg-primaryWhite shadow-lg cursor-pointer"
      onClick={() => navigate(`/product/${_id}`)}
    >
      <p className="text-sm text-primaryGray font-bold">TOP SELLING PRODUCTS</p>
      <div className="flex items-center gap-5">
        <img src={image} alt="image" className="h-14 w-14 rounded-full" />
        <div>
          <h4 className="text-lg font-bold line-clamp-1">{productName}</h4>
          <figcaption className="line-clamp-1">{category}</figcaption>
        </div>
        <h4 className="bg-primaryBlue py-2 px-8 rounded-full font-bold text-primaryWhite">
          ₱{price}
        </h4>
      </div>
    </figure>
  );
};

export default HeroCards;
