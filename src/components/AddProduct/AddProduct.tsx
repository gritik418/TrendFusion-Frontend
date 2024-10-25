"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { IoAddOutline } from "react-icons/io5";
import { ThumbnailUpload } from "../ThumbnailUpload/ThumbnailUpload";
import { ColorImageUpload } from "../ColorImageUpload/ColorImageUpload";
import { ImagesUpload } from "../ImagesUpload/ImagesUpload";
import Image from "next/image";
import { FileState } from "../MultiImageDropzone/MultiImageDropzone";
import { useAddProductMutation } from "@/features/api/admin/adminProductApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Bounce, toast } from "react-toastify";

type ProductIdInfo = {
  status: "SUCCESS" | "ERROR";
  message: string;
};

const AddProduct = () => {
  const [productId, setProductId] = useState<string>("");
  const [productIdLoading, setProductIdLoading] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [thumbnail, setThummbnail] = useState<string>("");
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [colorImage, setColorImage] = useState<string>("");
  const [colorImageFile, setColorImageFile] = useState<File>();
  const [images, setImages] = useState<string[]>([]);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [highlights, setHighlights] = useState<string[]>([""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [addProduct] = useAddProductMutation();
  const [errors, setErrors] = useState<ProductErrors>();
  const [productIdInfo, setProductIdInfo] = useState<ProductIdInfo | null>(
    null
  );
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
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    brand: "",
    category: "",
    colorName: "",
    price: undefined,
    description: "",
    discountDescription: "",
    discountValue: undefined,
    size: "",
    stock: 1,
    title: "",
    warranty: "",
  });

  const handleChangeProductInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberTypes = ["price", "stock", "discountValue"];
    if (numberTypes.includes(name)) {
      const parsedValue = Number(value);
      setProductInfo({
        ...productInfo,
        [name]: parsedValue,
      });
    } else {
      setProductInfo({
        ...productInfo,
        [name]: value,
      });
    }
  };

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
      setProductIdInfo(null);
      setProductIdLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/product/check`,
        { productId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setProductIdLoading(false);
      setProductIdInfo({
        status: data.success ? "SUCCESS" : "ERROR",
        message: data.message,
      });
    } catch (error: any) {
      setProductIdLoading(false);
      setProductIdInfo({
        status: error.response.data.success ? "SUCCESS" : "ERROR",
        message: error.response.data.message,
      });
    }
  };

  const handleHighlightChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const tempHighlights = highlights;
    tempHighlights[index] = e.target.value;
    setHighlights([...tempHighlights]);
  };

  const handleChangeOffers = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    type: "offerType" | "offer"
  ) => {
    let templOffers = offers;

    if (type === "offerType") {
      templOffers[index].offerType = e.target.value;
    } else {
      templOffers[index].offer = e.target.value;
    }
    setOffers([...templOffers]);
  };

  const handleChangeSpecs = (
    index: number,
    type: "category" | "spec",
    value: string,
    specIndex?: number,
    specType?: "key" | "value"
  ) => {
    const tempSpecs = specifications;
    if (type === "category") {
      tempSpecs[index].category = value;
    } else {
      if (specType === "key") {
        let previousValue = Object.values(
          tempSpecs[index].specs[specIndex!]
        )[0];
        tempSpecs[index].specs[specIndex!] = { [value]: previousValue };
      } else {
        let previousKey = Object.keys(tempSpecs[index].specs[specIndex!])[0];
        tempSpecs[index].specs[specIndex!] = { [previousKey]: value };
      }
    }
    setSpecifications([...tempSpecs]);
  };

  const handleAddProduct = async () => {
    setErrors({});
    setLoading(true);
    const { data, error } = await addProduct({
      productId,
      brand: productInfo.brand,
      title: productInfo.title,
      description: productInfo.description,
      category: productInfo.category,
      stock: productInfo.stock,
      size: productInfo.size,
      isAvailable,
      highlights,
      specifications,
      price: productInfo.price || 0,
      warranty: productInfo.warranty,
      thumbnail,
      images,
      color: {
        colorName: productInfo.colorName,
        colorImage,
      },
      discount: {
        discountType,
        value: productInfo.discountValue || 0,
        description: productInfo.description,
      },
      offers,
    });
    setLoading(false);

    if (error) {
      const response = error as FetchBaseQueryError;
      if (response.status === "FETCH_ERROR") {
        toast.error("Check your internet.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
      const errorResponse = response.data as AuthResponse;
      if (errorResponse?.errors) {
        setErrors(errorResponse.errors);
      } else {
        toast.error(errorResponse?.message, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      return;
    }
    if (data?.success) {
      toast.success(data?.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      handleClearImages();
    } else if (data?.success && data.message) {
      toast.error(data?.message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl">Add a new product</h1>

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-[var(--light-color)] w-full">
        <div className="flex gap-1 flex-col">
          <div className="flex gap-3 w-full">
            <TextField
              className="bg-white w-full"
              placeholder="Enter product id without spaces"
              id="outlined-basic"
              value={productId}
              type="text"
              onChange={(e) => setProductId(e.target.value)}
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
          {productIdInfo && (
            <span
              className={`
            ${
              productIdInfo?.status === "SUCCESS"
                ? "text-green-600"
                : "text-red-500"
            } text-sm font-semibold`}
            >
              {productIdInfo?.message}
            </span>
          )}
          {errors?.productId && (
            <span className="text-red-500 text-sm font-semibold">
              {errors?.productId}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <TextField
            id="outlined-basic"
            className="bg-white"
            label="Brand"
            variant="outlined"
            value={productInfo.brand}
            name="brand"
            type="text"
            onChange={handleChangeProductInfo}
          />
          {errors?.brand && (
            <span className="text-red-500 text-sm font-semibold">
              {errors?.brand}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <TextField
            className="bg-white"
            id="outlined-basic"
            multiline
            rows={3}
            label="Title*"
            type="text"
            value={productInfo.title}
            name="title"
            onChange={handleChangeProductInfo}
            variant="outlined"
          />
          {errors?.title && (
            <span className="text-red-500 text-sm font-semibold">
              {errors?.title}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <TextField
            className="bg-white"
            id="outlined-basic"
            multiline
            rows={8}
            label="Description*"
            variant="outlined"
            value={productInfo.description}
            name="description"
            type="text"
            onChange={handleChangeProductInfo}
          />
          {errors?.description && (
            <span className="text-red-500 text-sm font-semibold">
              {errors?.description}
            </span>
          )}
        </div>

        <div className="flex gap-8 lg:gap-4 flex-col lg:flex-row">
          <div className="flex w-full flex-col">
            <TextField
              className="bg-white w-full"
              id="outlined-basic"
              label="Category*"
              variant="outlined"
              value={productInfo.category}
              name="category"
              type="text"
              onChange={handleChangeProductInfo}
            />
            {errors?.category && (
              <span className="text-red-500 text-sm font-semibold">
                {errors?.category}
              </span>
            )}
          </div>
          <div className="flex w-full flex-col">
            <TextField
              className="bg-white w-full"
              id="outlined-basic"
              label="Stock (In units)*"
              variant="outlined"
              type="number"
              value={productInfo.stock}
              name="stock"
              onChange={handleChangeProductInfo}
            />
            {errors?.stock && (
              <span className="text-red-500 text-sm font-semibold">
                {errors?.stock}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-8 lg:gap-4 flex-col lg:flex-row">
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
              name="discountValue"
              onChange={handleChangeProductInfo}
              value={productInfo.discountValue}
              type="number"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <TextField
            className="bg-white w-full"
            id="outlined-basic"
            label="Discount Description"
            variant="outlined"
            name="discountDescription"
            type="text"
            onChange={handleChangeProductInfo}
            value={productInfo.discountDescription}
          />
        </div>

        <div className="flex flex-col gap-1">
          <TextField
            className="bg-white w-full"
            id="outlined-basic"
            label="Price (In rupees)*"
            variant="outlined"
            name="price"
            type="number"
            onChange={handleChangeProductInfo}
            value={productInfo.price}
          />
          {errors?.price && (
            <span className="text-red-500 text-sm font-semibold">
              {errors?.price}
            </span>
          )}
        </div>

        <div className="flex gap-4">
          <TextField
            className="bg-white w-full"
            id="outlined-basic"
            label="Warranty"
            variant="outlined"
            name="warranty"
            type="text"
            onChange={handleChangeProductInfo}
            value={productInfo.warranty}
          />
        </div>

        <div className="flex gap-8 lg:gap-4 flex-col lg:flex-row">
          <div className="flex w-full">
            <TextField
              className="bg-white w-full"
              id="outlined-basic"
              label="Size"
              variant="outlined"
              name="size"
              type="text"
              onChange={handleChangeProductInfo}
              value={productInfo.size}
            />
          </div>
          <div className="flex w-full">
            <TextField
              className="bg-white w-full"
              id="outlined-basic"
              label="Color Name"
              variant="outlined"
              name="colorName"
              type="text"
              onChange={handleChangeProductInfo}
              value={productInfo.colorName}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 gap-3">
          <Label
            className="focus:outline-[var(--secondary-color)] text-xl"
            htmlFor="airplane-mode"
          >
            Is Available
          </Label>
          <Switch
            defaultChecked={isAvailable}
            onCheckedChange={(checked) => {
              setIsAvailable(checked);
            }}
            className="focus:outline-[var(--secondary-color)]"
            id="airplane-mode"
          />
        </div>
      </div>

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-[var(--light-color)] w-full">
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

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-[var(--light-color)] w-full">
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

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-[var(--light-color)] w-full">
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

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-[var(--light-color)] w-full">
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

          {highlights.map((highlight: string, index: number) => (
            <TextField
              defaultValue={highlight}
              onChange={(e) => handleHighlightChange(e, index)}
              value={highlights[index]}
              className="bg-white w-full"
              id="outlined-basic"
              label=""
              variant="outlined"
            />
          ))}
        </div>
      </div>

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-[var(--light-color)] w-full">
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
              <div className="flex gap-2 justify-between items-center">
                <div className="flex w-full md:1/2 lg:w-1/3 max-w-[90%]">
                  <TextField
                    className="bg-white w-full"
                    id="outlined-basic"
                    label="Specification Category"
                    variant="outlined"
                    value={specifications[index].category}
                    defaultValue={specification.category}
                    onChange={(e) =>
                      handleChangeSpecs(index, "category", e.target.value)
                    }
                  />
                </div>

                <button
                  onClick={() => addMoreSpec(index)}
                  className="bg-gray-200 h-full text-nowrap flex items-center py-1 px-3 rounded-md"
                >
                  <IoAddOutline className="text-xl" />
                  Add More
                </button>
              </div>

              {specification.specs.map((spec, specIndex: number) => (
                <div className="flex gap-8 lg:gap-4 flex-col lg:flex-row">
                  <div className="flex w-full">
                    <TextField
                      className="bg-white w-full"
                      id="outlined-basic"
                      label="Specification Name"
                      variant="outlined"
                      value={Object.keys(spec)[0]}
                      onChange={(e) =>
                        handleChangeSpecs(
                          index,
                          "spec",
                          e.target.value,
                          specIndex,
                          "key"
                        )
                      }
                    />
                  </div>
                  <div className="flex w-full">
                    <TextField
                      className="bg-white w-full"
                      id="outlined-basic"
                      label="Specification Value"
                      variant="outlined"
                      value={Object.values(spec)[0]}
                      onChange={(e) =>
                        handleChangeSpecs(
                          index,
                          "spec",
                          e.target.value,
                          specIndex,
                          "value"
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex p-6 gap-8 rounded-md mt-6 flex-col bg-[var(--light-color)] w-full">
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

          {offers?.map((offer, index: number) => (
            <div className="flex bg-white p-4 py-6 rounded-md gap-8 lg:gap-4 flex-col lg:flex-row">
              <div className="flex w-full">
                <TextField
                  defaultValue={offer.offerType}
                  className="bg-white w-full"
                  id="outlined-basic"
                  value={offers[index].offerType}
                  label="Offer Type"
                  onChange={(e) => handleChangeOffers(e, index, "offerType")}
                  variant="outlined"
                />
              </div>
              <div className="flex w-full">
                <TextField
                  defaultValue={offer.offer}
                  className="bg-white w-full"
                  value={offers[index].offer}
                  id="outlined-basic"
                  label="Offer Value"
                  variant="outlined"
                  onChange={(e) => handleChangeOffers(e, index, "offer")}
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
          onClick={handleAddProduct}
          className="flex items-center justify-center bg-[var(--secondary-color)] w-48 text-2xl text-white py-2 px-6 rounded-md font-bold"
        >
          {loading ? (
            <Image
              src={"/images/loader.gif"}
              alt="uploading"
              height={30}
              width={30}
            />
          ) : (
            "Add Product"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
