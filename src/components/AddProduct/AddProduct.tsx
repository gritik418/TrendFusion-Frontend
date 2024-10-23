"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { IoAddOutline } from "react-icons/io5";
import { ThumbnailUpload } from "../ThumbnailUpload/ThumbnailUpload";
import { ColorImageUpload } from "../ColorImageUpload/ColorImageUpload";
import { ImagesUpload } from "../ImagesUpload/ImagesUpload";
import Image from "next/image";
import { FileState } from "../MultiImageDropzone/MultiImageDropzone";

const productInfo: Product = {
  rating: 5,
  productId: "1A2B3C",
  title: "Super Sound Wireless Earbuds",
  brand: "SoundMax",
  description:
    "Experience high-quality sound and seamless connectivity with our latest wireless earbuds.",
  category: "Audio",
  stock: 150,
  discount: {
    discountType: "Percentage",
    value: 10,
    description: "Limited time offer",
  },
  size: "",
  price: 79.99,
  warranty: "1 year",
  highlights: ["", "", ""],
  specifications: [
    {
      category: "Audio",
      specs: [{ frequencyRange: "20Hz - 20kHz" }, { impedance: "32 Ohms" }],
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
  thumbnail:
    "https://m.media-amazon.com/images/I/51fKmbuf5+L._AC_SY300_SX300_.jpg",
  isAvailable: true,
  images: [
    "https://m.media-amazon.com/images/I/71652WdL3pL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/51fKmbuf5+L._AC_SY300_SX300_.jpg",
  ],
  color: {
    colorName: "Black",
    colorImage:
      "https://m.media-amazon.com/images/I/71652WdL3pL._AC_SX679_.jpg",
  },
};

const AddProduct = () => {
  const [productId, setProductId] = useState<string>("");
  const [productIdLoading, setProductIdLoading] = useState<boolean>(false);
  const [productIdInfo, setProductIdInfo] = useState<any>("");
  const [thumbnail, setThummbnail] = useState<string>("");
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [colorImage, setColorImage] = useState<string>("");
  const [colorImageFile, setColorImageFile] = useState<File>();
  const [images, setImages] = useState<string[]>([]);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [highlights, setHighlights] = useState<string[]>([""]);
  const [specifications, setSpecifications] = useState<Specifications[]>([
    {
      category: "",
      specs: [{ "": "" }],
    },
  ]);
  const [offers, setOffers] = useState<Offers[]>([
    { offerType: "", offer: "" },
  ]);
  const [discountType, setDiscountType] = useState<"Fixed" | "Percentage">(
    "Fixed"
  );

  const handleChange = (event: SelectChangeEvent) => {
    setDiscountType(event.target.value as "Fixed" | "Percentage");
  };

  const addMoreHighlight = () => {
    setHighlights([...highlights, ""]);
  };

  const addMoreSpecification = () => {
    setSpecifications([
      ...specifications,
      {
        category: "",
        specs: [{ "": "" }],
      },
    ]);
  };

  const addMoreSpec = (index: number) => {
    let specs = specifications;
    specs[index].specs.push({ "": "" });
    setSpecifications([...specs]);
  };

  const addMoreOffer = () => {
    setOffers([
      ...offers,
      {
        offerType: "",
        offer: "",
      },
    ]);
  };

  const handleClearImages = () => {
    setThummbnail("");
    setColorImage("");
    setImages([]);
    setFileStates([]);
    setColorImageFile(undefined);
    setThumbnailFile(undefined);
  };

  const handleCheckProductId = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/product/check`,
        { productId },
        {
          headers: {
            "Content-Type": "appliacation/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl">Add a new product</h1>

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-gray-100 w-full">
        <div className="flex gap-3">
          <TextField
            className="bg-white w-full"
            placeholder="Enter product id without spaces"
            id="outlined-basic"
            label="Product Id (Must be unique)*"
            variant="outlined"
          />

          <button
            onClick={handleCheckProductId}
            className="bg-[var(--secondary-color)] flex items-center justify-center w-24 font-semibold rounded-md text-white text-lg"
          >
            {productIdLoading ? (
              <Image
                src={"/images/loader.gif"}
                alt="uploading"
                height={30}
                width={30}
              />
            ) : (
              "Check"
            )}
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <TextField
            id="outlined-basic"
            className="bg-white"
            label="Brand*"
            variant="outlined"
          />
        </div>

        <div className="flex flex-col gap-1">
          <TextField
            className="bg-white"
            id="outlined-basic"
            multiline
            rows={3}
            label="Title*"
            variant="outlined"
          />
        </div>

        <div className="flex flex-col gap-1">
          <TextField
            className="bg-white"
            id="outlined-basic"
            multiline
            rows={8}
            label="Description*"
            variant="outlined"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex w-full">
            <TextField
              className="bg-white w-full"
              id="outlined-basic"
              label="Category*"
              variant="outlined"
            />
          </div>
          <div className="flex w-full">
            <TextField
              className="bg-white w-full"
              id="outlined-basic"
              label="Stock (In units)*"
              variant="outlined"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex w-full">
            <FormControl className="w-full bg-white">
              <InputLabel id="demo-simple-select-helper-label">
                Select Discount Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={discountType}
                label="Select Discount Type"
                onChange={handleChange}
              >
                <MenuItem value={"Percentage"}>Percentage</MenuItem>
                <MenuItem value={"Fixed"}>Fixed</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex w-full">
            <TextField
              className="bg-white w-full"
              id="outlined-basic"
              label="Discount Value"
              variant="outlined"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <TextField
            className="bg-white w-full"
            id="outlined-basic"
            label="Discount Description"
            variant="outlined"
          />
        </div>

        <div className="flex gap-4">
          <TextField
            className="bg-white w-full"
            id="outlined-basic"
            label="Price (In rupees)*"
            variant="outlined"
          />
        </div>

        <div className="flex gap-4">
          <TextField
            className="bg-white w-full"
            id="outlined-basic"
            label="Warranty"
            variant="outlined"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex w-full">
            <TextField
              className="bg-white w-full"
              id="outlined-basic"
              label="Size"
              variant="outlined"
            />
          </div>
          <div className="flex w-full">
            <TextField
              className="bg-white w-full"
              id="outlined-basic"
              label="Color Name"
              variant="outlined"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Label
            className="focus:outline-[var(--secondary-color)]"
            htmlFor="airplane-mode"
          >
            Is Available
          </Label>
          <Switch
            className="focus:outline-[var(--secondary-color)]"
            id="airplane-mode"
          />
        </div>
      </div>

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-gray-100 w-full">
        <div className="flex gap-4 flex-col">
          <div className="flex justify-between mb-0">
            <p className="text-3xl">
              Color Image{" "}
              <span className="text-lg text-gray-500">
                (Required if color specified)
              </span>
            </p>
          </div>

          <ColorImageUpload
            file={colorImageFile}
            setFile={setColorImageFile}
            setColorImage={setColorImage}
          />
        </div>
      </div>

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-gray-100 w-full">
        <div className="flex gap-4 flex-col">
          <div className="flex justify-between mb-0">
            <p className="text-3xl">Thumbnail*</p>
          </div>

          <ThumbnailUpload
            file={thumbnailFile}
            setFile={setThumbnailFile}
            setThummbnail={setThummbnail}
          />
        </div>
      </div>

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-gray-100 w-full">
        <div className="flex gap-4 flex-col">
          <div className="flex justify-between mb-0">
            <p className="text-3xl">Images*</p>
          </div>

          <ImagesUpload
            fileStates={fileStates}
            setFileStates={setFileStates}
            setImages={setImages}
          />
        </div>
      </div>

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-gray-100 w-full">
        <div className="flex gap-4 flex-col">
          <div className="flex justify-between mb-2">
            <p className="text-3xl">Highlights</p>

            <button
              onClick={addMoreHighlight}
              className="flex items-center gap-2 bg-gray-400 px-3 text-white rounded-md"
            >
              <IoAddOutline className="text-2xl" /> Add More
            </button>
          </div>

          {highlights.map((highlight: string) => (
            <TextField
              className="bg-white w-full"
              id="outlined-basic"
              label=""
              variant="outlined"
            />
          ))}
        </div>
      </div>

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-gray-100 w-full">
        <div className="flex gap-4 flex-col">
          <div className="flex justify-between mb-2">
            <p className="text-3xl">Specifications</p>

            <button
              onClick={addMoreSpecification}
              className="flex items-center gap-2 bg-gray-400 px-3 text-white rounded-md"
            >
              <IoAddOutline className="text-2xl" /> Add More
            </button>
          </div>

          {specifications?.map((specification, index: number) => (
            <div className="flex flex-col gap-6 bg-white p-4 py-6 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex md:w-1/3 max-w-[90%]">
                  <TextField
                    className="bg-white w-full"
                    id="outlined-basic"
                    label="Specification Category"
                    variant="outlined"
                    value={specification.category}
                  />
                </div>

                <button
                  onClick={() => addMoreSpec(index)}
                  className="bg-gray-200 flex items-center py-1 px-3 rounded-md"
                >
                  <IoAddOutline className="text-xl" />
                  Add More
                </button>
              </div>
              {specification.specs.map(() => (
                <div className="flex gap-4">
                  <div className="flex w-full">
                    <TextField
                      className="bg-white w-full"
                      id="outlined-basic"
                      label="Specification Name"
                      variant="outlined"
                    />
                  </div>
                  <div className="flex w-full">
                    <TextField
                      className="bg-white w-full"
                      id="outlined-basic"
                      label="Specification Value"
                      variant="outlined"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-gray-100 w-full">
        <div className="flex gap-4 flex-col">
          <div className="flex justify-between mb-2">
            <p className="text-3xl">Offers</p>

            <button
              onClick={addMoreOffer}
              className="flex items-center gap-2 bg-gray-400 px-3 text-white rounded-md"
            >
              <IoAddOutline className="text-2xl" /> Add More
            </button>
          </div>

          {offers?.map((offer) => (
            <div className="flex gap-4 bg-white p-4 py-6 rounded-md">
              <div className="flex w-full">
                <TextField
                  className="bg-white w-full"
                  id="outlined-basic"
                  label="Offer Type"
                  variant="outlined"
                />
              </div>
              <div className="flex w-full">
                <TextField
                  className="bg-white w-full"
                  id="outlined-basic"
                  label="Offer Value"
                  variant="outlined"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex mt-12 mb-20 justify-end gap-3">
        <button className="text-[var(--secondary-color)] text-2xl py-2 px-6 rounded-md font-bold">
          Cancel
        </button>

        <button
          onClick={handleClearImages}
          className="bg-[var(--secondary-color)] text-2xl text-white py-2 px-6 rounded-md font-bold"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
