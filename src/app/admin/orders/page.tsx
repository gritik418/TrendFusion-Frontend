import AdminOrdersTable from "@/components/AdminOrdersTable/AdminOrdersTable";
import React from "react";

const AdminOrdersPage = () => {
  return (
    <div className="p-5 mt-6">
      <h1 className="text-2xl mb-4 md:text-3xl font-[500]">Orders</h1>
      <AdminOrdersTable />
    </div>
  );
};

export default AdminOrdersPage;
