import React from "react";
import Logo from "../../components/Logo";

const AdminNavbar = () => {
  return (
    <nav className="py-3 px-5 shadow-lg sticky top-0 bg-primaryWhite z-10">
      <div className="container">
        <Logo />
      </div>
    </nav>
  );
};

export default AdminNavbar;
