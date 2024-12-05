import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { viewOrder } from "../api/order";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LuDot } from "react-icons/lu";
import { PulseLoader } from "react-spinners";
import { openSidebar } from "../features/sidebarSlice";
import Personal from "../sections/Personal";

const Profile = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.user);
  const isSidebarOpen = useSelector((state) => state.sidebar.open);
  const dispatch = useDispatch();

  const handleOpenSidebar = () => {
    dispatch(openSidebar(true));
  };

  if (userInfo === null || userInfo === undefined) {
    return navigate("/");
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-4 container">
        <div
          className={`${
            isSidebarOpen
              ? "fixed inset-0 z-50 lg:static lg:block w-2/3"
              : "hidden lg:block"
          }  lg:col-span-1 pl-5 w-full h-full bg-primaryWhite`}
        >
          <Sidebar />
        </div>
        <div className="col-span-4 flex flex-col justify-start items-start px-5 py-2 lg:col-span-3">
          <div className="flex justify-between items-center w-full mb-5 shadow-md py-2 px-5">
            <h1 className="font-bold text-2xl text-primaryBlue">
              Personal Information
            </h1>
            <button
              type="button"
              className="text-2xl text-primaryBlue lg:hidden"
              onClick={() => handleOpenSidebar()}
            >
              <RxHamburgerMenu />
            </button>
          </div>
          <Personal />
        </div>
      </div>
    </div>
  );
};

export default Profile;
