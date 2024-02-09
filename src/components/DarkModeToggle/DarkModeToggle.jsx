import React, { useState, useEffect } from "react";
import sun from "../../assets/svgs/sun.svg";
import moon from "../../assets/svgs/moon.svg";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="flex items-center">
      <button className="" onClick={toggleDarkMode}>
        {darkMode ? (
          <img src={sun} alt="" className="w-[20px] h-[20px]" />
        ) : (
          <img src={moon} alt="" className="w-[20px] h-[20px]" />
        )}
      </button>
      {/* Your component content */}
    </div>
  );
};

export default DarkModeToggle;
