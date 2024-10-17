"use client";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import Navbar from "@/components/Navbar/Navbar";
import { Separator } from "@/components/ui/separator";
import { Rating } from "@mui/material";
import { MdLocalOffer } from "react-icons/md";
import { FaHighlighter } from "react-icons/fa";
import ColorItem from "@/components/ColorItem/ColorItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UserReviewItem from "@/components/UserReviewItem/UserReviewItem";

const product: ProductWithVariants = {
  productId: "1A2B3C",
  title:
    "Noise Twist Go Round dial Smartwatch with BT Calling, 1.39' Display, Metal Build, 100+ Watch Faces, IP68, Sleep Tracking, 100+ Sports Modes, 24/7 Heart Rate Monitoring (Rose Pink)",
  brand: "Noise",
  description:
    "Discover the Noise Twist Go Round Smartwatch, where style meets functionality. With a sleek metal build and a vibrant 1.39-inch display, this smartwatch offers Bluetooth calling for seamless connectivity. Personalize your look with over 100 customizable watch faces, all while enjoying the durability of its IP68 rating. Track your health with 24/7 heart rate monitoring and advanced sleep tracking, and dive into fitness with 100+ sports modes. Perfect for any lifestyle, the Noise Twist Go Round combines elegance and cutting-edge technology in a stunning rose pink design. Stay connected and stylish on the go!",
  thumbnail:
    "https://m.media-amazon.com/images/I/41g06cAmgkL._SX300_SY300_QL70_FMwebp_.jpg",
  isAvailable: true,
  images: [
    "https://m.media-amazon.com/images/I/71W3+98XDpL._SX679_.jpg",
    "https://m.media-amazon.com/images/I/61Y6E3Y9heL._SX679_.jpg",
    "https://m.media-amazon.com/images/I/71-NaAJgkVL._SX679_.jpg",
    "https://m.media-amazon.com/images/I/71uU2UhmtjL._SX679_.jpg",
    "https://m.media-amazon.com/images/I/61s02cHi3tL._SX679_.jpg",
    "https://m.media-amazon.com/images/I/61CMWHJsFTL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/619YdOzmc7L._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61Ys0A7FutL._SL1500_.jpg",
  ],
  category: "Smartwatch",
  price: 4999,
  warranty: "1 Year Manufacturer Warranty",
  discount: {
    discountType: "Percentage",
    value: 74,
    description: "Limited time offer",
  },
  rating: 4.2,
  stock: 150,
  color: {
    colorImage:
      "https://m.media-amazon.com/images/I/41g06cAmgkL._SX300_SY300_QL70_FMwebp_.jpg",
    colorName: "Rose Pink",
  },
  variants: [
    {
      colorImage: "https://m.media-amazon.com/images/I/71KwQsQL9dL._SX679_.jpg",
      colorName: "Black Link",
      sizes: [
        { slug: "1", size: "1.84" },
        { slug: "6", size: "1.38" },
      ],
    },
    {
      colorName: "Gold Wine",
      colorImage: "https://m.media-amazon.com/images/I/61d+0-5j6vL._SX679_.jpg",
      sizes: [
        { slug: "4", size: "1.40" },
        { slug: "2", size: "1.38" },
        { slug: "3", size: "1.39" },
      ],
    },
    {
      colorName: "Gold Link",
      colorImage: "https://m.media-amazon.com/images/I/81oS2scJ5GL._SX679_.jpg",
      sizes: [{ slug: "5", size: "1.39" }],
    },
    {
      colorImage:
        "https://m.media-amazon.com/images/I/41g06cAmgkL._SX300_SY300_QL70_FMwebp_.jpg",
      colorName: "Rose Pink",
      sizes: [
        { slug: "8", size: "1.40" },
        { slug: "9", size: "1.38" },
        { slug: "10", size: "1.39" },
      ],
    },
    {
      colorName: "Midnight Blue",
      colorImage: "https://m.media-amazon.com/images/I/61shWCN2YmL._SX679_.jpg",
      sizes: [{ slug: "6", size: "1.38" }],
    },
  ],
  size: "1.38",
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
  offers: [
    {
      offerType: "Discount",
      offer: "20% off your first purchase",
    },
    {
      offerType: "Bundle",
      offer: "Buy one, get one 50% off on select items",
    },
    {
      offerType: "Free Shipping",
      offer: "Free shipping on orders over $50",
    },
    {
      offerType: "Loyalty Reward",
      offer: "Earn double points on your next purchase",
    },
  ],
};

const reviews: Reviews[] = [
  {
    _id: "1",
    user: {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      username: "alice_j",
      avatar: "https://example.com/avatars/alice.jpg",
    },
    userId: "",
    productId: "1A2B3C",
    rating: 5,
    title: "Absolutely Love It!",
    description:
      "The Noise Twist Go Round smartwatch has exceeded my expectations. The battery life is fantastic, and the fitness tracking features are very accurate. Highly recommend!",
    images: [
      "https://m.media-amazon.com/images/I/81TwbaceUTL._SY250_.jpg",
      "https://m.media-amazon.com/images/I/61w1D6I0FRL._SY250_.jpg",
      "https://m.media-amazon.com/images/I/61cjSEzyn7L._SY250_.jpg",
    ],
  },
  {
    _id: "2",
    user: {
      firstName: "Bob",
      lastName: "Smith",
      email: "bob.smith@example.com",
      username: "bob_smith",
      avatar: "https://example.com/avatars/bob.jpg",
    },
    userId: "",
    productId: "1A2B3C",
    rating: 4,
    title: "Great Value for Money",
    description:
      "This smartwatch offers so many features for the price. The display is bright and clear, but I wish it had more customization options.",
    images: ["https://m.media-amazon.com/images/I/61jR5xu-IHL._SY250_.jpg"],
  },
  {
    _id: "3",
    user: {
      firstName: "Charlie",
      lastName: "Davis",
      email: "charlie.davis@example.com",
      username: "charlie_d",
      avatar: "https://example.com/avatars/charlie.jpg",
    },
    userId: "",
    productId: "1A2B3C",
    rating: 3,
    title: "Decent but Could Be Better",
    description:
      "It's a nice smartwatch, but I found the Bluetooth connection a bit unstable at times. The design is lovely, though.",
    images: [
      "https://m.media-amazon.com/images/I/71ZGQ-mrn1L._SY250_.jpg",
      "https://m.media-amazon.com/images/I/81zTRnnadbL._SY250_.jpg",
    ],
  },
  {
    _id: "4",
    user: {
      firstName: "Diana",
      lastName: "Wilson",
      email: "diana.wilson@example.com",
      username: "diana_w",
      avatar: "https://example.com/avatars/diana.jpg",
    },
    userId: "",
    productId: "1A2B3C",
    rating: 2,
    title: "Not What I Expected",
    description:
      "I was excited to get this smartwatch, but the heart rate monitor seems inaccurate. I expected better quality from Noise.",
    images: ["https://m.media-amazon.com/images/I/61RNJtYVTIL._SY250_.jpg"],
  },
  {
    _id: "5",
    user: {
      firstName: "Ethan",
      lastName: "Martinez",
      email: "ethan.martinez@example.com",
      username: "ethan_m",
      avatar: "https://example.com/avatars/ethan.jpg",
    },
    userId: "",
    productId: "1A2B3C",
    rating: 5,
    title: "Perfect for Fitness Enthusiasts",
    description:
      "I love all the sports modes available! It's perfect for my workouts and keeps me motivated.",
    images: [
      "https://m.media-amazon.com/images/I/61hzUO6vxWL._SY250_.jpg",
      "https://m.media-amazon.com/images/I/610V99QuuwL._SY250_.jpg",
    ],
  },
];

const Product = ({ params }: { params: { productId: string } }) => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<Variants | null>(null);

  const handleChangeSize = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  useEffect(() => {
    product.variants?.forEach((variant: Variants) => {
      if (variant.colorName === product.color?.colorName) {
        setSelectedColor(() => variant);
      }
    });
  }, []);

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <div className="bg-[#eeeeee] p-5 pb-4 pt-10">
        <div className="bg-white p-3 w-full flex flex-col lg:flex-row gap-3">
          <div className="w-full lg:w-5/12">
            <ImageSlider images={product.images} />
          </div>

          <div className="w-full lg:w-7/12 p-3">
            <div className="flex flex-col">
              <p className="text-sm text-gray-400 font-bold uppercase">
                {product.brand}
              </p>
              <h1 className="text-3xl">{product.title}</h1>
              <div className="flex items-center gap-2 mt-2 mb-2">
                <Rating
                  name="size-medium"
                  precision={0.25}
                  defaultValue={product.rating}
                  readOnly
                />
                <span className="font-semibold">{product.rating}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <Separator />
              <div className="flex mt-4 mb-2 items-end gap-3">
                <p className="text-4xl font-semibold">
                  <span className="text-2xl">₹</span>
                  {(
                    product.price -
                    (product.price * product.discount?.value!) / 100
                  ).toFixed()}
                </p>

                <p className="text-xl text-green-600 font-semibold">
                  {product.discount?.value}% Off
                </p>
              </div>
              <p className="text-lg text-gray-500 font-normal">
                M.R.P. <span className="line-through">₹{product.price}</span>
              </p>
              <p className="text-sm font-semibold mb-2">
                Inclusive of all taxes
              </p>
            </div>

            {product.offers && (
              <div className="flex flex-col mt-1">
                <Separator />
                <p className="text-3xl mt-4 mb-5">Available Offers</p>
                <div className="flex flex-col gap-2 mb-3">
                  {product?.offers &&
                    product.offers.map(
                      ({ offer, offerType }: Offers, index: number) => {
                        return (
                          <div key={index} className="flex items-center">
                            <MdLocalOffer className="text-lg mr-2 text-green-600" />
                            <div className="flex gap-2">
                              <p className="font-semibold">{offerType}</p>
                              <p>{offer}</p>
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
            )}

            {product?.variants && product?.color && (
              <div className="flex flex-col mt-1">
                <Separator />
                <p className="text-3xl mt-4 mb-5">Color</p>
                <div className="flex gap-3 mb-3">
                  {product.variants?.map((color: Variants) => {
                    return (
                      <ColorItem
                        selectedSize={product.size!}
                        selectedColor={product.color!}
                        key={color.colorName}
                        color={color}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {product?.variants && product?.size && (
              <div className="flex flex-col mt-1">
                <Separator />
                <p className="text-3xl mt-4 mb-5">Size</p>
                <div className="flex gap-3 mb-3">
                  {selectedColor?.sizes.map((size: VariantSize) => (
                    <div
                      onClick={() => handleChangeSize(size.slug)}
                      className={`border-2 px-5 py-2 rounded-md cursor-pointer ${
                        product.size === size.size
                          ? "border-gray-400 border-4"
                          : "border-gray-200"
                      }`}
                      key={size.slug}
                    >
                      {size.size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.warranty && (
              <div className="flex flex-col mt-1">
                <Separator />
                <p className="text-3xl mt-4 mb-5">Warranty</p>
                <p className="px-3 mb-3 text-lg">{product.warranty}</p>
              </div>
            )}

            {product.description && (
              <div className="flex flex-col mt-1">
                <Separator />
                <p className="text-3xl mt-4 mb-5">Description</p>
                <p className="text-lg px-3 mb-3">{product.description}</p>
              </div>
            )}

            {product.highlights && (
              <div className="flex flex-col mt-1">
                <Separator />
                <p className="text-3xl mt-4 mb-5">Highlights</p>
                <div className="flex flex-col gap-2 mb-3">
                  {product.highlights.map(
                    (highlight: string, index: number) => {
                      return (
                        <div key={index} className="flex items-center">
                          <FaHighlighter className="text-green-700" />
                          <p className="text-lg px-3">{highlight}</p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {product.specifications && (
              <div className="flex flex-col mt-1">
                <Separator />
                <p className="text-3xl mt-4 mb-5">Specifications</p>
                <div className="flex flex-col gap-2 mb-3">
                  {Object.keys(product.specifications!).map(
                    (specification: string, index: number) => {
                      return (
                        <Accordion
                          key={index}
                          type="single"
                          collapsible
                          defaultChecked
                          defaultValue={specification}
                        >
                          <AccordionItem value={specification}>
                            <AccordionTrigger className="text-2xl p-2 bg-gray-200 hover:no-underline">
                              {specification}
                            </AccordionTrigger>
                            <AccordionContent className=" bg-gray-50">
                              {Object.entries(
                                product.specifications![specification]
                              ).map((spec: string[], index: number) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex justify-between p-3"
                                  >
                                    <p className="capitalize text-xl font-normal">
                                      {spec[0]}
                                    </p>
                                    <p className="text-lg">{spec[1]}</p>
                                  </div>
                                );
                              })}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {reviews && (
        <div className="bg-[#eeeeee] p-5 pt-2">
          <div className="bg-white p-3 w-full flex flex-col">
            <p className="text-3xl mt-4 mb-5">Ratings & Reviews</p>
            <Separator />

            <div className="mt-4">
              {reviews.map((review: Reviews) => (
                <UserReviewItem key={review._id} review={review} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
