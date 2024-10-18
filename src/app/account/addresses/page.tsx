import { Separator } from "@/components/ui/separator";
import React from "react";
import { IoAddOutline } from "react-icons/io5";

const Addresses = () => {
  return (
    <div className="w-full">
      <div className="w-full mb-4">
        <h1 className="text-3xl mb-3">Manage Addresses</h1>
        <Separator />
      </div>

      <button className="border-[1px] gap-2 w-full uppercase font-semibold flex items-center justify-start p-4 text-blue-600 border-gray-300">
        <IoAddOutline className="text-3xl" />
        <p>Add a new address</p>
      </button>
    </div>
  );
};

export default Addresses;
