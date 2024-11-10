import { selectUser } from "@/features/user/userSlice";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditName = () => {
  const [name, setName] = useState<string>("");
  const user: User = useSelector(selectUser);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    setName(user.firstName + " " + user.lastName);
  }, [user]);
  return (
    <div className="border-2 flex rounded-md items-center justify-between overflow-hidden px-[2px] py-[1px] border-[var(--secondary-color)]">
      <input
        value={name}
        onChange={handleChange}
        className="outline-none ml-1"
        type="text"
      />
      <p className="bg-[var(--medium-color)] rounded-md cursor-pointer py-[1px] px-1 text-sm ">
        SAVE
      </p>
    </div>
  );
};

export default EditName;
