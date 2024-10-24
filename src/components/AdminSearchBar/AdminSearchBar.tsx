import { IoSearchOutline } from "react-icons/io5";

const AdminSearchBar = () => {
  return (
    <div className="rounded-md bg-gray-50 border-[1px]">
      <div className="flex items-center gap-1 px-3">
        <IoSearchOutline className="text-xl" />
        <input
          type="text"
          placeholder="Search"
          className="h-full w-full outline-none p-2 bg-transparent"
        />
      </div>
    </div>
  );
};

export default AdminSearchBar;
