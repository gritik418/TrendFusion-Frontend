import Image from "next/image";
import { Separator } from "../ui/separator";
import { FaStar, FaTrash } from "react-icons/fa";
import Link from "next/link";

const WishlistItem = ({ item }: { item: WishlistItem }) => {
  return (
    <Link href={`/product/${item.productId}`}>
      <div className="gap-3 flex p-2 mb-2 justify-between hover:bg-[var(--light-color)]">
        <div className="flex gap-3">
          <div className="flex bg-white min-w-[120px] items-center justify-center">
            <Image
              className="h-[120px] max-w-[120px] w-auto"
              src={item.thumbnail}
              height={120}
              width={120}
              alt=""
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-gray-400 font-semibold uppercase text-sm">
                {item.brand}
              </p>
              <p className="text-lg">{item.title}</p>
              <div className="flex w-max items-center gap-2 mt-1 bg-green-700 text-white px-1 py-0 rounded-sm">
                <p className="text-sm font-semibold">{item.rating}</p>
                <FaStar className="text-sm" />
              </div>
            </div>

            <div className="flex items-end">
              <span className="text-xl">₹</span>
              {item.discount ? (
                <p className="text-2xl font-semibold">
                  {item.discount.discountType === "Percentage"
                    ? Math.floor(
                        item.price - (item.price * item.discount?.value!) / 100
                      )
                    : Math.floor(item.price - item.discount.value)}
                </p>
              ) : (
                <p className="text-2xl font-semibold">{item.price}</p>
              )}

              {item.discount && (
                <p className="text-lg text-gray-500 font-normal mx-3">
                  <span className="line-through">₹{item.price}</span>
                </p>
              )}

              {item.discount && (
                <p className="text-xl text-green-600 font-semibold">
                  {item.discount?.value}% Off
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100 h-10 w-10 flex items-center justify-center rounded-full">
            <FaTrash />
          </div>
        </div>
      </div>
      <Separator />
    </Link>
  );
};

export default WishlistItem;
