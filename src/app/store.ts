import adminAuthApi from "@/features/api/admin/adminAuthApi";
import authApi from "@/features/api/authApi";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(adminAuthApi.middleware),
});

export default store;
