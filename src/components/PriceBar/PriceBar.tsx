import { useAddToCartMutation } from "@/features/api/cartApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

const PriceBar = ({ product }: { product: Product }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [addToCart] = useAddToCartMutation();

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
  };
  return (
    <div className="flex p-3 items-end gap-3 flex-col sm:flex-row bg-white border-t-0 shadow-2xl shadow-slate-900 px-8 sticky bottom-0 sm:justify-between sm:items-center">
      <div className="flex items-end">
        <span className="text-xl">₹</span>
        {product.discount ? (
          <p className="text-3xl">
            {product.discount.discountType === "Percentage"
              ? Math.floor(
                  product.price -
                    (product.price * product.discount?.value!) / 100
                )
              : Math.floor(product.price - product.discount.value)}
          </p>
        ) : (
          <p className="text-3xl">{product.price}</p>
        )}

        {product.discount && (
          <p className="text-lg text-gray-500 font-normal mx-3">
            <span className="line-through">₹{product.price}</span>
          </p>
        )}

        {product.discount && (
          <p className="text-xl text-green-600 font-semibold">
            {product.discount?.value}% Off
          </p>
        )}
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={handleAddToCart}
          className="bg-gray-100 flex items-center justify-center text-xl font-normal h-10 w-32 text-gray-700 rounded-md"
        >
          {loading ? (
            <Image
              src={"/images/colorLoader.gif"}
              alt="loading"
              height={25}
              width={25}
            />
          ) : (
            "Add to Cart"
          )}
        </button>
        <button className="bg-[var(--secondary-color)] text-2xl font-normal px-3 py-1 text-white rounded-md">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default PriceBar;
