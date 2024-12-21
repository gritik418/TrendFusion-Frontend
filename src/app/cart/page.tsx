"use client";
import CartItem from "@/components/CartItem/CartItem";
import EmptyCart from "@/components/EmptyCart/EmptyCart";
import Navbar from "@/components/Navbar/Navbar";
import { Separator } from "@/components/ui/separator";
import { useGetCartQuery } from "@/features/api/cartApi";
import { selectUser } from "@/features/user/userSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Cart = () => {
  const user: User = useSelector(selectUser);
  const router = useRouter();
  const { isLoading, data } = useGetCartQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <Navbar />
        <div className="bg-[#eeeeee] p-5 pb-4 pt-10 h-screen">
          <div className="bg-white h-full p-3 w-full flex items-center justify-center flex-col gap-3">
            <Image
              src={"/images/loading.gif"}
              alt="loading"
              height={140}
              width={140}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!user._id)
    return (
      <div className="bg-[#eeeeee] min-h-screen">
        <Navbar />

        <div className="p-5 pt-10 gap-6 flex flex-col lg:flex-row container m-auto">
          <div className="bg-white flex items-center py-8 justify-center flex-col w-full min-h-[40vh]">
            <Image
              src={"/images/cart-no-login.png"}
              alt="img"
              height={220}
              width={220}
            />
            <p className="text-2xl mb-2">Missing Cart items?</p>
            <p className="mb-8">Login to see the items you added previously.</p>

            <Link
              href={"/login"}
              className="text-2xl font-semibold rounded-md bg-[var(--secondary-color)] py-2 px-6 text-white"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );

  const sortedCartItems = data?.cart?.items?.toSorted((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const handleProceedToBuy = () => {
    router.push("/checkout/cart");
  };

  const checkDisabled = (): boolean => {
    if (!data?.cart?.items) {
      return true;
    }
    for (const item of data?.cart?.items) {
      if (item.product.stock < item.quantity) {
        return true;
      }
    }
    return false;
  };

  checkDisabled();

  return (
    <>
      {data && data.cart && data.cart.totalQuantity > 0 ? (
        <div className="min-h-screen">
          <Navbar />

          <div className="bg-[#eeeeee] min-h-screen p-5 pt-10 gap-6 flex flex-col w-full">
            <div className="flex bg-white p-5 rounded-lg">
              <h1 className="text-3xl font-semibold">
                Shopping Bag{" "}
                <span className="text-xl font-normal text-gray-500">
                  ({data.cart.totalQuantity} item
                  {data.cart.totalQuantity > 1 ? "s" : ""})
                </span>
              </h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="bg-white h-max flex flex-col w-full lg:w-4/6 rounded-lg">
                <div className="p-4">
                  {sortedCartItems &&
                    sortedCartItems.map(({ product, quantity }: any) => (
                      <CartItem
                        key={product._id}
                        product={product}
                        quantity={quantity}
                      />
                    ))}
                </div>
              </div>

              <div className="bg-white w-full lg:w-2/6 h-max rounded-lg">
                <div className="p-4">
                  <h2 className="uppercase text-2xl mb-3 text-gray-400 font-bold">
                    Order Summary
                  </h2>
                  <Separator />
                </div>
                <div className="flex flex-col px-6 gap-3">
                  <div className="flex justify-between">
                    <p className="text-sm sm:text-lg">
                      Price ({data.cart.totalQuantity} item
                      {data.cart.totalQuantity > 1 ? "s" : ""})
                    </p>
                    <p className="text-sm sm:text-lg font-semibold">
                      ₹{data.cart.totalPrice}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm sm:text-lg">Discount</p>
                    <p className="text-sm sm:text-lg font-semibold text-green-600">
                      - ₹{data.cart?.discount}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm sm:text-lg">Platform Fee</p>
                    {data.cart?.platformFee ? (
                      <p className="text-sm sm:text-lg font-semibold">
                        ₹{data.cart.platformFee}
                      </p>
                    ) : (
                      <p className="text-sm sm:text-lg text-green-600 font-semibold">
                        Free
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm sm:text-lg">Delivery Charges</p>
                    {data.cart?.deliveryCharges ? (
                      <p className="text-sm sm:text-lg font-semibold">
                        ₹{data.cart.deliveryCharges}
                      </p>
                    ) : (
                      <p className="text-sm sm:text-lg text-green-600 font-semibold">
                        Free
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between my-2">
                    <p className="text-lg sm:text-xl font-bold">Total Amount</p>
                    <p className="text-lg sm:text-xl font-bold">
                      ₹{data.cart.finalPrice}
                    </p>
                  </div>

                  {data.cart.discount && (
                    <p className="text-sm text-green-600 font-bold mb-4">
                      You will save ₹{data.cart?.discount} on this order
                    </p>
                  )}
                  <Separator />

                  <div className="flex my-2 items-center flex-col justify-end">
                    <button
                      disabled={checkDisabled()}
                      onClick={handleProceedToBuy}
                      className="text-lg disabled:bg-[var(--medium-color)] w-full text-white font-semibold bg-[var(--secondary-color)] py-3 px-5 rounded-full"
                    >
                      Proceed to Buy
                    </button>
                    {checkDisabled() ? (
                      <div className="font-bold text-xs text-red-400">
                        Item not in stock, remove to proceed.
                      </div>
                    ) : null}

                    <Link
                      href={"/"}
                      className="mt-4 text-lg text-center w-full text-black font-semibold bg-gray-200 py-3 px-5 rounded-full mb-4"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
