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
import PriceBar from "@/components/PriceBar/PriceBar";
import CheckDelivery from "@/components/CheckDelivery/CheckDelivery";
import { useGetProductByIdQuery } from "@/features/api/productApi";
import Image from "next/image";

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
  const [selectedColor, setSelectedColor] = useState<Variants>();
  const { data, isLoading } = useGetProductByIdQuery(params.productId);

  const handleChangeSize = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  useEffect(() => {
    if (data && data?.variants && data?.product) {
      data?.variants?.forEach((variant: Variants) => {
        if (variant.colorName === data?.product?.color?.colorName) {
          setSelectedColor(variant);
        }
      });
    }
  }, [data?.product, data?.variants]);

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <>
        {isLoading ? (
          <div className="bg-[#eeeeee] p-5 pb-4 pt-10 h-screen">
            <div className="bg-white h-full p-3 w-full flex items-center justify-center flex-col gap-3">
              <Image
                src={"/images/loading.gif"}
                alt="loading"
                height={140}
                width={140}
              />
            </div>
          </div>
        ) : (
          <>
            <>
              {data?.product?.productId ? (
                <div className="bg-[#eeeeee] p-5 pb-4 pt-10">
                  <div className="bg-white p-3 w-full flex flex-col lg:flex-row gap-3">
                    <div className="w-full lg:w-5/12">
                      <ImageSlider images={data!.product!.images} />
                    </div>

                    <div className="w-full lg:w-7/12 p-3">
                      <div className="flex flex-col">
                        <p className="text-lg text-gray-400 font-bold uppercase">
                          {data!.product!.brand}
                        </p>
                        <h1 className="text-3xl mb-2 pb-2">
                          {data!.product!.title}
                        </h1>
                        {data?.product?.rating && (
                          <div className="flex items-center gap-2 mt-2 mb-2">
                            <Rating
                              name="size-medium"
                              precision={0.25}
                              defaultValue={data!.product!.rating}
                              readOnly
                            />
                            <span className="font-semibold">
                              {data!.product!.rating}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <Separator />
                        <div className="flex mt-4 mb-2 items-end gap-3">
                          <p className="text-4xl font-semibold">
                            <span className="text-2xl">₹</span>
                            {data!.product!.discount
                              ? Math.floor(
                                  data!.product!.price -
                                    (data!.product!.price *
                                      data!.product!.discount?.value!) /
                                      100
                                )
                              : data!.product!.price}
                          </p>

                          {data!.product!.discount && (
                            <p className="text-xl text-green-600 font-semibold">
                              {data!.product!.discount?.value}% Off
                            </p>
                          )}
                        </div>
                        {data!.product!.discount && (
                          <p className="text-lg text-gray-500 font-normal">
                            M.R.P.{" "}
                            <span className="line-through">
                              ₹{data!.product!.price}
                            </span>
                          </p>
                        )}
                        <p className="text-sm font-semibold mb-2">
                          Inclusive of all taxes
                        </p>
                      </div>

                      {
                        <>
                          {data?.product?.stock > 0 ? (
                            <>
                              {data.product.stock > 9 ? (
                                <p className="text-green-500 font-bold">
                                  In Stock
                                </p>
                              ) : (
                                <p className="text-green-500 font-bold">
                                  Hurry, only {data.product.stock} left in
                                  stock!
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="text-red-500 font-bold">
                              Out of Stock
                            </p>
                          )}
                        </>
                      }

                      {data?.variants && data?.product?.color && (
                        <div className="flex flex-col mt-1">
                          <Separator />
                          <p className="text-3xl mt-4 mb-5">Color</p>
                          <div className="flex gap-3 mb-3">
                            {data?.variants?.map((color: Variants) => {
                              return (
                                <ColorItem
                                  selectedSize={data?.product?.size!}
                                  selectedColor={data?.product?.color!}
                                  key={color.colorName}
                                  color={color}
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {selectedColor && data?.product && (
                        <div className="flex flex-col mt-1">
                          <Separator />
                          <p className="text-3xl mt-4 mb-5">Size</p>
                          <div className="flex gap-3 mb-3">
                            {selectedColor &&
                              selectedColor?.size?.map((size: VariantSize) => (
                                <div
                                  onClick={() => handleChangeSize(size.slug)}
                                  className={`border-2 px-5 py-2 rounded-md cursor-pointer ${
                                    data?.product?.size === size.size
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

                      {data!.product!.offers && (
                        <div className="flex flex-col mt-1">
                          <Separator />
                          <p className="text-3xl mt-4 mb-5">Available Offers</p>
                          <div className="flex flex-col gap-3 mb-3">
                            {data!.product!?.offers &&
                              data!.product.offers.map(
                                (
                                  { offer, offerType }: Offers,
                                  index: number
                                ) => {
                                  return (
                                    <div
                                      key={index}
                                      className="flex justify-start items-center"
                                    >
                                      <div className="min-w-[140px] flex gap-2">
                                        <MdLocalOffer className="text-lg mr-2 text-green-600" />
                                        <p className="font-semibold">
                                          {offerType}
                                        </p>
                                      </div>
                                      <div className="flex gap-2">
                                        <p>{offer}</p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col mt-1">
                        <Separator />
                        <p className="text-3xl mt-4 mb-5">Delivery</p>
                        <CheckDelivery />
                      </div>

                      {data?.product?.warranty && (
                        <div className="flex flex-col mt-1">
                          <Separator />
                          <p className="text-3xl mt-4 mb-5">Warranty</p>
                          <p className="px-3 mb-3 text-lg">
                            {data?.product.warranty}
                          </p>
                        </div>
                      )}

                      {data?.product?.description && (
                        <div className="flex flex-col mt-1">
                          <Separator />
                          <p className="text-3xl mt-4 mb-5">Description</p>
                          <p className="text-lg px-3 mb-3">
                            {data?.product.description}
                          </p>
                        </div>
                      )}

                      {data?.product?.highlights && (
                        <div className="flex flex-col mt-1">
                          <Separator />
                          <p className="text-3xl mt-4 mb-5">Highlights</p>
                          <div className="flex flex-col gap-2 mb-3">
                            {data?.product.highlights.map(
                              (highlight: string, index: number) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <FaHighlighter className="text-green-700" />
                                    <p className="text-lg px-3">{highlight}</p>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}

                      {data?.product?.specifications && (
                        <div className="flex flex-col mt-1">
                          <Separator />
                          <p className="text-3xl mt-4 mb-5">Specifications</p>
                          <div className="flex flex-col gap-2 mb-3">
                            {data?.product.specifications!.map(
                              (
                                specification: Specifications,
                                index: number
                              ) => {
                                return (
                                  <Accordion
                                    key={index}
                                    type="single"
                                    collapsible
                                    defaultChecked
                                    defaultValue={specification.category}
                                  >
                                    <AccordionItem
                                      value={specification.category}
                                    >
                                      <AccordionTrigger className="text-xl p-2 font-normal bg-gray-200 hover:no-underline">
                                        {specification.category}
                                      </AccordionTrigger>
                                      <AccordionContent className=" bg-gray-50">
                                        {specification.specs.map(
                                          (spec, index: number) => {
                                            return (
                                              <div
                                                key={index}
                                                className="flex justify-between gap-2 p-3"
                                              >
                                                <div className="flex min-w-[120px] md:min-w-[160px]">
                                                  <p className="text-sm capitalize md:text-lg font-normal">
                                                    {Object.keys(spec)[0]}
                                                  </p>
                                                </div>
                                                <p className="text-xs text-justify max-w-[400px] md:text-lg">
                                                  {Object.values(spec)[0]}
                                                </p>
                                              </div>
                                            );
                                          }
                                        )}
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
              ) : (
                <div className="h-[90vh] w-full items-center flex flex-col justify-center">
                  <Image
                    src={"/images/no-product-found.png"}
                    alt="img"
                    height={180}
                    width={240}
                  />
                  <p className="text-2xl font-semibold">
                    Sorry, no results found!
                  </p>
                </div>
              )}
            </>
            {data?.product && reviews && (
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

            {data?.product && <PriceBar product={data?.product!} />}
          </>
        )}
      </>
    </div>
  );
};

export default Product;
