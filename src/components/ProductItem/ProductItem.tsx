import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.productId}`}
      className="max-w-[320px] w-full min-w-[260px]"
    >
      <div className="hover:shadow-xl bg-gray-50 transition-shadow duration-300 ease-in-out cursor-pointer rounded-lg shadow-md p-2 flex flex-col w-full">
        <div className="flex bg-white rounded-lg overflow-hidden h-[350px] w-full max-w-[320px] items-center justify-center">
          <Image
            src={product.thumbnail}
            className="w-full h-auto object-contain"
            alt={product.category || ""}
            height={350}
            width={300}
          />
        </div>

        <div className="pt-2">
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
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
