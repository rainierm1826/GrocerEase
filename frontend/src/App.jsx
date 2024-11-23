import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { setUser, setLoading, setError } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { fetchUser } from "./api/auth";
import { Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();

  const getUser = async () => {
    dispatch(setLoading(true));
    try {
      const userInfo = await fetchUser();
      dispatch(setUser(userInfo));
    } catch (error) {
      dispatch(setError(error));
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
