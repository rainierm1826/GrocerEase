import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = ({ title }) => {
  return (
    <div className="flex justify-between items-center w-full mb-5 shadow-md py-2 px-5">
      <h1 className="font-bold text-2xl text-primaryBlue">{title}</h1>
      <button
        type="button"
        className="text-2xl text-primaryBlue block lg:hidden"
      >
        <RxHamburgerMenu />
      </button>
    </div>
  );
};

export default Header;
