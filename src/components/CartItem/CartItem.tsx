import Image from "next/image";
import React from "react";
import { FaHeart, FaTrash } from "react-icons/fa";

const CartItem = ({ product }: { product: Product }) => {
  let discountedPrice: number = 0;
  if (product.discount?.discountType === "Fixed") {
    discountedPrice = Math.ceil(product.price - product.discount.value);
  }
  if (product.discount?.discountType === "Percentage") {
    let discountValue = Math.ceil(
      (product.price * product.discount.value) / 100
    );
    discountedPrice = Math.ceil(product.price - discountValue);
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-8 mb-4 sm:flex-row border-b-2 p-2">
      <div className="w-full gap-1 sm:min-w-[220px] sm:max-w-[220px] h-[270px] flex flex-col items-center justify-center">
        <Image
          className="min-h-[220px] max-h-[220px] w-auto"
          src={product.thumbnail}
          alt={product.category || ""}
          height={300}
          width={300}
        />
        <div className="flex items-center">
          <button className="border-2 m-1 bg-gray-200 px-3 py-1 rounded-md">
            -
          </button>
          <p className="px-4">1</p>
          <button className="border-2 m-1 bg-gray-200 px-3 py-1 rounded-md">
            +
          </button>
        </div>
      </div>
      <div className="flex justify-between flex-col pb-3">
        <div className="">
          <p className="text-sm text-gray-400 uppercase font-bold">
            {product.brand}
          </p>
          <p className="text-xl mb-2">{product.title}</p>
          <p className="text-sm text-green-700 font-normal">In Stock</p>

          <p className="mt-4">
            <span className="text-gray-500 line-through">₹{product.price}</span>
            <span className="mx-2 text-xl font-bold">₹{discountedPrice}</span>

            <span className="text-green-600 font-semibold text-sm">
              {product.discount?.value}% Off
            </span>
          </p>
        </div>

        <div className="flex gap-5 mt-5 items-end justify-end">
          <button className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
            <FaHeart className="text-red-500" /> Add to Wishlist
          </button>

          <button className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
            <FaTrash className="text-gray-400" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
