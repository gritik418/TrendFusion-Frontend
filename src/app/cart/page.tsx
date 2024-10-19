import CartItem from "@/components/CartItem/CartItem";
import Navbar from "@/components/Navbar/Navbar";
import { Separator } from "@/components/ui/separator";
import React from "react";

const products: Product[] = [
  {
    productId: "1A2B3C",
    title: "Super Sound Wireless Earbuds",
    brand: "SoundMax",
    description:
      "Experience high-quality sound and seamless connectivity with our latest wireless earbuds.",
    thumbnail:
      "https://m.media-amazon.com/images/I/51fKmbuf5+L._AC_SY300_SX300_.jpg",
    isAvailable: true,
    images: [
      "https://m.media-amazon.com/images/I/71652WdL3pL._AC_SX679_.jpg",
      "https://m.media-amazon.com/images/I/51fKmbuf5+L._AC_SY300_SX300_.jpg",
    ],
    category: "Audio",
    price: 79.99,
    warranty: "1 year",
    discount: {
      discountType: "Percentage",
      value: 10,
      description: "Limited time offer",
    },
    rating: 4.5,
    stock: 150,
    color: {
      colorName: "Black",
      colorImage:
        "https://m.media-amazon.com/images/I/71652WdL3pL._AC_SX679_.jpg",
    },
    size: "N/A",
    highlights: [
      "Bluetooth 5.0",
      "24-hour battery life",
      "IPX7 water-resistant",
    ],
    specifications: {
      Audio: {
        frequencyRange: "20Hz - 20kHz",
        impedance: "32 Ohms",
      },
      Battery: {
        life: "6 hours",
        chargingTime: "1 hour",
      },
    },
    offers: [
      {
        offerType: "Buy One Get One",
        offer: "Yes",
      },
    ],
  },
  {
    productId: "4D5E6F",
    title: "Ultra Smart Fitness Watch",
    brand: "FitTrack",
    description:
      "Track your fitness goals with our feature-packed smartwatch, equipped with heart rate monitoring and GPS.",
    thumbnail:
      "https://m.media-amazon.com/images/I/71Nd69-7YiL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    isAvailable: true,
    images: [
      "https://m.media-amazon.com/images/I/71Nd69-7YiL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/71LyWQ1NxFL._AC_SX679_.jpg",
    ],
    category: "Wearables",
    price: 149.99,
    warranty: "2 years",
    discount: {
      discountType: "Percentage",
      value: 15,
      description: "Holiday sale",
    },
    rating: 4.8,
    stock: 80,
    color: {
      colorName: "Silver",
      colorImage:
        "https://m.media-amazon.com/images/I/71Nd69-7YiL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    },
    size: "Medium",
    highlights: [
      "Heart rate monitoring",
      "Water-resistant up to 50m",
      "GPS tracking",
    ],
    specifications: {
      Display: {
        size: "1.5 inches",
        type: "LCD",
      },
      Battery: {
        life: "10 days",
        chargingTime: "2 hours",
      },
    },
    offers: [
      {
        offerType: "Free Shipping",
        offer: "Yes",
      },
    ],
  },
];

const Cart = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-[#eeeeee] p-5 pt-10 gap-6 flex flex-col lg:flex-row w-full">
        <div className="bg-white flex flex-col w-full lg:w-4/6">
          <div className="p-4">
            <h1 className="text-3xl font-normal mb-3">Shopping Cart</h1>
            <Separator />
          </div>

          <div className="p-4">
            {products.map((product: Product) => (
              <CartItem key={product.productId} product={product} />
            ))}
          </div>
        </div>

        <div className="bg-white w-full lg:w-2/6 h-max">
          <div className="p-4">
            <h2 className="uppercase text-2xl mb-3 text-gray-400 font-bold">
              Price Details
            </h2>
            <Separator />
          </div>
          <div className="flex flex-col px-6 gap-3">
            <div className="flex justify-between">
              <p className="text-sm sm:text-lg">Price (1 item)</p>
              <p className="text-sm sm:text-lg font-semibold">
                ₹{products[0].price}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm sm:text-lg">Discount</p>
              <p className="text-sm sm:text-lg font-semibold text-green-600">
                - ₹{products[0].discount?.value}
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
            <Separator />

            <div className="flex my-2 items-center justify-end">
              <button className="text-lg text-white font-semibold bg-[var(--secondary-color)] py-3 px-5 rounded-md mb-4">
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
