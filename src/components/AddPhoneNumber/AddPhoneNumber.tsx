import { selectUser } from "@/features/user/userSlice";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddPhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const user: User = useSelector(selectUser);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  useEffect(() => {
    setPhoneNumber(user.phoneNumber || "");
  }, [user]);
  return (
    <div className="border-2 flex rounded-md items-center justify-between overflow-hidden px-[2px] py-[1px] border-[var(--secondary-color)]">
      <input
        value={phoneNumber}
        onChange={handleChange}
        className="outline-none ml-1"
        type="number"
      />
      <p className="bg-[var(--medium-color)] rounded-md cursor-pointer py-[1px] px-1 text-sm ">
        SAVE
      </p>
    </div>
  );
};

export default AddPhoneNumber;
