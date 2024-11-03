import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "./userAPI";

const initialState = {
  user: {},
  userLoading: false,
  cartCount: 0,
};

export const getUserAsync = createAsyncThunk("user/getUser", async () => {
  const response = await getUser();
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state, action) => {
        state.userLoading = true;
        state.user = {};
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload.data;
        if (action.payload.cartCount) {
          state.cartCount = action.payload.cartCount;
        }
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.userLoading = false;
        state.user = {};
      });
  },
});

export const selectUser = (state: any) => state.user.user;
export const selectCartCount = (state: any) => state.user.cartCount;

export default userSlice;
