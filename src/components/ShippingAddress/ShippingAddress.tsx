"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  const [selectedAddress, setSelectedAddress] =
    useState<DeliveryAddress | null>();

  const checkDisabled = (): boolean => {
    if (user?.addresses?.length <= 0) {
      if (selectedAddress) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const defaultAddress = user.addresses
      ? user.addresses.filter((address: DeliveryAddress) => {
          return address.isDefault;
        })
      : null;

    setSelectedAddress(defaultAddress ? defaultAddress[0] : null);
  }, []);

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

      {user.addresses && user.addresses.length > 0 ? (
        <div className="flex gap-4 mt-8 flex-col">
          {user.addresses.map((address: DeliveryAddress, index: number) => (
            <div
              onClick={() => setSelectedAddress(address)}
              className={`${
                selectedAddress?._id === address._id
                  ? "border-[var(--secondary-color)]"
                  : ""
              } cursor-pointer border-2 rounded-md`}
            >
              <AddressItem address={address} key={index} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex mt-16 ml-4 flex-col items-center justify-center">
          <p className="text-xl">No saved address found.</p>
          <p className="text-2xl">Please add a valid address to proceed.</p>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <FaArrowCircleLeft
          onClick={() => setActiveStep(0)}
          className="text-4xl text-green-700 cursor-pointer"
        />
        <button
          disabled={checkDisabled()}
          className="rounded-full disabled:text-gray-400 text-green-700 z-10"
        >
          <FaArrowCircleRight
            onClick={() => setActiveStep(2)}
            className="text-4xl cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default ShippingAddress;
