import CategoryShowcase from "@/components/CategoryShowcase/CategoryShowcase";
import CategoryShowcaseItem from "@/components/CategoryShowcaseItem/CategoryShowcaseItem";
import DetailedProductItem from "@/components/DetailedProductItem/DetailedProductItem";
import Navbar from "@/components/Navbar/Navbar";
import ProductItem from "@/components/ProductItem/ProductItem";

const products: Product[] = [
  {
    _id: "1",
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
    highlights: [
      "Bluetooth 5.0",
      "24-hour battery life",
      "IPX7 water-resistant",
    ],
    specifications: [
      {
        category: "Audio",
        specs: [{ frequencyRange: "20Hz - 20kHz", impedance: "32 Ohms" }],
      },
      {
        category: "Battery",
        specs: [
          {
            life: "6 hours",
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
    _id: "2",
    productId: "4D5E6F",
    title:
      "Ultra Smart Revoltt FS1|1.83 Display|BT Calling|Fastcharge|110+ Sports Mode|200+ WatchFaces Smartwatch  (Black Strap, Free Size)",
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
            type: "LCD",
          },
        ],
      },
      {
        category: "Battery",
        specs: [
          {
            life: "10 days",
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

const categories: Category[] = [
  {
    id: "1",
    name: "Grocery",
    image: "/images/grocery.jpeg",
    url: "",
  },
  {
    id: "2",
    name: "Mobiles",
    image: "/images/mobiles.png",
    url: "",
  },
  {
    id: "3",
    name: "Fashion",
    image: "/images/fashion.jpg",
    url: "",
    subcategories: [
      {
        id: "3-1",
        name: "Men's Top Wear",
        url: "",
      },
      {
        id: "3-2",
        name: "Women's Top Wear",
        url: "",
      },
    ],
  },
  {
    id: "4",
    name: "Electronics",
    image: "/images/laptops.jpeg",
    url: "",
    subcategories: [
      {
        id: "1-1",
        name: "Earphones",
        url: "",
      },
      {
        id: "1-2",
        name: "Laptops",
        url: "",
      },
      {
        id: "1-3",
        name: "Headphones",
        url: "",
      },
    ],
  },
  {
    id: "5",
    name: "Furniture",
    image: "/images/furniture.jpg",
    url: "",
    subcategories: [
      {
        id: "5-1",
        name: "Bedroom Furniture",
        url: "",
      },
      {
        id: "5-2",
        name: "Living Room Furniture",
        url: "",
      },
      {
        id: "5-3",
        name: "Home Decor",
        url: "",
      },
      {
        id: "5-4",
        name: "Kids Furniture",
        url: "",
      },
    ],
  },
  {
    id: "6",
    name: "Appliances",
    image: "/images/appliances.jpeg",
    url: "",
  },
  {
    id: "7",
    name: "Toys",
    image: "/images/toys.jpeg",
    url: "",
  },
  {
    id: "8",
    name: "Stationery",
    image: "/images/stationery.jpeg",
    url: "",
  },
];

export default function Home() {
  return (
    <div className="">
      <Navbar />

      <CategoryShowcase>
        {categories.map((category: Category) => (
          <CategoryShowcaseItem key={category.id} item={category} />
        ))}
      </CategoryShowcase>

      <div className="flex m-6 gap-4 flex-wrap">
        {products.map((product: Product) => (
          <ProductItem product={product} key={product.productId} />
        ))}
      </div>

      <div className="flex m-6 gap-4 flex-wrap">
        {products.map((product: Product) => (
          <DetailedProductItem product={product} key={product.productId} />
        ))}
      </div>
    </div>
  );
}
