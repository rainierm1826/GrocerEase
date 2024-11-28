import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { useDispatch } from "react-redux";
import { setLogout } from "../features/userSlice";
import { IoIosClose } from "react-icons/io";
import { closeSidebar } from "../features/sidebarSlice";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setLogout());
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="border-r-[1px] h-screen md:sticky md:top-0">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-2xl">Manage Your Account</h4>
        <button
          type="button"
          className="block text-2xl text-primaryBlue md:hidden"
          onClick={() => dispatch(closeSidebar(false))}
        >
          <IoIosClose />
        </button>
      </div>

      <div className="flex justify-start gap-2 flex-col">
        <button
          className={`mt-5 flex items-center gap-2 p-2 rounded-md mr-10 hover:bg-gray-100 transition-colors ease-in duration-150`}
          onClick={() => navigate("/")}
        >
          <FaHome className="text-primaryBlue" />
          <p className="w-full flex justify-center items-center font-bold">
            Home
          </p>
        </button>
        <button
          className={` flex items-center gap-2 p-2  rounded-md mr-10  ${
            location.pathname === "/user/cart" && "bg-gray-100"
          } hover:bg-gray-100 transition-colors ease-in duration-150`}
          onClick={() => navigate("/user/cart")}
        >
          <FaShoppingCart className="text-primaryBlue" />
          <p className="w-full flex justify-center items-center font-bold">
            Cart
          </p>
        </button>

        <button
          className={` flex items-center gap-2 p-2  rounded-md mr-10  ${
            location.pathname === "/profile" && "bg-gray-100"
          } hover:bg-gray-100 transition-colors ease-in duration-150`}
        >
          <RxAvatar className="text-primaryBlue" />
          <p className="w-full flex justify-center items-center font-bold">
            Profile
          </p>
        </button>
        <button
          className={` flex items-center gap-2 p-2  rounded-md mr-10  ${
            location.pathname === "/user/order" && "bg-gray-100"
          } hover:bg-gray-100 transition-colors ease-in duration-150`}
          onClick={() => navigate("/user/order")}
        >
          <FaList className="text-primaryBlue" />
          <p className="w-full flex justify-center items-center font-bold">
            Orders
          </p>
        </button>
        <button
          className=" flex items-center gap-2 p-2  rounded-md mr-10 hover:bg-gray-100 transition-colors ease-in duration-150"
          onClick={() => handleLogout()}
        >
          <MdLogout className="text-primaryBlue" />
          <p className="w-full flex justify-center items-center font-bold">
            Logout
          </p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
