"use client";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/features/api/wishlistApi";
import {
  addProductIdToWishlist,
  removeProductIdFromWishlist,
  selectUser,
} from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

const ProductItem = ({ product }: { product: Product }) => {
  const user: User = useSelector(selectUser);
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const dispatch = useDispatch<Dispatch<any>>();

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
    <div className="max-w-[320px] relative w-full min-w-[260px]">
      <div className="hover:shadow-xl bg-gray-50 transition-shadow duration-300 ease-in-out rounded-lg shadow-md p-2 flex flex-col w-full">
        <Link
          href={`/product/${product.productId}`}
          className="flex bg-white rounded-lg overflow-hidden h-[350px] w-full max-w-[320px] items-center justify-center"
        >
          <Image
            src={product.thumbnail}
            className="w-full h-auto object-contain"
            alt={product.category || ""}
            height={350}
            width={300}
          />
        </Link>

        <Link href={`/product/${product.productId}`} className="pt-2">
          <p className="text-xs uppercase text-gray-400 font-bold">
            {product.brand}
          </p>
          <p>
            {product.title.length > 30
              ? product.title.slice(0, 30) + "..."
              : product.title}
          </p>

          <p className="text-gray-400 text-sm font-semibold">
            {product.color?.colorName}
            {product.color?.colorName && product.size && ","} {product.size}
          </p>

          {product.rating && (
            <p className="flex items-center text-xs bg-green-700 rounded-md text-white w-max px-2 py-1 gap-1 font-bold mt-1">
              <FaStar /> {product.rating}
            </p>
          )}

          <div className="flex items-center mt-3">
            <span className="text-xl">₹</span>
            {product.discount ? (
              <p className="text-2xl">
                {product.discount.discountType === "Percentage"
                  ? Math.floor(
                      product.price -
                        (product.price * product.discount?.value!) / 100
                    )
                  : Math.floor(product.price - product.discount.value)}
              </p>
            ) : (
              <p className="text-2xl">{product.price}</p>
            )}

            {product.discount && (
              <p className="text-sm text-gray-500 font-normal mx-3">
                <span className="line-through">₹{product.price}</span>
              </p>
            )}

            {product.discount && (
              <p className="text-sm text-green-600 font-semibold">
                {product.discount?.value}% Off
              </p>
            )}
          </div>
        </Link>
      </div>
      {user && user?.wishlist?.includes(product._id.toString()) ? (
        <FaHeart
          onClick={handleRemoveFromWishlist}
          className="text-xl cursor-pointer text-red-500 absolute top-3 right-3"
        />
      ) : (
        <FaRegHeart
          onClick={handleAddToWishlist}
          className="text-xl cursor-pointer text-gray-500 absolute top-3 right-3"
        />
      )}
    </div>
  );
};

export default ProductItem;
