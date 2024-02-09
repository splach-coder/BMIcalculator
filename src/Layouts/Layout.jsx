import React from "react";
import Header from "../components/Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-900 h-screen min-w-screen overflow-hidden">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
