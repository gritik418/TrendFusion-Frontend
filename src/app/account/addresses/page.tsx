"use client";
import AddressInput from "@/components/AddressInput/AddressInput";
import AddressItem from "@/components/AddressItem/AddressItem";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";

const addresses: DeliveryAddress[] = [
  {
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    state: "NY",
    street: "123 Main St",
    postalCode: "10001",
    landmark: "Near Central Park",
    appartment: "Apt 1A",
    phoneNumber: "5551234567",
    alternatePhoneNumber: "5559876543",
    isDefault: true,
    addressType: "home",
  },
  {
    firstName: "John",
    lastName: "Doe",
    city: "Los Angeles",
    state: "CA",
    street: "456 Elm St",
    postalCode: "90001",
    landmark: "Near Hollywood Blvd",
    appartment: "Suite 200",
    phoneNumber: "5555678901",
    alternatePhoneNumber: "5558765432",
    isDefault: false,
    addressType: "work",
  },
  {
    firstName: "John",
    lastName: "Doe",
    city: "Chicago",
    state: "IL",
    street: "789 Oak St",
    postalCode: "60601",
    landmark: "Next to Millennium Park",
    appartment: "Apt 5B",
    phoneNumber: "5559101234",
    alternatePhoneNumber: "5556789012",
    isDefault: false,
    addressType: "home",
  },
  {
    firstName: "John",
    lastName: "Doe",
    city: "Houston",
    state: "TX",
    street: "101 Pine St",
    postalCode: "77001",
    landmark: "Near the Galleria",
    appartment: "Floor 3",
    phoneNumber: "5551122334",
    alternatePhoneNumber: "5552233445",
    isDefault: false,
    addressType: "work",
  },
  {
    firstName: "John",
    lastName: "Doe",
    city: "Miami",
    state: "FL",
    street: "202 Maple Ave",
    postalCode: "33101",
    landmark: "Close to Miami Beach",
    appartment: "Unit 7",
    phoneNumber: "5553344556",
    alternatePhoneNumber: "5555566778",
    isDefault: false,
    addressType: "home",
  },
  {
    firstName: "John",
    lastName: "Doe",
    city: "Seattle",
    state: "WA",
    street: "303 Birch Rd",
    postalCode: "98101",
    landmark: "Near Pike Place Market",
    appartment: "Bldg 4, Apt 9",
    phoneNumber: "5555566778",
    alternatePhoneNumber: "5554433221",
    isDefault: false,
    addressType: "work",
  },
  {
    firstName: "John",
    lastName: "Doe",
    city: "San Francisco",
    state: "CA",
    street: "404 Cedar St",
    postalCode: "94101",
    landmark: "Near Golden Gate Park",
    appartment: "Floor 2",
    phoneNumber: "5557788990",
    alternatePhoneNumber: "5558899001",
    isDefault: false,
    addressType: "home",
  },
  {
    firstName: "John",
    lastName: "Doe",
    city: "Boston",
    state: "MA",
    street: "505 Willow Way",
    postalCode: "02101",
    landmark: "Next to Boston Common",
    appartment: "Apt 8C",
    phoneNumber: "5559900112",
    alternatePhoneNumber: "5557778889",
    isDefault: false,
    addressType: "work",
  },
  {
    firstName: "John",
    lastName: "Doe",
    city: "Denver",
    state: "CO",
    street: "606 Spruce St",
    postalCode: "80201",
    landmark: "Near Union Station",
    appartment: "Penthouse",
    phoneNumber: "5551213141",
    alternatePhoneNumber: "5553334445",
    isDefault: false,
    addressType: "home",
  },
  {
    firstName: "John",
    lastName: "Doe",
    city: "Atlanta",
    state: "GA",
    street: "707 Fir Ave",
    postalCode: "30301",
    landmark: "Close to Centennial Park",
    appartment: "Apt 10",
    phoneNumber: "5551415161",
    alternatePhoneNumber: "5552468135",
    isDefault: false,
    addressType: "work",
  },
];

const Addresses = () => {
  const [showAddressInput, setShowAddressInput] = useState<boolean>(false);
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

      {addresses && (
        <div className="flex gap-4 mt-8 flex-col">
          {addresses.map((address: DeliveryAddress) => (
            <AddressItem address={address} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
