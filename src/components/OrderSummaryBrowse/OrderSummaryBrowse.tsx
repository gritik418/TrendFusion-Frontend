import { OrderDetails } from "@/app/checkout/cart/page";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import OrderSummaryItemBrowse from "../OrderSummaryItemBrowse/OrderSummaryItemBrowse";
import { Separator } from "../ui/separator";

type Item = { product: CartItem; quantity: number };

const OrderSummaryBrowse = ({
  setActiveStep,
  setOrderDetails,
  setQuantity,
  quantity,
  cart,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
  cart: Cart | undefined;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  setOrderDetails: Dispatch<SetStateAction<OrderDetails | null>>;
}) => {
  if (!cart) {
    return (
      <div className="flex">
        <p>Cart not found.</p>
      </div>
    );
  }

  const items = cart.items.map((item) => {
    return {
      _id: item.product._id,
      brand: item.product.brand,
      quantity: item.quantity,
      thumbnail: item.product.thumbnail,
      title: item.product.title,
      unitPrice: item.product.price,
      color: item.product.color?.colorName,
      size: item.product.size,
      unitDiscount: item.product.discount,
    };
  });

  useEffect(() => {
    setOrderDetails((prev) => ({
      deliveryAddress: prev?.deliveryAddress,
      expectedDeliveryDate: prev?.expectedDeliveryDate,
      isLoggedIn: prev?.isLoggedIn,
      paymentMethod: prev?.paymentMethod,
      discount: cart.discount,
      finalPrice: cart.finalPrice,
      itemCount: cart.totalQuantity,
      totalQuantity: cart.totalQuantity,
      totalPrice: cart.totalPrice,
      items: items,
    }));
  }, [quantity]);

  const checkDisabled = (): boolean => {
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <h1 className="text-4xl mb-2">Order Summary</h1>
      <Separator />

      <div className="flex flex-col gap-4 mt-8">
        {cart &&
          cart?.items.map(({ product }: Item) => (
            <OrderSummaryItemBrowse
              key={product?._id}
              setQuantity={setQuantity}
              item={product}
              quantity={quantity || 1}
            />
          ))}
      </div>

      <div className="flex justify-between mt-8">
        <FaArrowCircleLeft
          onClick={() => setActiveStep(1)}
          className="text-4xl text-green-700 cursor-pointer"
        />
        {!checkDisabled() && (
          <FaArrowCircleRight
            onClick={() => setActiveStep(3)}
            className="text-4xl text-green-700 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default OrderSummaryBrowse;
