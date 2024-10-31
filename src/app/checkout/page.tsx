"use client";
import CheckLogin from "@/components/CheckLogin/CheckLogin";
import Navbar from "@/components/Navbar/Navbar";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import ShippingAddress from "@/components/ShippingAddress/ShippingAddress";
import CustomizedSteppers from "@/components/Stepper/Stepper";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [activeStep, setActiveStep] = useState<number>(2);

  console.log(searchParams.get("otracker"));

  const components: { [index: number]: JSX.Element } = {
    0: <CheckLogin setActiveStep={setActiveStep} />,
    1: <ShippingAddress setActiveStep={setActiveStep} />,
    2: <OrderSummary setActiveStep={setActiveStep} />,
  };

  useEffect(() => {}, []);
  return (
    <div className="min-h-screen bg-[#eeeeee]">
      <Navbar />

      <div className="p-5 pt-10 gap-6 flex flex-col w-full">
        <div className="flex bg-white flex-col items-center p-5 rounded-lg">
          <h1 className="text-4xl mb-8 font-semibold">Checkout</h1>
          <CustomizedSteppers activeStep={activeStep} />
        </div>

        <div className="flex gap-4 flex-col-reverse lg:flex-row">
          <div className="flex w-full lg:w-4/6 bg-white flex-col p-5 rounded-lg">
            {components[activeStep]}
          </div>

          <div className="bg-white w-full lg:w-2/6 h-max rounded-lg">
            <div className="flex flex-col p-6 gap-3">
              <div className="flex justify-between">
                <p className="text-sm sm:text-lg">Price (1 item)</p>
                <p className="text-sm sm:text-lg font-semibold">₹600</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm sm:text-lg">Discount</p>
                <p className="text-sm sm:text-lg font-semibold text-green-600">
                  - ₹21
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm sm:text-lg">Platform Fee</p>
                <p className="text-sm sm:text-lg font-semibold">₹5</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm sm:text-lg">Delivery Charges</p>
                <p className="text-sm sm:text-lg font-semibold">₹10</p>
              </div>

              <Separator />

              <div className="flex justify-between my-2">
                <p className="text-lg sm:text-xl font-bold">Total Amount</p>
                <p className="text-lg sm:text-xl font-bold">₹85</p>
              </div>

              <p className="text-sm text-green-600 font-bold mb-4">
                You will save ₹10 on this order
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
