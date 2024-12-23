interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  username: string;
  avatar?: string;
  isVerified: boolean;
  provider: "credentials" | "google";
  password?: string;
  verificationCode?: string;
  verificationCodeExpiry?: Date;
  gender: "male" | "female";
  phoneNumber: string;
  addresses: DeliveryAddress[];
  wishlist: Types.ObjectId[];
  userRole: "customer" | "admin" | "seller";
  orderHistory: Types.ObjectId[];
}

interface Product {
  _id: string;
  productId: string;
  title: string;
  brand?: string;
  description: string;
  thumbnail: string;
  isAvailable: boolean;
  images: string[];
  category?: string;
  price: number;
  warranty?: string;
  discount?: Discount;
  rating?: number;
  stock: number;
  color?: Color;
  size?: string;
  highlights: string[];
  specifications?: Specifications[];
  offers?: Offers[];
}

interface Order {
  orderId: string;
  userId: Types.ObjectId;
  orderDate: Date;
  expectedDeliveryDate?: Date;
  deliveredOn?: Date;
  status:
    | "Pending"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "Out for Delivery";
  items: OrderProductInfo[];
  itemCount: number;
  totalQuantity: number;
  totalPrice: number;
  discount?: number;
  finalPrice: number;
  paymentMethod:
    | "Credit Card"
    | "PayPal"
    | "Bank Transfer"
    | "Cash on Delivery";
  deliveryAddress: DeliveryAddress;
  trackingId?: string;
  deliveryCharges?: number;
  platformFee?: number;
}

interface Cart {
  userId: Types.ObjectId;
  items: { product: CartItem; quantity: number; updatedAt: Date }[];
  totalPrice: number;
  discount?: number;
  finalPrice: number;
  totalQuantity: number;
  deliveryCharges?: number;
  platformFee?: number;
}

interface Reviews {
  _id: string;
  user: {
    firstName: string;
    lastName?: string;
    email: string;
    username: string;
    avatar?: string;
  };
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  rating: number;
  title?: string;
  description?: string;
  images?: string[];
}

interface OrderProductInfo {
  title: string;
  _id: string;
  brand: string;
  thumbnail: string;
  quantity: number;
  unitPrice: number;
  unitDiscount?: Discount;
  color?: string;
  size?: string;
}

interface CartItem {
  _id: string;
  productId: string;
  title: string;
  brand: string;
  thumbnail: string;
  quantity: number;
  stock: number;
  price: number;
  discount?: Discount;
  color?: Color;
  size?: string;
}

type Variants = {
  colorName: string;
  colorImage: string;
  size: VariantSize[];
};

type Color = {
  colorName: string;
  colorImage: string;
};

type VariantSize = {
  size: string;
  slug: string;
};

interface Specifications {
  category: string;
  specs: {
    [key: string]: string;
  }[];
}

interface Offers {
  offerType: string;
  offer: string;
}

interface DeliveryAddress {
  _id: string;
  firstName: string;
  lastName?: string;
  city: string;
  state: string;
  street: string;
  postalCode: string;
  landmark?: string;
  appartment?: string;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  isDefault: boolean;
  addressType: "home" | "work";
}

interface Discount {
  discountType: "Percentage" | "Fixed";
  value: number;
  description?: string;
}

interface WishlistItem {
  _id: string;
  productId: string;
  title: string;
  brand?: string;
  thumbnail: string;
  isAvailable: boolean;
  price: number;
  discount?: Discount;
  stock: number;
  color?: Color;
  rating?: number;
  size?: string;
}

interface JWTPayload extends JwtPayload {
  id: string;
  email: string;
}

type LoginDataType = {
  identifier: string;
  password: string;
};

type LoginErrors = {
  identifier?: string;
  password?: string;
};

type EmailVerificationDataType = {
  email: string;
  verificationCode: string;
};

type EmailVerificationErrors = {
  email?: string;
  verificationCode?: string;
};

type SignupDataType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupErrors = {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

interface AuthResponse {
  message: string;
  errors?: object;
  success: boolean;
}

interface Response {
  message: string;
  errors?: object;
  data?: any;
  success: boolean;
}

type ProductInfo = {
  title: string;
  brand?: string;
  description: string;
  category: string;
  stock: number;
  discountValue: number | undefined;
  discountDescription: string;
  size: string;
  price: number | undefined;
  warranty: string;
  colorName: string;
};

interface ProductErrors {
  productId?: string;
  title?: string;
  brand?: string;
  description?: string;
  thumbnail?: string;
  isAvailable?: string;
  images?: string;
  category?: string;
  price?: string;
  warranty?: string;
  discount?: string;
  rating?: string;
  stock?: string;
  color?: string;
  size?: string;
}

interface Subcategory {
  id: string; // Unique identifier for the subcategory
  name: string; // URL for the image representing the subcategory
  url: string; // URL for the subcategory page
}

interface Category {
  id: string; // Unique identifier for the category
  name: string; // Name of the category
  image: string; // URL for the image representing the category
  url: string; // URL for the category page
  subcategories?: Subcategory[]; // List of subcategories under this category
}
