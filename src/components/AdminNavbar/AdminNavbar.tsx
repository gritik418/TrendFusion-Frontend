import Link from "next/link";
import React from "react";
import { UserNav } from "../ui/user-nav";

const AdminNavbar = () => {
  return (
    <div className="border-2 shadow-lg sticky top-0 bg-white z-50">
      <div className="flex items-center justify-between px-1 py-2 md:px-3 lg:px-6">
        <div className="flex gap-4">
          <Link href={"#"}>Overview</Link>
          <Link href={"#"}>Customers</Link>
          <Link href={"#"}>Orders</Link>
          <Link href={"/admin/dashboard/products"}>Products</Link>
        </div>

        <div className="p-1">
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
