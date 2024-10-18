import React from "react";

const PriceBar = ({ product }: { product: Product }) => {
  return (
    <div className="flex p-3 items-end gap-3 flex-col sm:flex-row bg-white border-t-0 shadow-2xl shadow-slate-900 px-8 sticky bottom-0 sm:justify-between sm:items-center">
      <div className="flex items-end">
        <span className="text-xl">₹</span>
        <p className="text-3xl">
          {product.discount
            ? Math.floor(
                product.price - (product.price * product.discount?.value!) / 100
              )
            : product.price}
        </p>

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
        <button className="bg-gray-100 text-xl font-normal px-3 py-1 text-gray-700 rounded-md">
          Add to Cart
        </button>
        <button className="bg-[var(--secondary-color)] text-2xl font-normal px-3 py-1 text-white rounded-md">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default PriceBar;
