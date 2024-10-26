import adminAuthApi from "@/features/api/admin/adminAuthApi";
import adminProductAPi from "@/features/api/admin/adminProductApi";
import authApi from "@/features/api/authApi";
import productApi from "@/features/api/productApi";
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/features/product/productSlice";
import userReducer from "@/features/user/userSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [adminProductAPi.reducerPath]: adminProductAPi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [productReducer.name]: productReducer.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(adminAuthApi.middleware)
      .concat(adminProductAPi.middleware)
      .concat(productApi.middleware),
});

export default store;
