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
import LoginAdmin from "./admin/pages/LoginAdmin";
import { useLocation } from "react-router-dom";
import Product from "./admin/pages/Product";
import AdminOrder from "./admin/pages/Order";
import Statistics from "./admin/pages/Statistics";
import BuyProduct from "./pages/BuyProduct";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const getUser = async () => {
    dispatch(setLoading(true));
    try {
      const userInfo = await fetchUser();
      console.log(userInfo);
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
      {!location.pathname.startsWith("/admin") && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/order" element={<Order />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/product/:productId" element={<BuyProduct />} />
        <Route path="/admin/dashboard/product" element={<Product />} />
        <Route path="/admin/dashboard/order" element={<AdminOrder />} />
        <Route path="/admin/dashboard/stats" element={<Statistics />} />
      </Routes>
      <Login />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
