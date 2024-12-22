"use client";
import Navbar from "@/components/Navbar/Navbar";
import { Separator } from "@/components/ui/separator";
import { Step, StepLabel, Stepper } from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { WiMoonFull } from "react-icons/wi";
import styles from "./OrderDetails.module.css";
import { useGetOrderByIdQuery } from "@/features/api/orderApi";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 30px)",
    right: "calc(50% + 30px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "green",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "green",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "gray",
    borderTopWidth: 4,
    borderRadius: 2,
    ...theme.applyStyles("dark", {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme }) => ({
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    "& .QontoStepIcon-completedIcon": {
      color: "green",
      zIndex: 1,
      fontSize: 28,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[700],
    }),
    variants: [
      {
        props: ({ ownerState }) => ownerState.active,
        style: {
          color: "green",
        },
      },
    ],
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed || active ? (
        <FaCheck className="QontoStepIcon-completedIcon my-2" />
      ) : (
        <WiMoonFull className="mt-[3px] text-xl" />
      )}
    </QontoStepIconRoot>
  );
}

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  const [activeStep, setActiveStep] = useState<number>();
  const [steps, setSteps] = useState<string[]>([
    "Order Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ]);

  const getSteps = (
    status: "Pending" | "Shipped" | "Delivered" | "Out for Delivery"
  ) => {
    switch (status) {
      case "Pending":
        setActiveStep(0);
        break;
      case "Shipped":
        setActiveStep(1);
        break;
      case "Out for Delivery":
        setActiveStep(2);
        break;
      case "Delivered":
        setActiveStep(3);
        break;
    }
  };
  const { isLoading, data } = useGetOrderByIdQuery(params.orderId);

  console.log(data);
  useEffect(() => {
    if (!data) return;
    if (!data?.order?.orderId) return;
    if (data.order.status !== "Cancelled") {
      getSteps(data.order.status);
    } else {
      setSteps(["Order Confirmed", "Cancelled"]);
      setActiveStep(1);
    }
  }, [data]);

  if (isLoading) {
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
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-[#eeeeee] min-h-screen p-5 pt-10 gap-6 flex flex-col w-full">
        <div className="flex flex-col bg-white justify-between p-5 rounded-lg container mx-auto">
          <div className="flex justify-between mt-3 mb-6 h-[110px]">
            <div className={styles.group}>
              {data?.order?.items.map((item) => (
                <Image
                  key={item._id}
                  className={`${styles.item} rounded-md min-h-[100px] max-h-[100px] max-w-[100px] min-w-[100px]`}
                  src={item.thumbnail}
                  alt={item.brand}
                  height={100}
                  width={100}
                />
              ))}
              {data?.order?.items && data?.order?.items.length > 3 && (
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-400 h-8 w-8 flex items-center justify-center z-[5] rounded-full">
                  <p className="text-white">+{data?.order?.items.length - 3}</p>
                </span>
              )}
            </div>

            <div className="flex items-center">
              <p className="text-xl text-green-700 font-bold">
                ₹{data?.order?.finalPrice}
              </p>
            </div>
          </div>

          <Separator />

          <Stepper
            connector={<QontoConnector />}
            activeStep={activeStep}
            alternativeLabel
            className="w-full mt-10 mb-8"
          >
            {steps.map((step: string) => (
              <Step key={step}>
                <StepLabel
                  StepIconComponent={QontoStepIcon}
                  error={step === "Cancelled"}
                >
                  <p
                    className={`${
                      step === "Order Confirmed"
                        ? "text-green-700 font-bold"
                        : ""
                    }`}
                  >
                    {step}
                  </p>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        <div className="flex bg-white flex-col justify-between p-5 rounded-lg container mx-auto">
          <div className="flex flex-col gap-2 text-lg font-semibold">
            <p>
              Ordered On: {new Date(data?.order?.orderDate!).toDateString()}
            </p>
            {data?.order?.deliveredOn && (
              <p>Delivered On: {data?.order?.deliveredOn.toDateString()}</p>
            )}
            <p>Payment Method: {data?.order?.paymentMethod}</p>
          </div>
        </div>

        <div className="flex bg-white flex-col justify-between p-5 rounded-lg container mx-auto">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="flex flex-col mt-3 gap-1">
            <div className="flex justify-between">
              <p>Item(s) Subtotal: </p>
              <p>₹{data?.order?.totalPrice}</p>
            </div>

            <div className="flex justify-between">
              <p>Delivery Charges:</p>
              <p>
                ₹
                {data?.order?.deliveryCharges
                  ? data?.order?.deliveryCharges > 0
                    ? data?.order?.deliveryCharges
                    : 0
                  : 0}
              </p>
            </div>

            <div className="flex justify-between">
              <p>Platform Fee: </p>
              <p>
                ₹
                {data?.order?.platformFee
                  ? data?.order?.platformFee > 0
                    ? data?.order?.platformFee
                    : 0
                  : 0}
              </p>
            </div>

            {data?.order?.discount && (
              <div className="flex justify-between">
                <p>Discount: </p>
                <p className="text-green-700 font-semibold">
                  - ₹{data?.order?.discount}
                </p>
              </div>
            )}
            <div className="flex text-lg justify-between">
              <p>Grand Total: </p>
              <p className="font-semibold">₹{data?.order?.finalPrice}</p>
            </div>
          </div>
        </div>

        <div className="flex bg-white flex-col justify-between p-5 rounded-lg container mx-auto">
          <h2 className="font-bold text-xl">Delivery Address</h2>
          <div className="flex flex-col mt-4">
            <p className="font-semibold">
              {data?.order?.deliveryAddress.firstName}{" "}
              {data?.order?.deliveryAddress.lastName}
            </p>

            <p>
              {data?.order?.deliveryAddress.street}
              {data?.order?.deliveryAddress.landmark && ","}{" "}
              {data?.order?.deliveryAddress.landmark}
              {data?.order?.deliveryAddress.appartment && ", "}
              {data?.order?.deliveryAddress.appartment}
            </p>
            <p>
              {data?.order?.deliveryAddress.city},{" "}
              {data?.order?.deliveryAddress.state} -
              <span className="font-semibold ml-2">
                {data?.order?.deliveryAddress.postalCode}
              </span>
            </p>
            <div className="flex flex-col mt-2">
              <p className="font-semibold">Phone Number</p>
              <p>
                {data?.order?.deliveryAddress.phoneNumber}
                {data?.order?.deliveryAddress.phoneNumber &&
                  data?.order?.deliveryAddress.alternatePhoneNumber &&
                  ", "}
                {data?.order?.deliveryAddress.alternatePhoneNumber}
              </p>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-col bg-white justify-between p-5 rounded-lg container mx-auto">
          <h2 className="mt-6 ml-2 text-xl font-bold">
            {data?.order?.itemCount} ( item
            {data?.order?.itemCount && data?.order?.itemCount > 1 ? "s" : ""})
          </h2>

          <div className="flex flex-col gap-3 py-4 mt-3">
            {data?.order?.items.map((item) => {
              let discount = 0;
              if (item.unitDiscount) {
                if (item.unitDiscount.discountType === "Percentage") {
                  discount = Math.floor(
                    (item.unitPrice * item.unitDiscount.value) / 100
                  );
                } else {
                  discount = item.unitDiscount.value;
                }
              }
              return (
                <div className="flex bg-gray-50 gap-3 p-2">
                  <Image
                    alt={item.brand}
                    src={item.thumbnail}
                    height={150}
                    width={150}
                  />

                  <div className="flex flex-col p-2">
                    <p className="text-xs uppercase font-semibold text-gray-500">
                      {item.brand}
                    </p>
                    <p>{item.title}</p>
                    <p className="text-xs mt-1">
                      {item.color}
                      {item.color && item.size && ", "} {item.size}
                    </p>
                    <div className="flex gap-4 font-semibold mt-2">
                      <p>
                        ₹
                        {item.unitPrice * item.quantity -
                          item.quantity * discount}
                      </p>
                      <span>
                        ({item.quantity} item{item.quantity > 1 ? "s" : ""})
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
