import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";
import AdminProduct from "@/components/AdminProduct/AdminProduct";
import { CiSearch } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";
import { MdSort } from "react-icons/md";

const categories = [
  {
    title: "All Products",
    link: "",
  },
  {
    title: "Most Purchased",
    link: "",
  },
  {
    title: "Laptops",
    link: "",
  },
  {
    title: "Smart Watch",
    link: "",
  },
  {
    title: "Mobiles",
    link: "",
  },
  {
    title: "Speakers",
    link: "",
  },
  {
    title: "Earphones",
    link: "",
  },
  {
    title: "All Products",
    link: "",
  },
  {
    title: "Most Purchased",
    link: "",
  },
  {
    title: "Laptops",
    link: "",
  },
  {
    title: "Smart Watch",
    link: "",
  },
  {
    title: "Mobiles",
    link: "",
  },
  {
    title: "Speakers",
    link: "",
  },
  {
    title: "Earphones",
    link: "",
  },
];

const ProductsPage = () => {
  return (
    <div className="flex w-full flex-col">
      <AdminNavbar />

      <div className="p-5 pb-4 pt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-[500]">Products</h1>

          <div className="flex gap-2">
            <div className="flex py-2 p-1 rounded-full px-2 bg-slate-100 gap-2 items-center">
              <CiSearch className="text-2xl" />
              <input
                type="text"
                name=""
                className="bg-transparent outline-none w-[240px]"
                placeholder="Search product..."
                id=""
              />
            </div>

            <span className="border-l-[1px]"></span>

            <button className="flex items-center gap-2 py-2 px-5 rounded-full border-[1px] border-black">
              Add New Product <IoAddOutline className="text-xl" />
            </button>
          </div>
        </div>

        <div className="flex my-10 gap-2 justify-between w-full">
          <div className="flex no-scrollbar flex-row gap-2 overflow-x-scroll">
            {categories.map(({ link, title }) => {
              return (
                <div className="flex text-nowrap flex-nowrap cursor-pointer duration-500 ease-in-out transition-colors hover:bg-gray-100 py-2 px-4 rounded-full">
                  {title}
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <span className="border-l-[1px]"></span>

            <button className="flex text-nowrap text-gray-500 items-center gap-2 py-2 px-5 rounded-full border-[1px] border-gray-300">
              Sort by <MdSort className="text-xl" />
            </button>
          </div>
        </div>

        <div className="flex border-2">
          <AdminProduct />
          <AdminProduct />
          <AdminProduct />
          <AdminProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
