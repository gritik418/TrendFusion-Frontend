import adminAuthApi from "@/features/api/admin/adminAuthApi";
import adminProductAPi from "@/features/api/admin/adminProductApi";
import authApi from "@/features/api/authApi";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [adminProductAPi.reducerPath]: adminProductAPi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(adminAuthApi.middleware)
      .concat(adminProductAPi.middleware),
});

export default store;
