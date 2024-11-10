"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Separator } from "../ui/separator";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";
import { IoMdAdd } from "react-icons/io";
import AddressItem from "../AddressItem/AddressItem";
import AddressInput from "../AddressInput/AddressInput";

const ShippingAddress = ({
  setActiveStep,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  const [showAddressInput, setShowAddressInput] = useState<boolean>(false);
  const user: User = useSelector(selectUser);

  return (
    <div>
      <h1 className="text-4xl mb-2">Shipping Address</h1>
      <Separator />

      {!showAddressInput && (
        <div
          onClick={() => setShowAddressInput(true)}
          className="mt-6 flex cursor-pointer border-[1px] border-dashed border-[var(--secondary-color)] items-center px-5 py-3 text-xl uppercase gap-2 text-[var(--secondary-color)]"
        >
          <IoMdAdd /> Add a new address
        </div>
      )}

      {showAddressInput && (
        <AddressInput setShowAddressInput={setShowAddressInput} />
      )}

      {user.addresses && (
        <div className="flex gap-4 mt-8 flex-col">
          {user.addresses.map((address: DeliveryAddress, index: number) => (
            <AddressItem address={address} key={index} />
          ))}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <FaArrowCircleLeft
          onClick={() => setActiveStep(0)}
          className="text-4xl text-green-700 cursor-pointer"
        />
        <FaArrowCircleRight
          onClick={() => setActiveStep(2)}
          className="text-4xl text-green-700 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ShippingAddress;
