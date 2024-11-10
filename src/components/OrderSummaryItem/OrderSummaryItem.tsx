import Image from "next/image";
import React from "react";
import { CiTrash } from "react-icons/ci";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

const OrderSummaryItem = ({
  item,
  quantity,
}: {
  item: CartItem;
  quantity: number;
}) => {
  return (
    <div className="border-b-2 flex flex-col sm:flex-row gap-4 pb-3">
      <div className="flex items-center h-auto justify-center w-full min-w-[220px]">
        <Image
          className="h-auto w-full"
          src={item?.thumbnail}
          alt="img"
          height={200}
          width={200}
        />
      </div>

      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col justify-start mb-4">
          <div className="flex flex-col">
            <p className="uppercase text-gray-400 text-sm font-bold">
              {item?.brand}
            </p>
            <p className="text-xl">{item?.title}</p>
            <p className="text-sm text-gray-400 font-semibold">
              {item?.color?.colorName}
              {item?.color && item?.size && ","} {item?.size}
            </p>
          </div>

          {item?.discount ? (
            item?.discount?.discountType === "Percentage" ? (
              <div className="flex flex-col mt-1">
                <div className="flex items-end gap-3">
                  <p className="text-gray-500 line-through">
                    M.R.P. {item?.price * quantity}
                  </p>
                  <p className="text-2xl">
                    <span className="text-lg">₹</span>
                    {Math.floor(
                      item.price - (item.price * item.discount?.value!) / 100
                    ) * quantity}
                  </p>
                </div>
                <p className="text-green-600 font-bold">
                  {item?.discount?.value}% Off
                </p>
              </div>
            ) : (
              <div className="flex flex-col mt-1">
                <div className="flex items-end gap-3">
                  <p className="text-gray-500 line-through">
                    M.R.P. {item?.price * quantity}
                  </p>
                  <p className="text-2xl">
                    <span className="text-lg">₹</span>
                    {(item?.price - item.discount.value) * quantity}
                  </p>
                </div>
                <p className="text-green-600 font-bold">
                  ₹{item?.discount?.value * quantity} Off
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-col mt-1">
              <div className="flex items-end gap-3">
                <p className="text-2xl">
                  <span className="text-lg">₹</span>
                  {item?.price}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-6 mt-3">
          <div className="flex border-2 h-10 items-center justify-center rounded-lg">
            <div className="flex items-center justify-center px-2 bg-gray-200 h-full">
              <FiMinus />
            </div>
            <div className="px-4 flex items-center border-l-2 h-full text-center border-r-2">
              <p className="">{quantity}</p>
            </div>
            <div className="flex items-center justify-center px-2 bg-gray-200 h-full">
              <IoMdAdd />
            </div>
          </div>

          <button className="text-sm font-semibold flex items-center gap-1 bg-gray-100 px-4 rounded-lg uppercase">
            <CiTrash className="text-lg" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryItem;
