import { TfiSearch } from "react-icons/tfi";

const SearchBar = () => {
  return (
    <div className="flex bg-blue-50 py-1 px-4 items-center rounded-md gap-2 w-full">
      <TfiSearch className="text-xl text-gray-500" />
      <input
        type="text"
        className="text-lg bg-transparent text-gray-700 w-full outline-none"
        placeholder="Search for Products, Brands and More"
      />
    </div>
  );
};

export default SearchBar;
