"use client";
import CheckLogin from "@/components/CheckLogin/CheckLogin";
import Navbar from "@/components/Navbar/Navbar";
import OrderSummaryBrowse from "@/components/OrderSummaryBrowse/OrderSummaryBrowse";
import PaymentOptions from "@/components/PaymentOptions/PaymentOptions";
import ShippingAddress from "@/components/ShippingAddress/ShippingAddress";
import CustomizedSteppers from "@/components/Stepper/Stepper";
import { Separator } from "@/components/ui/separator";
import {
  getProductByIdAsync,
  selectProduct,
  selectProductLoading,
} from "@/features/product/productSlice";
import { selectUser } from "@/features/user/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderDetails } from "../../cart/page";

export interface BrowseItem {
  deliveryCharges: number;
  discount: number;
  finalPrice: number;
  platformFee: number;
  totalPrice: number;
  totalQuantity: number;
  userId: string;
  items: { product: CartItem; quantity: number; updatedAt: Date }[];
}

const CheckoutBrowse = ({ params }: { params: { productId: string } }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>({
    expectedDeliveryDate: new Date(
      "Tue Dec 24 2024 00:00:00 GMT+0530 (India Standard Time)"
    ),
  });
  const dispatch = useDispatch<Dispatch<any>>();
  const product: Product = useSelector(selectProduct);
  const loading = useSelector(selectProductLoading);
  const user: User = useSelector(selectUser);
  const [quantity, setQuantity] = useState<number>(1);
  const [item, setItem] = useState<BrowseItem>({
    userId: user._id,
    deliveryCharges: 0,
    discount: 0,
    finalPrice: 0,
    items: [],
    platformFee: 0,
    totalPrice: 0,
    totalQuantity: 0,
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
      <OrderSummaryBrowse
        setOrderDetails={setOrderDetails}
        setActiveStep={setActiveStep}
        setQuantity={setQuantity}
        cart={item}
        quantity={quantity}
      />
    ),
    3: (
      <PaymentOptions
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
        setActiveStep={setActiveStep}
        items={item}
      />
    ),
  };

  useEffect(() => {
    dispatch(getProductByIdAsync(params.productId));
  }, []);

  useEffect(() => {
    if (!user || !product) return;
    let discount = 0;
    let finalPrice = product.price * quantity;
    if (product.discount) {
      if (product.discount.discountType === "Percentage") {
        discount =
          Math.floor((product.price * product.discount.value) / 100) * quantity;
      } else {
        discount = product.discount.value * quantity;
      }
      finalPrice = finalPrice - discount;
    }

    let browseItem: BrowseItem = {
      deliveryCharges: 0,
      discount,
      finalPrice,
      items: [
        {
          product: {
            _id: product._id,
            brand: product.brand || "",
            price: product.price,
            productId: product.productId,
            quantity: quantity,
            stock: product.stock,
            thumbnail: product.thumbnail,
            title: product.title,
            color: product.color,
            discount: product.discount,
            size: product.size,
          },
          quantity: quantity,
          updatedAt: new Date(),
        },
      ],
      platformFee: 0,
      totalPrice: product.price * quantity,
      totalQuantity: quantity,
      userId: user._id,
    };
    setItem(browseItem);

    let order: OrderDetails = {
      deliveryAddress: orderDetails?.deliveryAddress,
      expectedDeliveryDate: orderDetails?.expectedDeliveryDate,
      isLoggedIn: orderDetails?.isLoggedIn,
      paymentMethod: orderDetails?.paymentMethod,
      discount,
      finalPrice,
      itemCount: quantity,
      items: [
        {
          brand: product.brand || "",
          color: product.color?.colorName,
          quantity: quantity,
          size: product.size,
          thumbnail: product.thumbnail,
          title: product.title,
          unitPrice: product.price,
          unitDiscount: product.discount,
          _id: product._id,
        },
      ],
      totalPrice: product.price * quantity,
      totalQuantity: quantity,
    };
    setOrderDetails(() => order);
  }, [user, product, quantity]);

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
          {product?.price ? (
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

          {item?.finalPrice ? (
            <div className="bg-white w-full lg:w-2/6 h-max rounded-lg">
              <div className="flex flex-col p-6 gap-3">
                <div className="flex justify-between">
                  <p className="text-sm sm:text-lg">
                    Price ({item?.totalQuantity}{" "}
                    {item?.totalQuantity
                      ? item?.totalQuantity > 1
                        ? "items"
                        : "item"
                      : ""}
                    )
                  </p>
                  <p className="text-sm sm:text-lg font-semibold">
                    ₹{item?.totalPrice}
                  </p>
                </div>
                {item?.discount && (
                  <div className="flex justify-between">
                    <p className="text-sm sm:text-lg">Discount</p>
                    <p className="text-sm sm:text-lg font-semibold text-green-600">
                      - ₹{item?.discount}
                    </p>
                  </div>
                )}
                <div className="flex justify-between">
                  <p className="text-sm sm:text-lg">Platform Fee</p>
                  <p className="text-sm sm:text-lg font-semibold">
                    ₹{item?.platformFee}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm sm:text-lg">Delivery Charges</p>
                  {item?.deliveryCharges === 0 || !item?.deliveryCharges ? (
                    <p className="text-sm sm:text-lg font-semibold text-green-600">
                      Free
                    </p>
                  ) : (
                    <p className="text-sm sm:text-lg font-semibold">
                      ₹{item?.deliveryCharges}
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between my-2">
                  <p className="text-lg sm:text-xl font-bold">Total Amount</p>
                  <p className="text-lg sm:text-xl font-bold">
                    ₹{item?.finalPrice}
                  </p>
                </div>

                {item?.discount && (
                  <p className="text-sm text-green-600 font-bold mb-4">
                    You will save ₹{item?.discount} on this order
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

export default CheckoutBrowse;
