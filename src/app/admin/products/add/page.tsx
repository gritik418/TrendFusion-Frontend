import AddProduct from "@/components/AddProduct/AddProduct";
import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";
import React from "react";

const AddProductPage = () => {
  return (
    <div className="w-full">
      <AdminNavbar />
      <div className="flex flex-col px-4 w-full">
        <AddProduct />
      </div>
    </div>
  );
};

export default AddProductPage;
