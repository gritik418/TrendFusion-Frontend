"use client";
import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";
import AdminProductItem from "@/components/AdminProductItem/AdminProductItem";
import { CiSearch } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";
import { MdSort } from "react-icons/md";
import styles from "./Products.module.css";
import { useSearchParams } from "next/navigation";

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
    specifications: [
      {
        category: "Audio",
        specs: [
          {
            frequencyRange: "20Hz - 20kHz",
          },
          {
            impedance: "32 Ohms",
          },
        ],
      },
      {
        category: "Battery",
        specs: [
          {
            life: "6 hours",
          },
          {
            chargingTime: "1 hour",
          },
        ],
      },
    ],
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
    specifications: [
      {
        category: "Display",
        specs: [
          {
            size: "1.5 inches",
          },
          {
            type: "LCD",
          },
        ],
      },
      {
        category: "Battery",
        specs: [
          {
            life: "10 days",
          },
          {
            chargingTime: "2 hours",
          },
        ],
      },
    ],
    offers: [
      {
        offerType: "Free Shipping",
        offer: "Yes",
      },
    ],
  },
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
    specifications: [
      {
        category: "Audio",
        specs: [
          {
            frequencyRange: "20Hz - 20kHz",
          },
          {
            impedance: "32 Ohms",
          },
        ],
      },
      {
        category: "Battery",
        specs: [
          {
            life: "6 hours",
          },
          {
            chargingTime: "1 hour",
          },
        ],
      },
    ],
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
    specifications: [
      {
        category: "Display",
        specs: [
          {
            size: "1.5 inches",
          },
          {
            type: "LCD",
          },
        ],
      },
      {
        category: "Battery",
        specs: [
          {
            life: "10 days",
          },
          {
            chargingTime: "2 hours",
          },
        ],
      },
    ],
    offers: [
      {
        offerType: "Free Shipping",
        offer: "Yes",
      },
    ],
  },
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
    specifications: [
      {
        category: "Audio",
        specs: [
          {
            frequencyRange: "20Hz - 20kHz",
          },
          {
            impedance: "32 Ohms",
          },
        ],
      },
      {
        category: "Battery",
        specs: [
          {
            life: "6 hours",
          },
          {
            chargingTime: "1 hour",
          },
        ],
      },
    ],
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
    specifications: [
      {
        category: "Display",
        specs: [
          {
            size: "1.5 inches",
          },
          {
            type: "LCD",
          },
        ],
      },
      {
        category: "Battery",
        specs: [
          {
            life: "10 days",
          },
          {
            chargingTime: "2 hours",
          },
        ],
      },
    ],
    offers: [
      {
        offerType: "Free Shipping",
        offer: "Yes",
      },
    ],
  },
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
    specifications: [
      {
        category: "Audio",
        specs: [
          {
            frequencyRange: "20Hz - 20kHz",
          },
          {
            impedance: "32 Ohms",
          },
        ],
      },
      {
        category: "Battery",
        specs: [
          {
            life: "6 hours",
          },
          {
            chargingTime: "1 hour",
          },
        ],
      },
    ],
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
    specifications: [
      {
        category: "Display",
        specs: [
          {
            size: "1.5 inches",
          },
          {
            type: "LCD",
          },
        ],
      },
      {
        category: "Battery",
        specs: [
          {
            life: "10 days",
          },
          {
            chargingTime: "2 hours",
          },
        ],
      },
    ],
    offers: [
      {
        offerType: "Free Shipping",
        offer: "Yes",
      },
    ],
  },
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
    specifications: [
      {
        category: "Audio",
        specs: [
          {
            frequencyRange: "20Hz - 20kHz",
          },
          {
            impedance: "32 Ohms",
          },
        ],
      },
      {
        category: "Battery",
        specs: [
          {
            life: "6 hours",
          },
          {
            chargingTime: "1 hour",
          },
        ],
      },
    ],
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
    specifications: [
      {
        category: "Display",
        specs: [
          {
            size: "1.5 inches",
          },
          {
            type: "LCD",
          },
        ],
      },
      {
        category: "Battery",
        specs: [
          {
            life: "10 days",
          },
          {
            chargingTime: "2 hours",
          },
        ],
      },
    ],
    offers: [
      {
        offerType: "Free Shipping",
        offer: "Yes",
      },
    ],
  },
];

const categories = [
  {
    title: "All Products",
    link: "",
  },
  {
    title: "Most Purchased",
    link: "",
  },
  {
    title: "Laptops",
    link: "",
  },
  {
    title: "Smart Watch",
    link: "",
  },
  {
    title: "Mobiles",
    link: "",
  },
  {
    title: "Speakers",
    link: "",
  },
  {
    title: "Earphones",
    link: "",
  },
  {
    title: "All Products",
    link: "",
  },
  {
    title: "Most Purchased",
    link: "",
  },
  {
    title: "Laptops",
    link: "",
  },
  {
    title: "Smart Watch",
    link: "",
  },
  {
    title: "Mobiles",
    link: "",
  },
  {
    title: "Speakers",
    link: "",
  },
  {
    title: "Earphones",
    link: "",
  },
];

const ProductsPage = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get("category"));
  return (
    <div className="flex w-full flex-col">
      <AdminNavbar />

      <div className="p-5 pb-4 pt-10">
        <div className="hidden lg:flex justify-between items-center">
          <h1 className="text-3xl font-[500]">Products</h1>

          <div className="flex gap-2">
            <div className="flex py-2 p-1 rounded-full px-2 bg-slate-100 gap-2 items-center">
              <CiSearch className="text-2xl" />
              <input
                type="text"
                name=""
                className="bg-transparent outline-none w-[240px]"
                placeholder="Search product..."
                id=""
              />
            </div>

            <span className="border-l-[1px]"></span>

            <button className="bg-[var(--secondary-color)] text-white flex items-center gap-2 py-2 px-5 rounded-full font-semibold">
              Add New Product <IoAddOutline className="text-2xl" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:hidden justify-between items-center">
          <div className="flex items-center w-full mb-4 justify-between">
            <h1 className="text-2xl md:text-3xl font-[500]">Products</h1>

            <button className="text-xs sm:text-lg flex items-center gap-2 py-2 px-3 sm:px-5 rounded-full bg-[var(--secondary-color)] text-white">
              Add New Product <IoAddOutline className="text-xl" />
            </button>
          </div>

          <div className="w-full">
            <div className="flex w-full justify-self-end py-2 p-1 rounded-full px-2 bg-slate-100 gap-2 items-center">
              <CiSearch className="text-2xl" />
              <input
                type="text"
                name=""
                className="bg-transparent outline-none w-[240px]"
                placeholder="Search product..."
                id=""
              />
            </div>
          </div>
        </div>

        <div className="flex my-10 gap-2 justify-between w-full">
          <div className="flex no-scrollbar flex-row gap-2 overflow-x-scroll">
            {categories.map(({ link, title }) => {
              return (
                <div className="flex text-nowrap flex-nowrap cursor-pointer duration-500 ease-in-out transition-colors hover:bg-gray-100 py-2 px-4 rounded-full">
                  {title}
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <span className="border-l-[1px]"></span>

            <button className="flex text-nowrap text-gray-500 items-center gap-2 py-2 px-5 rounded-full border-[1px] border-gray-300">
              Sort by <MdSort className="text-xl" />
            </button>
          </div>
        </div>

        <div className={`${styles.customGrid} gap-3 w-full overflow-x-scroll`}>
          {products.map((product: Product) => (
            <AdminProductItem key={product.productId} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
