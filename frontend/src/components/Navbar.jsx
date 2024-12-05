import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FaSearch } from "react-icons/fa";
import { setOpen } from "../features/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";
import AccountOptions from "./AccountOptions";
import { openAccountOptions } from "../features/accountOptions";
import ProfileImage from "./ProfileImage";
import { setSearchTerm } from "../features/searchSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

  const openLogin = () => {
    dispatch(setOpen(true));
  };

  const openAccount = () => {
    dispatch(openAccountOptions(true));
    console.log("open");
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <>
      <nav className="py-3 px-5 shadow-lg sticky top-0 bg-primaryWhite z-10">
        <div className="container flex justify-between items-center">
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <div className="flex justify-center items-center w-full max-w-44 gap-2 md:max-w-sm">
            <div className="relative flex items-center w-full shadow-m rounded-full">
              <input
                className="border-2 border-primaryBlue w-full h-8 focus:outline-none rounded-full p-2 text-primaryGray md:h-full"
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
              />
              <button className="absolute inset-y-0 right-0 flex items-center text-primaryGray text-sm py-1 px-5 rounded-full">
                <FaSearch />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="w-10 h-10 mr-5">
              <PulseLoader color="#0cc0df" size={5} />
            </div>
          ) : userInfo ? (
            <div className="relative">
              <div className="relative flex items-center gap-2 cursor-pointer">
                <h3 className="hidden text-sm font-bold font-Fredoka text-primaryBlue md:flex">{`${userInfo.user.firstName} ${userInfo.user.lastName}`}</h3>
                <ProfileImage h={10} w={10} fun={openAccount} />
              </div>

              <AccountOptions />
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <button
                className="text-primaryWhite py-2 px-5 rounded-full text-sm font-bold shadow-md bg-primaryBlue transition-colors ease-in duration-150 hover:bg-primaryWhite hover:border hover:border-primaryBlue hover:text-black md:text-xl md:px-5"
                onClick={() => openLogin()}
              >
                Sign-In
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
