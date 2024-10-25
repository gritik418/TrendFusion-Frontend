import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSuggestions } from "./productApi";

const initialState = {
  suggestions: [],
};

export const getSuggestionsAsync = createAsyncThunk(
  "product/getSuggestions",
  async (searchQuery: string) => {
    const response = await getSuggestions(searchQuery);
    return response;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestionsAsync.pending, (state, action) => {
        state.suggestions = [];
      })
      .addCase(getSuggestionsAsync.fulfilled, (state, action) => {
        state.suggestions = action.payload.data;
      })
      .addCase(getSuggestionsAsync.rejected, (state, action) => {
        state.suggestions = [];
      });
  },
});

export const selectSuggestions = (state: any) => state.product.suggestions;

export default productSlice;
