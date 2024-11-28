import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Personal from "../sections/Personal";

const Account = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.user);
  const isSidebarOpen = useSelector((state) => state.sidebar.open);

  if (userInfo === null || userInfo === undefined) {
    return navigate("/");
  }

  return (
    <div className="grid grid-cols-1 py-2 px-5 md:grid-cols-4 w-full">
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } w-2/3 md:block md:w-full`}
      >
        <Sidebar />
      </div>
      <div className={`col-span-1 md:col-span-3 md:px-5`}>
        <Personal />
      </div>
    </div>
  );
};

export default Account;
