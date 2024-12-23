import adminAuthApi from "@/features/api/admin/adminAuthApi";
import adminProductAPi from "@/features/api/admin/adminProductApi";
import authApi from "@/features/api/authApi";
import productApi from "@/features/api/productApi";
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "@/features/product/productSlice";
import userSlice from "@/features/user/userSlice";
import cartApi from "@/features/api/cartApi";
import cartSlice from "@/features/cart/cartSlice";
import orderApi from "@/features/api/orderApi";
import wishlistApi from "@/features/api/wishlistApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [adminProductAPi.reducerPath]: adminProductAPi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [productSlice.name]: productSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(adminAuthApi.middleware)
      .concat(adminProductAPi.middleware)
      .concat(productApi.middleware)
      .concat(cartApi.middleware)
      .concat(orderApi.middleware)
      .concat(wishlistApi.middleware),
});

export default store;
