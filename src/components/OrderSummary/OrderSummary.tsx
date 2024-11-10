import React, { Dispatch, SetStateAction } from "react";
import { Separator } from "../ui/separator";
import OrderSummaryItem from "../OrderSummaryItem/OrderSummaryItem";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

type Item = { product: CartItem; quantity: number };

const OrderSummary = ({
  setActiveStep,
  cart,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
  cart: Cart | undefined;
}) => {
  if (!cart) {
    return (
      <div className="flex">
        <p>Cart not found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl mb-2">Order Summary</h1>
      <Separator />

      <div className="flex flex-col gap-4 mt-8">
        {cart?.items &&
          cart?.items.map(({ product, quantity }: Item) => (
            <OrderSummaryItem
              key={product?._id}
              item={product}
              quantity={quantity || 1}
            />
          ))}
      </div>

      <div className="flex justify-between mt-8">
        <FaArrowCircleLeft
          onClick={() => setActiveStep(1)}
          className="text-4xl text-green-700 cursor-pointer"
        />
        <FaArrowCircleRight
          onClick={() => setActiveStep(3)}
          className="text-4xl text-green-700 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default OrderSummary;
