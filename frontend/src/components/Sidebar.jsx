import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="border-r-[1px] h-screen ">
      <h4 className="text-2xl font-bold">Manage Your Account</h4>
      <div className="flex justify-start gap-2 flex-col">
        <button
          className="mt-5 flex items-center gap-2 p-2 bg-gray-100 rounded-md mr-10"
          onClick={() => navigate("/")}
        >
          <FaHome className="text-primaryBlue" />
          <p className="w-full flex justify-center items-center font-bold">
            Home
          </p>
        </button>
        <button className=" flex items-center gap-2 p-2  rounded-md mr-10 hover:bg-gray-50 transition-colors ease-in duration-150">
          <FaShoppingCart className="text-primaryBlue" />
          <p className="w-full flex justify-center items-center font-bold">
            Cart
          </p>
        </button>

        <button className=" flex items-center gap-2 p-2  rounded-md mr-10 hover:bg-gray-50 transition-colors ease-in duration-150">
          <RxAvatar className="text-primaryBlue" />
          <p className="w-full flex justify-center items-center font-bold">
            Profile
          </p>
        </button>
        <button className=" flex items-center gap-2 p-2 rounded-md mr-10 hover:bg-gray-50 transition-colors ease-in duration-150">
          <FaList className="text-primaryBlue" />
          <p className="w-full flex justify-center items-center font-bold">
            Orders
          </p>
        </button>
        <button className=" flex items-center gap-2 p-2  rounded-md mr-10 hover:bg-gray-50 transition-colors ease-in duration-150">
          <MdLogout className="text-primaryBlue" />
          <p className="w-full flex justify-center items-center font-bold">
            Logout
          </p>
        </button>
        {/* <div className="w-16 h-16 flex justify-center items-center">
      <ProfileImage />
    </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
