import React from "react";
import spinner from "../../assets/svgs/spinner.svg";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center ">
      <img className="animate-spin h-12 w-12" src={spinner} alt="" />
    </div>
  );
};

export default Spinner;
