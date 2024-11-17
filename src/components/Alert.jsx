import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { BiSolidErrorAlt } from "react-icons/bi";

function Alert({ msg, cat }) {
  if (cat == "success") {
    return (
      <div className="absolute w-full h-16 bg-[#ffffff83] border border-prim-300 rounded items-center backdrop-blur-2 text-dark-100 flex">
        <div className="bg-prim-300 text-white flex h-16 items-center w-16 mr-4 justify-center">
          <FaCircleCheck className="text-4xl" />
        </div>
        {msg}
      </div>
    );
  } else if (cat == "warning") {
    return (
      <div className="absolute w-full h-16 bg-[#ffffff83] border border-prim-200 rounded items-center backdrop-blur-2 text-dark-100 flex">
        <div className="bg-prim-200 text-dark-100 flex h-16 items-center w-16 mr-4 justify-center">
          <IoIosWarning className="text-4xl" />
        </div>
        {msg}
      </div>
    );
  } else {
    return (
      <div className="absolute w-full h-16 bg-[#ffffff83] border border-prim-100 rounded items-center backdrop-blur-2 text-dark-100 flex">
        <div className="bg-prim-100 text-white flex h-16 items-center w-16 mr-4 justify-center">
          <BiSolidErrorAlt className="text-4xl" />
        </div>
        {msg}
      </div>
    );
  }
}

export default Alert;
