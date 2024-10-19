import DetailedProductItem from "@/components/DetailedProductItem/DetailedProductItem";
import Navbar from "@/components/Navbar/Navbar";
import ProductItem from "@/components/ProductItem/ProductItem";

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

export default function Home() {
  return (
    <div className="">
      <Navbar />

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
