import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";

const Statistics = () => {
  return (
    <div className=" relative">
      <div className="grid grid-cols-4 container">
        <div className="hidden sticky top-0 lg:block lg:col-span-1 pl-5">
          <AdminSidebar />
        </div>
        <div className="col-span-4 flex flex-col justify-start items-start px-5 py-2 lg:col-span-3">
          <Header title="Statistics" />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
