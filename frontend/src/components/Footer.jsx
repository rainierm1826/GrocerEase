import React from "react";
import { IoMdPulse } from "react-icons/io";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="bg-primaryWhite shadow-inner py-5 px-3 mt-10">
      <div className="container">
        <div className="flex flex-col gap-5 justify-between items-center sm:flex-row">
          <div>
            <Logo />
          </div>
          <div className="">
            <p className="mb-2 font-bold text-sm text-primaryBlue">
              Email us at
            </p>
            <p className="text-md font-medium">grocerease02@gmail.com</p>
          </div>
        </div>
        <hr className="my-10" />

        <div className="grid grid-cols-2 place-items-start gap-10 sm:grid-cols-5">
          <div>
            <ul className="flex flex-col gap-5">
              <li className="text-primaryBlue font-semibold text-lg uppercase">
                Home
              </li>
              <li className="text-black font-normal text-sm">Politcs</li>
              <li className="text-black font-normal text-sm">World</li>
              <li className="text-black font-normal text-sm">Health</li>
              <li className="text-black font-normal text-sm">Business</li>
            </ul>
          </div>

          <div>
            <ul className="flex flex-col gap-5">
              <li className="text-primaryBlue font-semibold text-lg uppercase">
                Entertainment
              </li>
              <li className="text-black font-normal text-sm">K-Pop</li>
              <li className="text-black font-normal text-sm">Gaming</li>
              <li className="text-black font-normal text-sm">Arts</li>
              <li className="text-black font-normal text-sm">Travels</li>
            </ul>
          </div>

          <div>
            <ul className="flex flex-col gap-5">
              <li className="text-primaryBlue font-semibold text-lg uppercase">
                Country
              </li>
              <li className="text-black font-normal text-sm">U.S</li>
              <li className="text-black font-normal text-sm">Philippines</li>
              <li className="text-black font-normal text-sm">Korea</li>
              <li className="text-black font-normal text-sm">Rusia</li>
            </ul>
          </div>

          <div>
            <ul className="flex flex-col gap-5">
              <li className="text-primaryBlue font-semibold text-lg uppercase">
                Category
              </li>
              <li className="text-black font-normal text-sm">Business</li>
              <li className="text-black font-normal text-sm">Sports</li>
              <li className="text-black blackfont-normal text-sm">General</li>
              <li className="text-black font-normal text-sm">Health</li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col gap-5">
              <li className="text-primaryBlue font-semibold text-lg uppercase">
                Sources
              </li>
              <li className="text-black font-normal text-sm">ESPN</li>
              <li className="text-black font-normal text-sm">ABC News</li>
              <li className="text-black font-normal text-sm">TechRadar</li>
              <li className="text-black font-normal text-sm">Time</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
