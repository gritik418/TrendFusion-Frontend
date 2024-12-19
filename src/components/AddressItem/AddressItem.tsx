import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const AddressItem = ({ address }: { address: DeliveryAddress }) => {
  return (
    <div className="p-4 relative">
      {address.isDefault && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="absolute right-4 rounded-full bg-[var(--secondary-color)] h-5 w-5 top-4"></TooltipTrigger>
            <TooltipContent>Default Address</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <p className="bg-gray-100 text-sm font-semibold text-gray-400 p-3 py-1 uppercase w-max">
        {address.addressType}
      </p>

      <div className="flex mt-3 gap-6 items-center">
        <p className="font-semibold">
          {address.firstName} {address.lastName}
        </p>
        <p className="font-semibold">{address.phoneNumber}</p>
      </div>

      <p>
        {address.street}
        {address.landmark && ","} {address.landmark}
        {address.appartment && ", "}
        {address.appartment}
      </p>

      <p>
        {address.city}, {address.state} -
        <span className="font-semibold ml-2">{address.postalCode}</span>
      </p>

      {address.alternatePhoneNumber && (
        <div className="flex gap-2 text-sm mt-3">
          <p>Alternate Mobile Number: </p>
          <p>{address.alternatePhoneNumber}</p>
        </div>
      )}
    </div>
  );
};

export default AddressItem;
