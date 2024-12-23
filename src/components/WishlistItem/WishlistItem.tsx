import Image from "next/image";
import { Separator } from "../ui/separator";
import { FaStar, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useRemoveFromWishlistMutation } from "@/features/api/wishlistApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Bounce, toast } from "react-toastify";

const WishlistItem = ({ item }: { item: WishlistItem }) => {
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const handleRemoveFromWishlist = async () => {
    setRemoveLoading(true);
    const { error } = await removeFromWishlist(item._id);
    setRemoveLoading(false);

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
  };
  return (
    <div>
      <div className="gap-3 flex p-2 mb-2 justify-between">
        <div className="flex gap-3">
          <Link
            href={`/product/${item.productId}`}
            className="flex bg-white min-w-[120px] items-center justify-center"
          >
            <Image
              className="h-[120px] max-w-[120px] w-auto"
              src={item.thumbnail}
              height={120}
              width={120}
              alt=""
            />
          </Link>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-gray-400 font-semibold uppercase text-sm">
                {item.brand}
              </p>
              <Link
                href={`/product/${item.productId}`}
                className="text-lg hover:text-[var(--secondary-color)] transition-colors ease-in-out duration-300"
              >
                {item.title}
              </Link>
              <p className="text-xs font-semibold mb-1 text-gray-500">
                {item?.color?.colorName} {item?.color && item?.size && ", "}
                {item?.size}
              </p>
              {item.rating && (
                <div className="flex w-max items-center gap-2 mt-1 bg-green-700 text-white px-1 py-0 rounded-sm">
                  <p className="text-sm font-semibold">{item.rating}</p>
                  <FaStar className="text-sm" />
                </div>
              )}
            </div>

            <div className="flex items-end">
              <span className="text-xl">₹</span>
              {item.discount ? (
                <p className="text-2xl font-semibold">
                  {item.discount.discountType === "Percentage"
                    ? Math.floor(
                        item.price - (item.price * item.discount?.value!) / 100
                      )
                    : Math.floor(item.price - item.discount.value)}
                </p>
              ) : (
                <p className="text-2xl font-semibold">{item.price}</p>
              )}

              {item.discount && (
                <p className="text-lg text-gray-500 font-normal mx-3">
                  <span className="line-through">₹{item.price}</span>
                </p>
              )}

              {item.discount && (
                <p className="text-xl text-green-600 font-semibold">
                  {item.discount?.value}% Off
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div
            onClick={handleRemoveFromWishlist}
            className="cursor-pointer bg-gray-50 transition-colors duration-500 ease-in-out hover:text-red-400 h-10 w-10 flex items-center justify-center rounded-full"
          >
            {removeLoading ? (
              <Image
                src={"/images/colorLoader.gif"}
                alt="loading"
                height={20}
                width={20}
              />
            ) : (
              <FaTrash />
            )}
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default WishlistItem;
