import { Separator } from "@/components/ui/separator";
import WishlistItem from "@/components/WishlistItem/WishlistItem";
import React from "react";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const wishlistItems: WishlistItem[] = [
  {
    productId: "P001",
    title: "Wireless Headphones",
    brand: "SoundWave",
    thumbnail: "https://m.media-amazon.com/images/I/71VR6c3j2bL._SX679_.jpg",
    isAvailable: true,
    price: 89.99,
    discount: {
      discountType: "Percentage",
      value: 15,
      description: "15% off for a limited time",
    },
    rating: 4.5,
    stock: 25,
  },
  {
    productId: "P002",
    title: "Smartwatch",
    brand: "TechTime",
    thumbnail: "https://m.media-amazon.com/images/I/61GdCtUjrLL._SX679_.jpg",
    isAvailable: true,
    price: 199.99,
    discount: {
      discountType: "Percentage",
      value: 10,
      description: "10% discount for new customers",
    },
    rating: 4.2,
    stock: 10,
  },
  {
    productId: "P003",
    title: "Yoga Mat",
    brand: "FlexFit",
    thumbnail:
      "https://m.media-amazon.com/images/I/41ILvWZvb1L._SX300_SY300_QL70_FMwebp_.jpg",
    isAvailable: true,
    price: 29.99,
    rating: 4.7,
    stock: 50,
  },
  {
    productId: "P004",
    title: "Gaming Mouse",
    brand: "GamerPro",
    thumbnail: "https://m.media-amazon.com/images/I/51hZtBRUFBL._SX679_.jpg",
    isAvailable: false,
    price: 59.99,
    rating: 4.8,
    stock: 0,
  },
  {
    productId: "P005",
    title: "Bluetooth Speaker",
    brand: "SoundMax",
    thumbnail:
      "https://m.media-amazon.com/images/I/31XlCnKg-ES._SX300_SY300_QL70_FMwebp_.jpg",
    isAvailable: true,
    price: 49.99,
    discount: {
      discountType: "Percentage",
      value: 20,
      description: "20% off during the sale",
    },
    rating: 4.3,
    stock: 30,
  },
  {
    productId: "P006",
    title: "Electric Kettle",
    brand: "HomeEssentials",
    thumbnail:
      "https://m.media-amazon.com/images/I/31iKMkOV-DL._SX300_SY300_QL70_FMwebp_.jpg",
    isAvailable: true,
    price: 39.99,
    rating: 4.1,
    stock: 15,
  },
  {
    productId: "P007",
    title: "Portable Charger",
    brand: "ChargeIt",
    thumbnail: "https://m.media-amazon.com/images/I/51dij2R2GVL._SX679_.jpg",
    isAvailable: true,
    price: 24.99,
    rating: 4.5,
    stock: 60,
  },
  {
    productId: "P008",
    title: "Coffee Maker",
    brand: "BrewMaster",
    thumbnail:
      "https://m.media-amazon.com/images/I/51CG7fT4ShL._AC_UY436_FMwebp_QL65_.jpg",
    isAvailable: true,
    price: 89.99,
    discount: {
      discountType: "Fixed",
      value: 5,
      description: "Get $5 off your first purchase",
    },
    rating: 4.6,
    stock: 20,
  },
  {
    productId: "P009",
    title: "Electric Toothbrush",
    brand: "BrightSmile",
    thumbnail:
      "https://m.media-amazon.com/images/I/41h32m9AhyL._SX300_SY300_QL70_FMwebp_.jpg",
    isAvailable: true,
    price: 59.99,
    rating: 4.4,
    stock: 40,
  },
  {
    productId: "P010",
    title: "Fitness Tracker",
    brand: "HealthPro",
    thumbnail: "https://m.media-amazon.com/images/I/71yYUKOQEeL._SX679_.jpg",
    isAvailable: true,
    price: 79.99,
    discount: {
      discountType: "Percentage",
      value: 25,
      description: "25% off this week only",
    },
    rating: 4.0,
    stock: 35,
  },
];

const Wishlist = () => {
  return (
    <div className="w-full">
      <div className="w-full mb-6">
        <h1 className="text-3xl mb-3">My Wishlist</h1>
        <Separator />
      </div>

      {wishlistItems ? (
        <div className="flex flex-col gap-2">
          {wishlistItems.map((item: WishlistItem) => (
            <WishlistItem key={item.productId} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex items-center w-full justify-center py-16">
          <HiOutlineClipboardDocumentList className="text-8xl" />
          <div className="flex flex-col">
            <p className="text-lg">There are no items in this List.</p>
            <p className="text-lg">Add items you want to shop for.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
