import React, { Dispatch, SetStateAction } from "react";
import { Separator } from "../ui/separator";
import OrderSummaryItem from "../OrderSummaryItem/OrderSummaryItem";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const items: OrderProductInfo[] = [
  {
    productId: "507f1f77bcf86cd799439012",
    title: "Super Sound Wireless Earbuds",
    brand: "SoundMax",
    thumbnail:
      "https://m.media-amazon.com/images/I/51fKmbuf5+L._AC_SY300_SX300_.jpg",
    quantity: 2,
    unitPrice: 19.99,
    unitDiscount: {
      discountType: "Fixed",
      value: 2, // $2 discount per unit
    },
    color: "Red",
    size: "M",
  },
  {
    productId: "507f1f77bcf86cd799439013",
    title: "Product Name 2",
    brand: "Brand Name 2",
    thumbnail:
      "https://m.media-amazon.com/images/I/71Nd69-7YiL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    quantity: 1,
    unitPrice: 29.99, // No discount for this product
    color: "Blue",
    size: "L",
  },
  {
    productId: "507f1f77bcf86cd799439014",
    title: "Product Name 3",
    brand: "Brand Name 3",
    thumbnail:
      "https://m.media-amazon.com/images/I/51fKmbuf5+L._AC_SY300_SX300_.jpg",
    quantity: 3,
    unitPrice: 9.99,
    unitDiscount: {
      discountType: "Percentage",
      value: 5, // 5% discount
    },
    color: "Green",
    size: "S",
  },
];

const OrderSummary = ({
  setActiveStep,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div>
      <h1 className="text-4xl mb-2">Order Summary</h1>
      <Separator />

      <div className="flex flex-col gap-4 mt-8">
        {items &&
          items.map((item: OrderProductInfo) => (
            <OrderSummaryItem item={item} />
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
