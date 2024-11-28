import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { loginAdmin } from "../../api/auth";
import { useNavigate } from "react-router-dom";

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
    if (result.status === true) {
      return navigate("/admin/dashboard/stats");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container grid grid-cols-2">
        <div className="mx-5 my-2">
          <img
            src="https://dummyimage.com/600x400/0cbfdf/ffffff.png&text=placeholder"
            alt=""
            className="h-screen"
          />
        </div>
        <div className="mx-5 my-2  flex justify-center items-center ">
          <div className="shadow-xl rounded-lg py-10 px-24 flex justify-center items-center flex-col gap-5">
            <h1 className="text-2xl font-bold">Welcome Admin</h1>
            <div className="flex flex-col">
              <label className="font-bold mb-2">Email</label>
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
              <label className="font-bold mb-2">Password</label>
              <input
                type="password"
                className="bg-gray-100 p-2 rounded-full shadow-md placeholder:text-black "
                placeholder="Password"
                onChange={(e) => handleAdminCredentials(e)}
                value={adminCredentials.password}
                name="password"
              />
            </div>
            <button
              type="button"
              className="bg-primaryBlue text-primaryWhite mt-2 p-2 border-2 border-black rounded-full font-bold w-full max-w-xs"
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
