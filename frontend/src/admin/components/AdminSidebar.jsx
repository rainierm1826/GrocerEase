import React from "react";
import { MdLogout } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa6";
import Logo from "../../components/Logo";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="border-r-[1px] h-screen md:sticky md:top-0">
      <div className="flex justify-between items-center">
        <div className="py-2">
          <Logo />
        </div>

        <button
          type="button"
          className="block text-2xl text-primaryBlue md:hidden"
        >
          <IoIosClose />
        </button>
      </div>

      <div className="mt-10 flex justify-start gap-2 flex-col">
        <button
          className={`flex items-center gap-2 p-2 rounded-md mr-10 ${
            location.pathname === "/admin/dashboard/stats" ? "bg-gray-100" : ""
          } hover:bg-gray-100 transition-colors ease-in duration-150`}
          onClick={() => navigate("/admin/dashboard/stats")}
        >
          <IoStatsChartSharp className="text-primaryBlue" />
          <p className="w-full flex justify-center items-center font-bold">
            Statistics
          </p>
        </button>
        <button
          className={`flex items-center gap-2 p-2 rounded-md mr-10 ${
            location.pathname === "/admin/dashboard/product"
              ? "bg-gray-100"
              : ""
          } hover:bg-gray-100 transition-colors ease-in duration-150`}
          onClick={() => navigate("/admin/dashboard/product")}
        >
          <FaBoxOpen className="text-primaryBlue" />
          <p className="w-full flex justify-center items-center font-bold">
            Products
          </p>
        </button>
        <button
          className={`flex items-center gap-2 p-2 rounded-md mr-10 ${
            location.pathname === "/admin/dashboard/order" ? "bg-gray-100" : ""
          } hover:bg-gray-100 transition-colors ease-in duration-150`}
          onClick={() => navigate("/admin/dashboard/order")}
        >
          <FaList className="text-primaryBlue" />
          <p className="w-full flex justify-center items-center font-bold">
            Orders
          </p>
        </button>
        <button
          className=" flex items-center gap-2 p-2  rounded-md mr-10 hover:bg-gray-100 transition-colors ease-in duration-150"
          onClick={() => navigate("/admin/login")}
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

export default AdminSidebar;
