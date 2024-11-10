import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "./userAPI";

const initialState = {
  user: {},
  userLoading: false,
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
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.userLoading = false;
        state.user = {};
      });
  },
});

export const selectUser = (state: any) => state.user.user;

export default userSlice;
