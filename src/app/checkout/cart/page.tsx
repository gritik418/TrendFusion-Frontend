"use client";
import CheckLogin from "@/components/CheckLogin/CheckLogin";
import Navbar from "@/components/Navbar/Navbar";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import PaymentOptions from "@/components/PaymentOptions/PaymentOptions";
import ShippingAddress from "@/components/ShippingAddress/ShippingAddress";
import CustomizedSteppers from "@/components/Stepper/Stepper";
import { Separator } from "@/components/ui/separator";
import {
  getCartAsync,
  selectCart,
  selectCartLoading,
} from "@/features/cart/cartSlice";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface OrderDetails {
  isLoggedIn?: boolean;
  deliveryAddress?: DeliveryAddress;
  finalPrice?: number;
  itemCount?: number;
  items?: OrderProductInfo[];
  paymentMethod?: string;
  totalPrice?: number;
  totalQuantity?: number;
  discount?: number;
  expectedDeliveryDate?: Date;
}

const Checkout = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const cart: Cart = useSelector(selectCart);
  const dispatch = useDispatch<Dispatch<any>>();
  const loading = useSelector(selectCartLoading);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>({
    expectedDeliveryDate: new Date(
      "Tue Dec 24 2024 00:00:00 GMT+0530 (India Standard Time)"
    ),
  });

  const components: { [index: number]: JSX.Element } = {
    0: <CheckLogin setActiveStep={setActiveStep} />,
    1: (
      <ShippingAddress
        setOrderDetails={setOrderDetails}
        setActiveStep={setActiveStep}
      />
    ),
    2: (
      <OrderSummary
        setOrderDetails={setOrderDetails}
        setActiveStep={setActiveStep}
        cart={cart}
      />
    ),
    3: (
      <PaymentOptions
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
        setActiveStep={setActiveStep}
        items={cart}
      />
    ),
  };

  useEffect(() => {
    dispatch(getCartAsync());
  }, []);

  if (loading && activeStep === 0) {
    return (
      <div className="h-screen relative">
        <Navbar />
        <div className="h-[90vh] w-full grid place-content-center">
          <Image
            src={"/images/loading.gif"}
            alt="loading"
            height={140}
            width={140}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eeeeee]">
      <Navbar />

      <div className="p-5 pt-10 gap-6 flex flex-col w-full">
        <div className="flex bg-white flex-col items-center p-5 rounded-lg">
          <h1 className="text-4xl mb-8 font-semibold">Checkout</h1>
          <CustomizedSteppers activeStep={activeStep} />
        </div>

        <div className="flex gap-4 flex-col-reverse lg:flex-row">
          {cart?.finalPrice ? (
            <div className="flex w-full lg:w-4/6 bg-white flex-col p-5 rounded-lg">
              {components[activeStep]}
            </div>
          ) : (
            <div className="flex p-6 rounded-md flex-col items-center bg-white w-full">
              <Image
                src={"/images/no-product-checkout.png"}
                alt="No Products"
                height={200}
                width={200}
              />
              <p className="text-2xl">No Product found.</p>

              <Link
                href="/"
                className="bg-[var(--secondary-color)] mt-6 text-white p-2 rounded-md font-bold"
              >
                Continue Shopping
              </Link>
            </div>
          )}

          {cart?.finalPrice ? (
            <div className="bg-white w-full lg:w-2/6 h-max rounded-lg">
              <div className="flex flex-col p-6 gap-3">
                <div className="flex justify-between">
                  <p className="text-sm sm:text-lg">
                    Price ({cart?.totalQuantity}{" "}
                    {cart?.totalQuantity
                      ? cart?.totalQuantity > 1
                        ? "items"
                        : "item"
                      : ""}
                    )
                  </p>
                  <p className="text-sm sm:text-lg font-semibold">
                    ₹{cart?.totalPrice}
                  </p>
                </div>
                {cart?.discount && (
                  <div className="flex justify-between">
                    <p className="text-sm sm:text-lg">Discount</p>
                    <p className="text-sm sm:text-lg font-semibold text-green-600">
                      - ₹{cart?.discount}
                    </p>
                  </div>
                )}
                <div className="flex justify-between">
                  <p className="text-sm sm:text-lg">Platform Fee</p>
                  <p className="text-sm sm:text-lg font-semibold">
                    ₹{cart?.platformFee}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm sm:text-lg">Delivery Charges</p>
                  {cart?.deliveryCharges === 0 || !cart?.deliveryCharges ? (
                    <p className="text-sm sm:text-lg font-semibold text-green-600">
                      Free
                    </p>
                  ) : (
                    <p className="text-sm sm:text-lg font-semibold">
                      ₹{cart?.deliveryCharges}
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between my-2">
                  <p className="text-lg sm:text-xl font-bold">Total Amount</p>
                  <p className="text-lg sm:text-xl font-bold">
                    ₹{cart?.finalPrice}
                  </p>
                </div>

                {cart?.discount && (
                  <p className="text-sm text-green-600 font-bold mb-4">
                    You will save ₹{cart?.discount} on this order
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
