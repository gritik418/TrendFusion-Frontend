import ImageSlider from "@/components/ImageSlider/ImageSlider";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import React from "react";

const product: Product = {
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
  color: "Black",
  size: "N/A",
  highlights: ["Bluetooth 5.0", "24-hour battery life", "IPX7 water-resistant"],
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
  offers: {
    buyOneGetOne: "Yes",
  },
};

const Product = ({ params }: { params: { productId: string } }) => {
  console.log(params.productId);
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-[#eeeeee] p-5 pt-10">
        <div className="bg-white w-full">
          <div className="border-2 w-full md:w-6/12 lg:w-5/12">
            <ImageSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
