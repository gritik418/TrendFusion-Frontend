import Image from "next/image";
import Link from "next/link";
import React from "react";

const monthNames: { [key: number]: string } = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const OrderItem = ({ order }: { order: Order }) => {
  const getMonths = (monthNumber: number) => {
    return monthNames[monthNumber];
  };
  return (
    <div className="flex flex-col mb-8">
      {(order.status === "Pending" || order.status === "Shipped") && (
        <div className="flex w-max p-2 items-center gap-2 rounded-t-lg bg-green-100">
          <p className="text-green-600 text-sm font-semibold">Arriving by</p>
          <p className="text-sm text-green-600 font-semibold">
            {new Date(order.expectedDeliveryDate!).getDate()}{" "}
            {getMonths(new Date(order.expectedDeliveryDate!).getMonth())}{" "}
            {new Date(order.expectedDeliveryDate!).getFullYear()}
          </p>
        </div>
      )}
      <div className="border-2 overflow-hidden rounded-lg">
        <div className="flex bg-gray-100 py-3 px-5 justify-between">
          <div className="flex gap-10">
            <div className="flex flex-col items-start gap-1">
              <p className="uppercase text-sm text-gray-600 font-semibold">
                Order Placed
              </p>
              <p className="text-[16px] font-semibold text-gray-500">
                {new Date(order.orderDate).getDate()}{" "}
                {getMonths(new Date(order.orderDate).getMonth())}{" "}
                {new Date(order.orderDate).getFullYear()}
              </p>
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="uppercase text-sm text-gray-600 font-semibold">
                Total
              </p>
              <p className="text-[16px] font-semibold text-gray-500">
                ₹{Math.floor(order.finalPrice)}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <p className="text-xs text-gray-800 font-normal">
              ORDER # {order.orderId}
            </p>
            <Link
              href={`/order_details/${order.orderId}`}
              className="text-blue-600 font-semibold text-sm cursor-pointer"
            >
              View more details
            </Link>
          </div>
        </div>

        <div className="">
          {order.items.map((item: OrderProductInfo) => {
            return (
              <div
                key={item._id}
                className="flex justify-between p-3 border-t-2 "
              >
                <div className="flex gap-3">
                  <div className="flex bg-white min-w-[120px] items-center justify-center">
                    <Image
                      className="h-[120px] max-w-[120px] w-auto"
                      src={item.thumbnail}
                      height={120}
                      width={120}
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col justify-center gap-3">
                    <p className="text-xl">{item.title}</p>
                    <div className="flex gap-3">
                      <button className="text-white py-1 px-3 rounded-md bg-[var(--secondary-color)]">
                        Buy it again
                      </button>
                      <button className="border-2 border-[var(--secondary-color)] py-1 px-3 rounded-md">
                        View item
                      </button>
                    </div>
                  </div>
                </div>

                {order.status === "Delivered" ? (
                  <div className="flex items-center">
                    <button className="text-nowrap ml-4 border-2 rounded-full border-gray-500 py-1 px-4">
                      Write a review
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
