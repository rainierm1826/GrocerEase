import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="bg-primaryWhite shadow-inner py-10 px-5 mt-10">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="flex flex-col gap-5 justify-between items-center sm:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo />
          </div>
          {/* Contact Information */}
          <div className="text-center sm:text-left">
            <p className="mb-2 font-bold text-sm text-primaryBlue">
              Contact Us
            </p>
            <p className="text-md font-medium">grocerease02@gmail.com</p>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        {/* Links Section */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {/* Quick Links */}
          <div>
            <h3 className="text-primaryBlue font-semibold text-lg uppercase mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="text-black text-sm">Home</li>
              <li className="text-black text-sm">About Us</li>
              <li className="text-black text-sm">Shop</li>
              <li className="text-black text-sm">Contact</li>
            </ul>
          </div>
          {/* Categories */}
          <div>
            <h3 className="text-primaryBlue font-semibold text-lg uppercase mb-4">
              Categories
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="text-black text-sm">Fruits & Vegetables</li>
              <li className="text-black text-sm">Dairy Products</li>
              <li className="text-black text-sm">Beverages</li>
              <li className="text-black text-sm">Snacks</li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h3 className="text-primaryBlue font-semibold text-lg uppercase mb-4">
              Support
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="text-black text-sm">FAQs</li>
              <li className="text-black text-sm">Order Tracking</li>
              <li className="text-black text-sm">Returns</li>
              <li className="text-black text-sm">Customer Support</li>
            </ul>
          </div>
          {/* Social Media */}
          <div>
            <h3 className="text-primaryBlue font-semibold text-lg uppercase mb-4">
              Follow Us
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="text-black text-sm">Facebook</li>
              <li className="text-black text-sm">Instagram</li>
              <li className="text-black text-sm">Twitter</li>
              <li className="text-black text-sm">LinkedIn</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      <div className="text-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Grocerease. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
