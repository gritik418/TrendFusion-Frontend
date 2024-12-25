"use client";
import { useAddToCartMutation } from "@/features/api/cartApi";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/features/api/wishlistApi";
import { getCartCountAsync } from "@/features/cart/cartSlice";
import {
  addProductIdToWishlist,
  removeProductIdFromWishlist,
  selectUser,
} from "@/features/user/userSlice";
import { Rating } from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

const DetailedProductItem = ({ product }: { product: Product }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [addToCart] = useAddToCartMutation();
  const dispatch = useDispatch<Dispatch<any>>();
  const user: User = useSelector(selectUser);
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const handleAddToCart = async () => {
    setLoading(true);
    const { error, data } = await addToCart({
      productId: product._id,
      quantity: 1,
    });
    setLoading(false);

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
    } else {
      if (data.success) {
        toast.success(data.message, {
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
      } else {
        toast.error(data.message, {
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
      }
    }
    dispatch(getCartCountAsync());
  };

  const handleRemoveFromWishlist = async () => {
    const { error, data } = await removeFromWishlist(product._id);

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
    if (data) {
      if (data.success) {
        dispatch(removeProductIdFromWishlist(product._id.toString()));
      }
    }
  };

  const handleAddToWishlist = async () => {
    const { error, data } = await addToWishlist(product._id);

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
    if (data) {
      if (data.success) {
        dispatch(addProductIdToWishlist(product._id.toString()));
      }
    }
  };

  return (
    <div className="w-full relative rounded-md shadow hover:shadow-lg py-3 transition-shadow duration-300 ease-in-out flex gap-3">
      <Link
        href={`/product/${product.productId}`}
        className="flex px-2 items-center justify-center mb-3 w-full max-w-[300px]"
      >
        <Image
          className="h-auto w-full max-w-[300px]"
          src={product.thumbnail}
          alt={product.category || ""}
          height={300}
          width={300}
        />
      </Link>

      <div className="flex flex-grow w-full flex-col p-3">
        <p className="uppercase text-lg text-gray-400 font-bold">
          {product.brand}
        </p>
        <Link
          href={`/product/${product.productId}`}
          className="text-xl font-[500] hover:text-[var(--secondary-color)] transition-colors ease-in-out duration-300"
        >
          {product.title}
        </Link>
        <p className="text-gray-400 text-sm font-semibold">
          {product.color?.colorName}
          {product.color?.colorName && product.size && ","} {product.size}
        </p>

        {product.rating && (
          <div className="flex mt-2 items-center gap-2">
            <Rating readOnly defaultValue={product.rating} precision={0.25} />
            <p className="font-bold">{product.rating}</p>
          </div>
        )}

        <div className="flex flex-col mt-3">
          <div className="flex">
            <span className="text-3xl font-semibold">₹</span>
            {product.discount ? (
              <p className="text-3xl font-semibold">
                {product.discount.discountType === "Percentage"
                  ? Math.floor(
                      product.price -
                        (product.price * product.discount?.value!) / 100
                    )
                  : Math.floor(product.price - product.discount.value)}
              </p>
            ) : (
              <p className="text-3xl font-semibold">{product.price}</p>
            )}
          </div>

          <div className="flex">
            {product.discount && (
              <p className="text-xl text-gray-400 font-normal mr-3">
                <span className="line-through">₹{product.price}</span>
              </p>
            )}

            {product.discount && (
              <p className="text-xl text-green-600 font-semibold">
                {product.discount?.value}% Off
              </p>
            )}
          </div>
        </div>

        <div className="mt-3">
          {product.stock > 0 ? (
            <button
              onClick={handleAddToCart}
              className="w-36 h-10 bg-[var(--secondary-color)] mt-4 font-semibold text-xl flex items-center justify-center text-white rounded-full"
            >
              {loading ? (
                <Image
                  src={"/images/loader.gif"}
                  alt="loading"
                  height={20}
                  width={20}
                />
              ) : (
                "Add to Cart"
              )}
            </button>
          ) : (
            <p className="text-red-500 font-bold">Currently unavailable</p>
          )}
        </div>
      </div>

      {user && user?.wishlist?.includes(product._id.toString()) ? (
        <FaHeart
          onClick={handleRemoveFromWishlist}
          className="text-xl cursor-pointer text-red-500 absolute top-2 right-2"
        />
      ) : (
        <FaRegHeart
          onClick={handleAddToWishlist}
          className="text-xl cursor-pointer text-gray-500 absolute top-2 right-2"
        />
      )}
    </div>
  );
};

export default DetailedProductItem;
