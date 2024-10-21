import AddProduct from "@/components/AddProduct/AddProduct";
import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const Products = () => {
  return (
    <div>
      <AdminNavbar />

      <div className="p-5 pb-4 pt-10">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">All Products</TabsTrigger>
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="add-product">
            <AddProduct />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Products;
