import {
  useDecrementProductQuantityMutation,
  useIncrementProductQuantityMutation,
  useRemoveFromCartMutation,
} from "@/features/api/cartApi";
import { getCartAsync, getCartCountAsync } from "@/features/cart/cartSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { FiMinus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Bounce, toast } from "react-toastify";

const OrderSummaryItem = ({
  item,
  quantity,
}: {
  item: CartItem;
  quantity: number;
}) => {
  const [incrementProductQuantity] = useIncrementProductQuantityMutation();
  const [decrementProductQuantity] = useDecrementProductQuantityMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [incrementLoading, setIncrementLoading] = useState<boolean>(false);
  const [decrementLoading, setDecrementLoading] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<any>>();

  let discountedPrice: number = item?.price;
  if (item?.discount?.discountType === "Fixed") {
    discountedPrice = Math.floor(item?.price - item?.discount.value);
  }
  if (item?.discount?.discountType === "Percentage") {
    let discountValue = Math.floor((item?.price * item?.discount.value) / 100);
    discountedPrice = Math.floor(item?.price - discountValue);
  }

  const handleIncrementQuantity = async () => {
    setIncrementLoading(true);
    const { error } = await incrementProductQuantity(item?._id);
    setIncrementLoading(false);
    dispatch(getCartAsync());

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
    const { error } = await decrementProductQuantity(item._id);
    setDecrementLoading(false);
    dispatch(getCartAsync());

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
    const { error } = await removeFromCart(item._id);

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
    dispatch(getCartAsync());
  };

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

        <div className="flex mt-3 justify-between items-center gap-4">
          <div className="flex items-center">
            <button
              disabled={quantity === 1}
              onClick={handleDecrementQuantity}
              className="border-2 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-none m-1 w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md"
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
              disabled={item.stock <= quantity}
              onClick={handleIncrementQuantity}
              className="border-2 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-none m-1 w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md"
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

          <button
            onClick={handleRemoveFromCart}
            className="text-sm p-2 font-semibold flex items-center gap-1 bg-gray-100 px-4 rounded-lg uppercase"
          >
            <CiTrash className="text-lg" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryItem;
