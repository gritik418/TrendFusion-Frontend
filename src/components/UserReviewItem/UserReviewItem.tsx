import React from "react";
import { FaStar } from "react-icons/fa";
import ReviewImage from "../ReviewImage/ReviewImage";
import { Avatar } from "@mui/material";
import { Separator } from "../ui/separator";

const UserReviewItem = ({ review }: { review: Reviews }) => {
  return (
    <div className="p-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <div className="flex bg-green-800 text-white px-4 py-1 items-center gap-2 rounded-md">
            <p className="text-xl font-semibold">{review.rating}</p>
            <FaStar />
          </div>
          <p>{review.title}</p>
        </div>

        <p className="mt-4 text-lg">{review.description}</p>

        <div className="flex gap-3 mt-4 w-[90%] flex-wrap">
          {review.images?.map((img: string) => {
            return <ReviewImage key={img} image={img} />;
          })}
        </div>

        <div className="mt-6 mb-4">
          <div className="flex gap-3 items-center">
            <Avatar />
            <div className="">
              <p>
                {review.user.firstName} {review.user.lastName}
              </p>
              <p>{review.user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default UserReviewItem;
