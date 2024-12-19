"use client";
import CheckLogin from "@/components/CheckLogin/CheckLogin";
import Navbar from "@/components/Navbar/Navbar";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import PaymentOptions from "@/components/PaymentOptions/PaymentOptions";
import ShippingAddress from "@/components/ShippingAddress/ShippingAddress";
import CustomizedSteppers from "@/components/Stepper/Stepper";
import { Separator } from "@/components/ui/separator";
import { SELECTED_PRODUCT } from "@/constants/variables";
import { getCartAsync, selectCart } from "@/features/cart/cartSlice";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// const exampleOrder: Order = {
//   orderId: "ORD123456",
//   userId: "507f1f77bcf86cd799439011", // Example ObjectId
//   orderDate: new Date(),
//   expectedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
//   status: "Pending",
//   items: exampleProducts,
//   itemCount: exampleProducts.length,
//   totalQuantity: exampleProducts.reduce(
//     (total, product) => total + product.quantity,
//     0
//   ),
//   // totalPrice: totalPrice,
//   // discount: exampleDiscount,
//   // finalPrice: finalPrice,
//   paymentMethod: "Credit Card",
//   deliveryAddress: {
//     firstName: "John",
//     lastName: "Doe",
//     city: "Anytown",
//     state: "CA",
//     street: "123 Main St",
//     postalCode: "12345",
//     landmark: "Near the central park",
//     appartment: "Apt 4B",
//     phoneNumber: "123-456-7890",
//     alternatePhoneNumber: "098-765-4321",
//     isDefault: true,
//     addressType: "home",
//   },
//   trackingId: "TRACK123456", // Optional
// };

const Checkout = () => {
  const searchParams = useSearchParams();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [items, setItems] = useState<Cart>();
  const cart: Cart = useSelector(selectCart);
  const dispatch = useDispatch<Dispatch<any>>();
  const [loading, setLoading] = useState<boolean>(true);

  const tracker = searchParams.get("otracker");

  const components: { [index: number]: JSX.Element } = {
    0: <CheckLogin setActiveStep={setActiveStep} />,
    1: <ShippingAddress setActiveStep={setActiveStep} />,
    2: <OrderSummary setActiveStep={setActiveStep} cart={items} />,
    3: <PaymentOptions setActiveStep={setActiveStep} items={items} />,
  };

  useEffect(() => {
    if (tracker && tracker === "cart") {
      dispatch(getCartAsync());
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (tracker && tracker === "cart") {
      setItems(cart);
    } else {
      const item: string | null = localStorage.getItem(SELECTED_PRODUCT);
      if (item) {
        const selectedItem = JSON.parse(item);
        setItems(selectedItem);
      }
      setLoading(false);
    }
    setLoading(false);
  }, [cart]);

  if (loading) {
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
          {items?.finalPrice ? (
            <div className="flex w-full lg:w-4/6 bg-white flex-col p-5 rounded-lg">
              {components[activeStep]}
            </div>
          ) : (
            <div className="flex p-6">
              <p className="text-xl">No Product found.</p>
            </div>
          )}

          {items?.finalPrice ? (
            <div className="bg-white w-full lg:w-2/6 h-max rounded-lg">
              <div className="flex flex-col p-6 gap-3">
                <div className="flex justify-between">
                  <p className="text-sm sm:text-lg">
                    Price ({items?.totalQuantity}{" "}
                    {items?.totalQuantity
                      ? items?.totalQuantity > 1
                        ? "items"
                        : "item"
                      : ""}
                    )
                  </p>
                  <p className="text-sm sm:text-lg font-semibold">
                    ₹{items?.totalPrice}
                  </p>
                </div>
                {items?.discount && (
                  <div className="flex justify-between">
                    <p className="text-sm sm:text-lg">Discount</p>
                    <p className="text-sm sm:text-lg font-semibold text-green-600">
                      - ₹{items?.discount}
                    </p>
                  </div>
                )}
                <div className="flex justify-between">
                  <p className="text-sm sm:text-lg">Platform Fee</p>
                  <p className="text-sm sm:text-lg font-semibold">
                    ₹{items?.platformFee}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm sm:text-lg">Delivery Charges</p>
                  {items?.deliveryCharges === 0 || !items?.deliveryCharges ? (
                    <p className="text-sm sm:text-lg font-semibold text-green-600">
                      Free
                    </p>
                  ) : (
                    <p className="text-sm sm:text-lg font-semibold">
                      ₹{items?.deliveryCharges}
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between my-2">
                  <p className="text-lg sm:text-xl font-bold">Total Amount</p>
                  <p className="text-lg sm:text-xl font-bold">
                    ₹{items?.finalPrice}
                  </p>
                </div>

                {items?.discount && (
                  <p className="text-sm text-green-600 font-bold mb-4">
                    You will save ₹{items?.discount} on this order
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
