import Image from "next/image";
import React from "react";
import styles from "./OrderSuccess.module.css";
import Link from "next/link";

const OrderSuccess = () => {
  return (
    <div className="bg-gray-200 h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center bg-white max-w-[600px] w-[90%] p-4 rounded-lg">
        <Image
          className={`${styles.upDownAnimation} my-5`}
          src={"/images/confirm.png"}
          alt="order success"
          height={100}
          width={100}
        />
        <h1 className="text-4xl mb-2 font-bold text-[var(--secondary-color)]">
          Congratulations!
        </h1>
        <h2 className="text-xl font-semibold">Order Placed Successfully</h2>
        <p className="mt-6 max-w-[350px] text-center">
          We'll send you a shipping confirmation email as soon as your order
          ships.
        </p>

        <div className="flex mt-8 gap-4 mb-6">
          <Link href={"/account/orders"} className="bg-gray-100 p-2 rounded-lg">
            Browse Orders
          </Link>

          <Link
            href={"/"}
            className="bg-[var(--secondary-color)] p-2 text-white font-semibold rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
