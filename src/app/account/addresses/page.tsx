"use client";
import AddressInput from "@/components/AddressInput/AddressInput";
import AddressItem from "@/components/AddressItem/AddressItem";
import { Separator } from "@/components/ui/separator";
import { selectUser } from "@/features/user/userSlice";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Addresses = () => {
  const [showAddressInput, setShowAddressInput] = useState<boolean>(false);
  const user: User = useSelector(selectUser);
  return (
    <div className="w-full">
      <div className="w-full mb-6">
        <h1 className="text-3xl mb-3">Manage Addresses</h1>
        <Separator />
      </div>

      {!showAddressInput && (
        <button
          onClick={() => setShowAddressInput(true)}
          className="border-2 gap-2 w-full uppercase font-semibold flex items-center justify-start p-4 border-[var(--medium-color)] text-[var(--secondary-color)]  border-gray-300"
        >
          <IoAddOutline className="text-3xl" />
          <p>Add a new address</p>
        </button>
      )}

      {showAddressInput && (
        <AddressInput setShowAddressInput={setShowAddressInput} />
      )}

      {user.addresses && user.addresses.length > 0 ? (
        <div className="flex gap-4 mt-8 flex-col">
          {user.addresses.map((address: DeliveryAddress, index: number) => (
            <AddressItem address={address} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex mt-16 ml-4 flex-col items-center justify-center">
          <p className="text-xl">No address found.</p>
        </div>
      )}
    </div>
  );
};

export default Addresses;
