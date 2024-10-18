import AddressInput from "@/components/AddressInput/AddressInput";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { IoAddOutline } from "react-icons/io5";

const Addresses = () => {
  return (
    <div className="w-full">
      <div className="w-full mb-6">
        <h1 className="text-3xl mb-3">Manage Addresses</h1>
        <Separator />
      </div>

      <button className="border-2 gap-2 w-full uppercase font-semibold flex items-center justify-start p-4 border-[var(--medium-color)] text-[var(--secondary-color)]  border-gray-300">
        <IoAddOutline className="text-3xl" />
        <p>Add a new address</p>
      </button>

      <AddressInput />
    </div>
  );
};

export default Addresses;
