import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { CiTrash } from "react-icons/ci";

const OrderSummaryItemBrowse = ({
  item,
  quantity,
  setQuantity,
}: {
  item: CartItem;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}) => {
  const router = useRouter();
  let discountedPrice: number = item?.price;
  if (item?.discount?.discountType === "Fixed") {
    discountedPrice = Math.floor(item?.price - item?.discount.value);
  }
  if (item?.discount?.discountType === "Percentage") {
    let discountValue = Math.floor((item?.price * item?.discount.value) / 100);
    discountedPrice = Math.floor(item?.price - discountValue);
  }

  const handleIncrementQuantity = async () => {
    setQuantity(() => quantity + 1);
  };

  const handleDecrementQuantity = async () => {
    setQuantity(() => quantity - 1);
  };

  const handleRemoveFromCart = async () => {
    router.push("/");
  };

  return (
    <div className="border-b-2 flex flex-col sm:flex-row gap-4 pb-3">
      <div className="flex items-center h-auto justify-center w-full min-w-[220px]">
        <Image
          className="h-auto w-full"
          src={item?.thumbnail}
          alt="img"
          height={200}
          width={200}
        />
      </div>

      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col justify-start mb-4">
          <div className="flex flex-col">
            <p className="uppercase text-gray-400 text-sm font-bold">
              {item?.brand}
            </p>
            <p className="text-xl">{item?.title}</p>
            <p className="text-sm text-gray-400 font-semibold">
              {item?.color?.colorName}
              {item?.color && item?.size && ","} {item?.size}
            </p>
          </div>

          {item?.discount ? (
            item?.discount?.discountType === "Percentage" ? (
              <div className="flex flex-col mt-1">
                <div className="flex items-end gap-3">
                  <p className="text-gray-500 line-through">
                    M.R.P. {item?.price * quantity}
                  </p>
                  <p className="text-2xl">
                    <span className="text-lg">₹</span>
                    {Math.floor(
                      item.price - (item.price * item.discount?.value!) / 100
                    ) * quantity}
                  </p>
                </div>
                <p className="text-green-600 font-bold">
                  {item?.discount?.value}% Off
                </p>
              </div>
            ) : (
              <div className="flex flex-col mt-1">
                <div className="flex items-end gap-3">
                  <p className="text-gray-500 line-through">
                    M.R.P. {item?.price * quantity}
                  </p>
                  <p className="text-2xl">
                    <span className="text-lg">₹</span>
                    {(item?.price - item.discount.value) * quantity}
                  </p>
                </div>
                <p className="text-green-600 font-bold">
                  ₹{item?.discount?.value * quantity} Off
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-col mt-1">
              <div className="flex items-end gap-3">
                <p className="text-2xl">
                  <span className="text-lg">₹</span>
                  {item?.price}
                </p>
              </div>
            </div>
          )}
        </div>

        {item.stock < quantity ? (
          <p className="text-red-500 font-bold">Stock not available.</p>
        ) : null}

        <div className="flex mt-3 justify-between items-center gap-4">
          <div className="flex items-center">
            <button
              disabled={quantity <= 1}
              onClick={handleDecrementQuantity}
              className="border-2 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-none m-1 w-10 h-10 flex items-center justify-center bg-gray-300 rounded-md"
            >
              -
            </button>
            <p className="px-4">{quantity}</p>
            <button
              disabled={item.stock <= quantity}
              onClick={handleIncrementQuantity}
              className="border-2 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-none m-1 w-10 h-10 flex items-center justify-center bg-gray-300 rounded-md"
            >
              +
            </button>
          </div>

          <button
            onClick={handleRemoveFromCart}
            className="text-sm p-2 w-28 font-semibold flex items-center justify-center gap-1 bg-gray-100 px-4 rounded-lg uppercase"
          >
            <CiTrash className="text-lg" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryItemBrowse;
