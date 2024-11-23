import React from "react";

const HeroCards = ({}) => {
  return (
    <figure className="rounded-lg py-2 px-5 bg-primaryWhite shadow-lg">
      <p className="text-sm text-primaryGray font-bold">RECOMMENDED FOR YOU</p>
      <div className="flex items-center gap-5">
        <img
          src="https://dummyimage.com/600x400/0cbfdf/ffffff.png&text=placeholder"
          alt="image"
          className="h-14 w-14 rounded-full"
        />
        <div>
          <h4 className="text-lg font-bold">Title</h4>
          <figcaption className="">Lorem ipsum dolor sit amet.</figcaption>
        </div>
        <h4 className="bg-primaryBlue py-2 px-8 rounded-full">Title</h4>
      </div>
    </figure>
  );
};

export default HeroCards;
