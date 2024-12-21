import Image from "next/image";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";

const EmptyCart = () => {
  return (
    <div className="bg-[#eeeeee] min-h-screen">
      <Navbar />

      <div className="p-5 pt-10 gap-6 flex flex-col lg:flex-row container m-auto">
        <div className="bg-white flex items-center py-8 justify-center flex-col w-full min-h-[40vh]">
          <Image
            src={"/images/empty-cart.png"}
            alt="img"
            height={220}
            width={220}
          />
          <p className="text-2xl mb-2">Your cart is empty!</p>
          <p className="mb-8">Add items to it now.</p>

          <Link
            href={"/"}
            className="text-2xl font-semibold rounded-md bg-[var(--secondary-color)] py-2 px-6 text-white"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
