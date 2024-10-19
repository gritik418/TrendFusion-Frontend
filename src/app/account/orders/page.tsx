import OrderItem from "@/components/OrderItem/OrderItem";
import { Separator } from "@/components/ui/separator";
import React from "react";

const orders: Order[] = [
  {
    orderId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    userId: "",
    orderDate: new Date("2024-10-01"),
    expectedDeliveryDate: new Date("2024-10-05"),
    deliveredOn: new Date("2024-10-04"),
    status: "Delivered",
    items: [
      {
        productId: "1",
        title: "Wireless Mouse",
        brand: "Logitech",
        thumbnail:
          "https://m.media-amazon.com/images/I/51hZtBRUFBL._SX679_.jpg",
        quantity: 1,
        unitPrice: 29.99,
        unitDiscount: { discountType: "Percentage", value: 10 },
        color: "Black",
        size: "N/A",
      },
      {
        productId: "2",
        title: "Mechanical Keyboard",
        brand: "Razer",
        thumbnail:
          "https://m.media-amazon.com/images/I/613Tk-Ci6NL._SX679_.jpg",
        quantity: 1,
        unitPrice: 99.99,
        color: "Black",
        size: "N/A",
      },
    ],
    itemCount: 2,
    totalQuantity: 2,
    totalPrice: 129.98,
    discount: { discountType: "Percentage", value: 10 },
    finalPrice: 116.98,
    paymentMethod: "Credit Card",
    deliveryAddress: {
      firstName: "John",
      lastName: "Doe",
      city: "New York",
      state: "NY",
      street: "123 Main St",
      postalCode: "10001",
      phoneNumber: "123-456-7890",
      isDefault: true,
      addressType: "home",
    },
    trackingId: "TRACK123456",
  },
  {
    orderId: "c8e6b8e5-f2dc-4ab1-bf8b-6a91a6a62b3b",
    userId: "",
    orderDate: new Date("2024-10-02"),
    expectedDeliveryDate: new Date("2024-10-06"),
    status: "Pending",
    items: [
      {
        productId: "3",
        title: "Bluetooth Headphones",
        brand: "Sony",
        thumbnail:
          "https://m.media-amazon.com/images/I/61H9yOSWJwL._SX679_.jpg",
        quantity: 2,
        unitPrice: 79.99,
        color: "Blue",
        size: "N/A",
      },
      {
        productId: "4",
        title: "Wireless Charger",
        brand: "Anker",
        thumbnail:
          "https://m.media-amazon.com/images/I/51iBj48i8zL._SX679_.jpg",
        quantity: 1,
        unitPrice: 25.99,
        color: "Black",
        size: "N/A",
      },
    ],
    itemCount: 3,
    totalQuantity: 3,
    totalPrice: 185.97,
    finalPrice: 185.97,
    paymentMethod: "PayPal",
    deliveryAddress: {
      firstName: "Jane",
      lastName: "Doe",
      city: "Los Angeles",
      state: "CA",
      street: "456 Elm St",
      postalCode: "90001",
      phoneNumber: "987-654-3210",
      isDefault: false,
      addressType: "work",
    },
  },
  {
    orderId: "d12b8f82-8b1c-4e34-bf68-b3d8d2555589",
    userId: "",
    orderDate: new Date("2024-10-03"),
    expectedDeliveryDate: new Date("2024-10-07"),
    status: "Shipped",
    items: [
      {
        productId: "5",
        title: "Gaming Monitor",
        brand: "ASUS",
        thumbnail:
          "https://m.media-amazon.com/images/I/61464LZYZML._SX679_.jpg",
        quantity: 1,
        unitPrice: 299.99,
        color: "Black",
        size: "N/A",
      },
      {
        productId: "6",
        title: "HDMI Cable",
        brand: "Belkin",
        thumbnail:
          "https://m.media-amazon.com/images/I/71FJV+tHvQL._SX679_.jpg",
        quantity: 2,
        unitPrice: 15.99,
        color: "Black",
        size: "N/A",
      },
    ],
    itemCount: 3,
    totalQuantity: 3,
    totalPrice: 331.97,
    finalPrice: 331.97,
    paymentMethod: "Bank Transfer",
    deliveryAddress: {
      firstName: "Alice",
      lastName: "Smith",
      city: "Chicago",
      state: "IL",
      street: "789 Oak St",
      postalCode: "60601",
      phoneNumber: "555-123-4567",
      isDefault: true,
      addressType: "home",
    },
  },
  {
    orderId: "5e7a7e54-c12c-4c64-bc82-2556b5a3d509",
    userId: "",
    orderDate: new Date("2024-10-04"),
    expectedDeliveryDate: new Date("2024-10-08"),
    status: "Cancelled",
    items: [
      {
        productId: "7",
        title: "Smartphone",
        brand: "Apple",
        thumbnail:
          "https://m.media-amazon.com/images/I/71GLMJ7TQiL._SX679_.jpg",
        quantity: 1,
        unitPrice: 999.99,
        color: "Silver",
        size: "N/A",
      },
    ],
    itemCount: 1,
    totalQuantity: 1,
    totalPrice: 1049.98,
    finalPrice: 1049.98,
    paymentMethod: "Credit Card",
    deliveryAddress: {
      firstName: "Bob",
      lastName: "Johnson",
      city: "Houston",
      state: "TX",
      street: "101 Pine St",
      postalCode: "77001",
      phoneNumber: "321-654-9870",
      isDefault: false,
      addressType: "home",
    },
  },
  {
    orderId: "bc58ef8b-f64c-4b9c-bc83-3be21e4d8bc0",
    userId: "",
    orderDate: new Date("2024-10-05"),
    expectedDeliveryDate: new Date("2024-10-09"),
    status: "Delivered",
    items: [
      {
        productId: "8",
        title: "Laptop",
        brand: "Dell",
        thumbnail:
          "https://m.media-amazon.com/images/I/71GLMJ7TQiL._SX679_.jpg",
        quantity: 1,
        unitPrice: 899.99,
        color: "Gray",
        size: "N/A",
      },
      {
        productId: "9",
        title: "Laptop Sleeve",
        brand: "Inateck",
        thumbnail:
          "https://m.media-amazon.com/images/I/51r6v5HdiiL._SX679_.jpg",
        quantity: 1,
        unitPrice: 29.99,
        color: "Black",
        size: "N/A",
      },
    ],
    itemCount: 2,
    totalQuantity: 2,
    totalPrice: 929.98,
    finalPrice: 929.98,
    paymentMethod: "Credit Card",
    deliveryAddress: {
      firstName: "Emma",
      lastName: "Taylor",
      city: "San Francisco",
      state: "CA",
      street: "202 Maple St",
      postalCode: "94101",
      phoneNumber: "456-789-0123",
      isDefault: true,
      addressType: "work",
    },
    trackingId: "TRACK987654",
  },
  {
    orderId: "30f6f03e-ec41-4b36-b735-ec89126a6c71",
    userId: "",
    orderDate: new Date("2024-10-06"),
    expectedDeliveryDate: new Date("2024-10-10"),
    status: "Pending",
    items: [
      {
        productId: "10",
        title: "Action Camera",
        brand: "GoPro",
        thumbnail:
          "https://m.media-amazon.com/images/I/315Hg3Saq5L._SX300_SY300_QL70_FMwebp_.jpg",
        quantity: 1,
        unitPrice: 299.99,
        color: "Black",
        size: "N/A",
      },
      {
        productId: "11",
        title: "Camera Mount",
        brand: "Joby",
        thumbnail:
          "https://m.media-amazon.com/images/I/31f6qOjO5dL._SX300_SY300_QL70_FMwebp_.jpg",
        quantity: 1,
        unitPrice: 49.99,
        color: "Black",
        size: "N/A",
      },
    ],
    itemCount: 2,
    totalQuantity: 2,
    totalPrice: 349.98,
    finalPrice: 349.98,
    paymentMethod: "Cash on Delivery",
    deliveryAddress: {
      firstName: "Liam",
      lastName: "Brown",
      city: "Seattle",
      state: "WA",
      street: "303 Birch St",
      postalCode: "98101",
      phoneNumber: "654-321-0987",
      isDefault: false,
      addressType: "home",
    },
  },
  {
    orderId: "4f81e56d-45ee-4f57-bb73-fb7aaab21c8c",
    userId: "",
    orderDate: new Date("2024-10-07"),
    expectedDeliveryDate: new Date("2024-10-11"),
    status: "Shipped",
    items: [
      {
        productId: "12",
        title: "Gaming Chair",
        brand: "Secretlab",
        thumbnail:
          "https://m.media-amazon.com/images/I/41j6OT+U9AL._SY300_SX300_.jpg",
        quantity: 1,
        unitPrice: 349.99,
        color: "Black",
        size: "N/A",
      },
      {
        productId: "13",
        title: "Gaming Desk",
        brand: "Arozzi",
        thumbnail:
          "https://m.media-amazon.com/images/I/41EqeTWGDLL._SX300_SY300_QL70_FMwebp_.jpg",
        quantity: 1,
        unitPrice: 199.99,
        color: "White",
        size: "N/A",
      },
    ],
    itemCount: 2,
    totalQuantity: 2,
    totalPrice: 549.98,
    finalPrice: 549.98,
    paymentMethod: "Bank Transfer",
    deliveryAddress: {
      firstName: "Olivia",
      lastName: "Martinez",
      city: "Miami",
      state: "FL",
      street: "404 Cedar St",
      postalCode: "33101",
      phoneNumber: "789-012-3456",
      isDefault: true,
      addressType: "work",
    },
  },
];

const Orders = () => {
  return (
    <div className="w-full">
      <div className="w-full mb-6">
        <h1 className="text-3xl mb-3">My Orders</h1>
        <Separator />
      </div>

      <div className="flex flex-col">
        {orders ? (
          orders.map((order: Order) => (
            <OrderItem key={order.orderId} order={order} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Orders;
