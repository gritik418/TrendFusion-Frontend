import React from "react";
import { IoLocation } from "react-icons/io5";

const CheckDelivery = () => {
  return (
    <div className="flex gap-4 mb-3">
      <div className="flex flex-row items-center gap-2">
        <IoLocation className="text-xl text-blue-500" />
        <input
          type="number"
          placeholder="Enter Delivery Pincode"
          className="border-b-2 border-blue-500 placeholder-gray-400 outline-none"
        />
      </div>
      <button className="hover:bg-gray-50 transition-colors ease-in-out duration-300 font-semibold text-xl text-blue-500 px-4 py-1 rounded-md">
        Check
      </button>
    </div>
  );
};

export default CheckDelivery;
