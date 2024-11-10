import {
  useDecrementProductQuantityMutation,
  useIncrementProductQuantityMutation,
  useRemoveFromCartMutation,
} from "@/features/api/cartApi";
import { getCartCountAsync } from "@/features/cart/cartSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Bounce, toast } from "react-toastify";

const CartItem = ({
  product,
  quantity,
}: {
  product: CartItem;
  quantity: number;
}) => {
  const [incrementProductQuantity] = useIncrementProductQuantityMutation();
  const [decrementProductQuantity] = useDecrementProductQuantityMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [incrementLoading, setIncrementLoading] = useState<boolean>(false);
  const [decrementLoading, setDecrementLoading] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<any>>();

  let discountedPrice: number = product.price;
  if (product?.discount?.discountType === "Fixed") {
    discountedPrice = Math.floor(product.price - product.discount.value);
  }
  if (product?.discount?.discountType === "Percentage") {
    let discountValue = Math.floor(
      (product.price * product.discount.value) / 100
    );
    discountedPrice = Math.floor(product.price - discountValue);
  }

  const handleIncrementQuantity = async () => {
    setIncrementLoading(true);
    const { error } = await incrementProductQuantity(product._id);
    setIncrementLoading(false);

    if (error) {
      const response = error as FetchBaseQueryError;
      if (response.status === "FETCH_ERROR") {
        toast.error("Check your internet.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
      const errorResponse = response.data as {
        success: boolean;
        message?: string;
      };
      toast.error(errorResponse.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    dispatch(getCartCountAsync());
  };

  const handleDecrementQuantity = async () => {
    setDecrementLoading(true);
    const { error } = await decrementProductQuantity(product._id);
    setDecrementLoading(false);

    if (error) {
      const response = error as FetchBaseQueryError;
      if (response.status === "FETCH_ERROR") {
        toast.error("Check your internet.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
      const errorResponse = response.data as {
        success: boolean;
        message?: string;
      };
      toast.error(errorResponse.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    dispatch(getCartCountAsync());
  };

  const handleRemoveFromCart = async () => {
    const { error } = await removeFromCart(product._id);

    if (error) {
      const response = error as FetchBaseQueryError;
      if (response.status === "FETCH_ERROR") {
        toast.error("Check your internet.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
      const errorResponse = response.data as {
        success: boolean;
        message?: string;
      };
      toast.error(errorResponse.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    dispatch(getCartCountAsync());
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-8 mb-4 sm:flex-row border-b-2 p-2">
      <div className="w-full gap-1 sm:min-w-[220px] sm:max-w-[220px] h-[270px] flex flex-col items-center justify-center">
        <Image
          className="min-h-[220px] max-h-[220px] w-auto"
          src={product.thumbnail}
          alt={product.brand || ""}
          height={300}
          width={300}
        />
        <div className="flex items-center">
          <button
            disabled={quantity === 1}
            onClick={handleDecrementQuantity}
            className="border-2 disabled:bg-gray-50 disabled:text-gray-300 disabled:border-none m-1 w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md"
          >
            {decrementLoading ? (
              <Image
                src={"/images/colorLoader.gif"}
                alt="loading"
                height={20}
                width={20}
              />
            ) : (
              "-"
            )}
          </button>
          <p className="px-4">{quantity}</p>
          <button
            disabled={product.stock <= quantity}
            onClick={handleIncrementQuantity}
            className="border-2 disabled:bg-gray-50 disabled:text-gray-300 disabled:border-none m-1 w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md"
          >
            {incrementLoading ? (
              <Image
                src={"/images/colorLoader.gif"}
                alt="loading"
                height={20}
                width={20}
              />
            ) : (
              "+"
            )}
          </button>
        </div>
      </div>
      <div className="flex justify-between flex-col pb-3">
        <div className="">
          <p className="text-sm text-gray-400 uppercase font-bold">
            {product.brand}
          </p>
          <p className="text-xl mb-1">{product.title}</p>
          <p className="text-sm font-bold text-gray-500 mb-2">
            {product?.color?.colorName}
            {product.color?.colorName && product?.size && ","} {product.size}
          </p>
          <p className="text-sm text-green-700 font-normal">In Stock</p>

          <p className="mt-4">
            {product.discount && (
              <span className="text-gray-500 line-through">
                ₹{product.price * quantity}
              </span>
            )}
            <span className="mx-2 text-xl font-bold">
              ₹{discountedPrice * quantity}
            </span>

            {product.discount && (
              <span className="text-green-600 font-semibold text-sm">
                {product.discount?.value}% Off
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-5 mt-5 items-end justify-end">
          <button className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
            <FaHeart className="text-red-500" /> Add to Wishlist
          </button>

          <button
            onClick={handleRemoveFromCart}
            className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md"
          >
            <FaTrash className="text-gray-400" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
