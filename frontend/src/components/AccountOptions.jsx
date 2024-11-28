import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../features/userSlice";
import { IoIosClose } from "react-icons/io";
import { closeAccountOptions } from "../features/accountOptions";
import { FaShoppingCart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import ProfileImage from "./ProfileImage";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { FaList } from "react-icons/fa";

const AccountOptions = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const isAccountOptionsOpen = useSelector((state) => state.accountOption.open);

  const closeAccount = () => {
    dispatch(closeAccountOptions(false));
  };

  const handleLogout = async () => {
    const log = await logout();
    console.log("response: ", log);
    dispatch(setLogout());
  };

  const goToProfile = () => {
    dispatch(closeAccountOptions(false));
    navigate("/account");
  };

  const goToOrder = () => {
    dispatch(closeAccountOptions(false));
    navigate("/user/order");
  };

  return (
    <div
      className={`${
        isAccountOptionsOpen ? "flex" : "hidden"
      } absolute right-0 mt-2 bg-white shadow-lg border border-gray-300 rounded-lg z-20 w-80 justify-center`}
    >
      <div className="py-5 px-10 flex flex-col gap-2 items-center">
        <button
          className="absolute right-1 top-1 text-2xl "
          onClick={closeAccount}
        >
          <IoIosClose />
        </button>
        <p className="text-xs font-medium mb-5 ">{userInfo.user.email}</p>
        <ProfileImage h={12} w={12} />
        <p className="text-2xl font-medium">Hi, {userInfo.user.firstName}!</p>
        <button className="profileOptionsButton mt-5 w-full">
          <FaShoppingCart />
          <p className="w-full flex justify-center items-center font-bold">
            Cart
          </p>
        </button>
        <button className="profileOptionsButton" onClick={() => goToOrder()}>
          <FaList />
          <p className="w-full flex justify-center items-center font-bold">
            Order
          </p>
        </button>
        <button className="profileOptionsButton" onClick={() => goToProfile()}>
          <RxAvatar />
          <p className="w-full flex justify-center items-center font-bold">
            Profile
          </p>
        </button>
        <button className="flex items-center justify-start w-full border-2 border-black bg-primaryBlue text-white rounded-full p-2 hover:bg-primaryWhite hover:border-primaryBlue transition-colors ease-in duration-150 hover:text-black">
          <MdLogout />
          <p
            className="w-full flex justify-center items-center font-bold"
            onClick={() => handleLogout()}
          >
            Logout
          </p>
        </button>
      </div>
    </div>
  );
};

export default AccountOptions;
