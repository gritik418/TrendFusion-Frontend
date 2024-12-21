"use client";
import OrderItem from "@/components/OrderItem/OrderItem";
import { Separator } from "@/components/ui/separator";
import { useGetOrdersQuery } from "@/features/api/orderApi";
import Image from "next/image";
import React from "react";

const Orders = () => {
  const { data, isLoading } = useGetOrdersQuery();

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
        <h1 className="text-3xl mb-3">My Orders</h1>
        <Separator />
      </div>

      <div className="flex flex-col">
        {data && data.orders ? (
          data.orders.map((order: Order) => (
            <OrderItem key={order.orderId} order={order} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Orders;
