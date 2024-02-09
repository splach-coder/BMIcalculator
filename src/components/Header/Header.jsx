import React from "react";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

const Header = () => {
  return (
    <div className="w-full py-5 px-5 bg-gradient-to-r from-purple-500 to-[#499BD9]">
      <div className="w-full flex justify-between items-center">
        <div className="w-10 h-10 ">
          <Link to="/">
            <img
              src={Logo}
              className="w-full h-full object-contain cursor-pointer"
              alt=""
            />
          </Link>
        </div>
        <div>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
