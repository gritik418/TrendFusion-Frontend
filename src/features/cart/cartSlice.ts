import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart, getCartCount } from "./cartAPI";

const initialState = {
  cart: {},
  cartCount: 0,
};

export const getCartAsync = createAsyncThunk("cart/getCart", async () => {
  const response = await getCart();
  return response;
});

export const getCartCountAsync = createAsyncThunk(
  "cart/getCartCount",
  async () => {
    const response = await getCartCount();
    return response;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartAsync.fulfilled, (state, action) => {
        if (action.payload?.cart) {
          state.cart = action.payload.cart;
        }
      })
      .addCase(getCartCountAsync.fulfilled, (state, action) => {
        if (action.payload?.cartCount) {
          state.cartCount = action.payload.cartCount;
        }
      });
  },
});

export const selectCart = (state: any) => state.cart.cart;
export const selectCartCount = (state: any) => state.cart.cartCount;

export default cartSlice;
