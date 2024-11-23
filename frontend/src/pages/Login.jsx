import React from "react";
import googleIcon from "../assets/googleIcon.png";
import facebookIcon from "../assets/facebookIcon.png";
import { IoIosClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setClose } from "../features/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.login.open);

  const closeLogin = () => {
    dispatch(setClose(false));
  };

  if (!open) return null;

  return (
    <div className="h-screen fixed inset-0 flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-75"></div>

      <div className="relative bg-primaryWhite rounded-lg h-5/6 w-5/6 md:h-1/2 md:w-1/3">
        <div className="w-full flex justify-center items-center flex-col h-full gap-5 relative">
          <button
            className="absolute right-5 top-5 text-2xl "
            onClick={() => closeLogin()}
          >
            <IoIosClose />
          </button>
          <p className="text-2xl font-bold mb-5">Sign in to your account</p>
          <button
            className="flex items-center border-[1px] border-gray-200 py-2 px-5 rounded-xl w-2/3 hover:bg-gray-100 transition-colors ease-in duration-150"
            onClick={() =>
              (window.location.href = "http://localhost:5000/auth/google")
            }
          >
            <img src={googleIcon} alt="" className="w-5 h-5" />
            <p className="font-bold text-center w-full">Google</p>
          </button>
          <button
            className="flex items-center border-[1px] border-gray-200 py-2 px-5 rounded-xl w-2/3 hover:bg-gray-100 transition-colors ease-in duration-150"
            onClick={() =>
              (window.location.href = "http://localhost:5000/auth/facebook")
            }
          >
            <img src={facebookIcon} alt="" className="w-5 h-5" />
            <p className="font-bold text-center w-full">Facebook</p>
          </button>
          <div className="flex flex-col items-center">
            <p className="text-sm font-medium">
              By signing in, you agree to GrocerEase’s
            </p>
            <p className="text-sm font-medium text-primaryBlue">
              Terms of Service & Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
