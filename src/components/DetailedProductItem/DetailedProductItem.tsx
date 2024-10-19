import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DetailedProductItem = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.productId}`}
      className="w-full cursor-pointer shadow hover:shadow-lg py-3 transition-shadow duration-300 ease-in-out flex gap-3"
    >
      <div className="flex px-2 items-center justify-center mb-3 w-full max-w-[300px]">
        <Image
          className="h-auto w-full max-w-[300px]"
          src={product.thumbnail}
          alt={product.category || ""}
          height={300}
          width={300}
        />
      </div>

      <div className="flex flex-grow w-full flex-col p-3">
        <p className="uppercase text-lg text-gray-400 font-bold">
          {product.brand}
        </p>
        <p className="text-xl font-[500]">{product.title}</p>

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

        <div className="">
          <button className="bg-[var(--secondary-color)] mt-4 font-semibold text-xl py-1 px-4 text-white rounded-full">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default DetailedProductItem;
