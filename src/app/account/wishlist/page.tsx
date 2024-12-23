"use client";
import { Separator } from "@/components/ui/separator";
import WishlistItem from "@/components/WishlistItem/WishlistItem";
import { useGetWishlistQuery } from "@/features/api/wishlistApi";
import Image from "next/image";
import React from "react";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const Wishlist = () => {
  const { isLoading, data } = useGetWishlistQuery();

  if (isLoading) {
    return (
      <div className="bg-white h-full p-3 w-full flex items-center justify-center flex-col gap-3">
        <Image
          src={"/images/loading.gif"}
          alt="loading"
          height={140}
          width={140}
        />
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="w-full mb-6">
        <h1 className="text-3xl mb-3">My Wishlist</h1>
        <Separator />
      </div>

      {data?.wishlist ? (
        <div className="flex flex-col gap-2">
          {data?.wishlist.map((item: WishlistItem) => (
            <WishlistItem key={item.productId} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex items-center w-full justify-center py-16">
          <HiOutlineClipboardDocumentList className="text-8xl" />
          <div className="flex flex-col">
            <p className="text-lg">There are no items in this List.</p>
            <p className="text-lg">Add items you want to shop for.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
