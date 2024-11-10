import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart } from "./cartAPI";

const initialState = {
  cart: {},
};

export const getCartAsync = createAsyncThunk("cart/getCart", async () => {
  const response = await getCart();
  return response;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartAsync.fulfilled, (state, action) => {
      if (action.payload?.cart) {
        state.cart = action.payload.cart;
      }
    });
  },
});

export const selectCart = (state: any) => state.cart.cart;

export default cartSlice;
