import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Personal from "../sections/Personal";

const Account = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.user);

  const [firstName, setFirstName] = useState("");

  if (userInfo === null || userInfo === undefined) {
    return navigate("/");
  }

  return (
    <div className="grid grid-cols-4 py-2 px-5 ">
      <div className="col-span-1 sticky left-0">
        <Sidebar />
      </div>
      <div className="col-span-3 px-5">
        <Personal />
      </div>
    </div>
  );
};

export default Account;
