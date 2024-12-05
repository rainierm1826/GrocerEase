import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { loginAdmin } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import LoginImg from "../../assets/LoginImg.png";
import { toast } from "react-toastify";

const LoginAdmin = () => {
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleAdminCredentials = (e) => {
    const { name, value } = e.target;
    setAdminCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const { email, password } = adminCredentials;
    const result = await loginAdmin(email, password);

    console.log(result);

    if (result.status === true) {
      return navigate("/admin/dashboard/stats");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container grid grid-cols-1 py-5 bg-gradient-radial from-[#23c3cb] to-[#137db8] md:grid-cols-2">
        <div className="mx-5 my-2 rounded-2xl p-5 shadow-lg bg-white/10 backdrop-blur-lg hidden md:block">
          <p className="font-Fredoka text-3xl font-bold text-primaryBlue">
            The Rice You Need,
            <span className="text-black"> With Ease</span>.
          </p>
          <div className="flex justify-center items-center h-full">
            <img src={LoginImg} alt="" className="h-2/3" />
          </div>
        </div>
        <div className="mx-5 my-2  flex justify-center items-center ">
          <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-lg py-10 px-24 flex justify-center items-center flex-col gap-5">
            <h1 className="text-2xl font-bold text-primaryWhite">
              Welcome Admin
            </h1>
            <div className="flex flex-col">
              <label className="font-bold mb-2 text-primaryWhite">Email</label>
              <input
                type="text"
                className="bg-gray-100 p-2 rounded-full shadow-md"
                placeholder="Email"
                onChange={(e) => handleAdminCredentials(e)}
                value={adminCredentials.email}
                name="email"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold mb-2 text-primaryWhite">
                Password
              </label>
              <input
                type="password"
                className="bg-gray-100 p-2 rounded-full shadow-md "
                placeholder="Password"
                onChange={(e) => handleAdminCredentials(e)}
                value={adminCredentials.password}
                name="password"
              />
            </div>
            <button
              type="button"
              className="bg-primaryBlue text-primaryWhite mt-2 p-2 shadow-md rounded-full font-bold w-full max-w-xs"
              onClick={() => handleLogin()}
            >
              Sign-in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
