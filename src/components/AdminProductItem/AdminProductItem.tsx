import Image from "next/image";
import React from "react";

const AdminProductItem = ({ product }: { product: Product }) => {
  return (
    <div className="p-2 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors duration-300 rounded-lg w-[220px]">
      <div className="flex rounded-lg overflow-hidden bg-white h-[150px] items-center justify-center w-[200px]">
        <Image
          src={product.thumbnail}
          alt="img"
          className="h-full w-auto"
          height={150}
          width={150}
        />
      </div>

      <div className="flex flex-col mt-2 justify-between">
        <div className="flex flex-col mb-4">
          <p className="text-xs text-gray-500 uppercase">{product.brand}</p>
          <p className="text-sm">
            {product.title.length > 25
              ? product.title.slice(0, 25) + "..."
              : product.title}
          </p>
        </div>

        <div className="flex justify-start items-center">
          <span className="text-sm">₹</span>
          {product.discount ? (
            <p className="text-sm">
              {product.discount.discountType === "Percentage"
                ? Math.floor(
                    product.price -
                      (product.price * product.discount?.value!) / 100
                  )
                : Math.floor(product.price - product.discount.value)}
            </p>
          ) : (
            <p className="text-xs">{product.price}</p>
          )}

          {product.discount && (
            <p className="text-xs text-gray-500 font-normal mx-3">
              <span className="line-through">₹{product.price}</span>
            </p>
          )}

          {product.discount && (
            <p className="text-xs text-green-600 font-semibold">
              {product.discount?.value}% Off
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductItem;
