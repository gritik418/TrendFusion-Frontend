import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { BiSolidBank } from "react-icons/bi";
import { FaArrowCircleLeft, FaPaypal, FaRegCreditCard } from "react-icons/fa";
import { IoMdCash } from "react-icons/io";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { OrderDetails } from "@/app/checkout/cart/page";
import { useCreateOrderMutation } from "@/features/api/orderApi";
import { Bounce, toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const PaymentOptions = ({
  setActiveStep,
  orderDetails,
  items,
  setOrderDetails,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
  items: Cart | undefined;
  setOrderDetails: Dispatch<SetStateAction<OrderDetails | null>>;
  orderDetails: OrderDetails | null;
}) => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<
    "Credit Card" | "PayPal" | "Bank Transfer" | "Cash on Delivery" | null
  >(null);

  const [createOrder] = useCreateOrderMutation();

  const changePaymentMethod = (
    method: "Credit Card" | "PayPal" | "Bank Transfer" | "Cash on Delivery"
  ) => {
    setPaymentMethod(method);
    setOrderDetails((prev) => ({ ...prev, paymentMethod: method }));
  };

  const confirmCashOrder = async () => {
    // setIncrementLoading(true);
    const { error, data } = await createOrder(orderDetails!);
    // setIncrementLoading(false);

    if (error) {
      const response = error as FetchBaseQueryError;
      if (response.status === "FETCH_ERROR") {
        toast.error("Check your internet.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
      console.log(response.data);
      const errorResponse = response.data as {
        success: boolean;
        message?: string;
      };
      toast.error(errorResponse.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (data) {
      if (data.success) {
        toast.success(data.message, {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      setTimeout(() => {
        router.push("/order-success");
      }, 1000);
    }
  };

  console.log(orderDetails);

  return (
    <div>
      <h1 className="text-4xl mb-2">Payment Options</h1>
      <Separator />

      <div className="flex flex-col mt-8">
        <h2 className="text-xl font-semibold text-[var(--primary-color)]">
          Select payment option to pay
        </h2>
        <p className="text-3xl font-semibold text-[var(--primary-color)]">
          ₹{items?.finalPrice}
        </p>

        <div className="flex flex-col mt-8 gap-3">
          <div
            onClick={() => changePaymentMethod("Credit Card")}
            className={`cursor-pointer border-2 p-2 rounded-lg flex justify-between items-center ${
              paymentMethod === "Credit Card"
                ? "border-[var(--secondary-color)]"
                : ""
            }`}
          >
            <p className="text-lg">Credit Card</p>{" "}
            <FaRegCreditCard className="text-xl" />
          </div>
          <div
            onClick={() => changePaymentMethod("PayPal")}
            className={`cursor-pointer border-2 p-2 rounded-lg flex justify-between items-center ${
              paymentMethod === "PayPal"
                ? "border-[var(--secondary-color)]"
                : ""
            }`}
          >
            <p className="text-lg">PayPal</p> <FaPaypal className="text-xl" />
          </div>
          <div
            onClick={() => changePaymentMethod("Bank Transfer")}
            className={`cursor-pointer border-2 p-2 rounded-lg flex justify-between items-center ${
              paymentMethod === "Bank Transfer"
                ? "border-[var(--secondary-color)]"
                : ""
            }`}
          >
            <p className="text-lg">Bank Transfer</p>{" "}
            <BiSolidBank className="text-xl" />
          </div>
          <div
            onClick={() => changePaymentMethod("Cash on Delivery")}
            className={`cursor-pointer border-2 p-2 rounded-lg flex justify-between items-center ${
              paymentMethod === "Cash on Delivery"
                ? "border-[var(--secondary-color)]"
                : ""
            }`}
          >
            <p className="text-lg">Cash on Delivery</p>{" "}
            <IoMdCash className="text-xl" />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 items-center">
        <FaArrowCircleLeft
          onClick={() => setActiveStep(2)}
          className="text-4xl text-green-700 cursor-pointer"
        />

        {paymentMethod === "Cash on Delivery" ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="bg-[var(--secondary-color)] p-2 rounded-lg text-white font-bold">
                Place Order
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl">
                  Confirm Cash on Delivery Order
                </AlertDialogTitle>
                <AlertDialogDescription className="flex items-center justify-center flex-col text-sm font-normal">
                  <Image
                    className="my-4"
                    src={"/images/confirm-cod.png"}
                    height={160}
                    width={160}
                    alt="confirm-cod"
                  />
                  Pay via UPI or Cash when you receive your order.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmCashOrder}
                  className="bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]"
                >
                  Confirm Order
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;
