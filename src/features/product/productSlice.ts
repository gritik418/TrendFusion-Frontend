import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSuggestions, searchProducts } from "./productAPI";

const initialState = {
  suggestions: [],
  loading: false,
  products: [],
  minPrice: null,
  maxPrice: null,
  filters: null,
};

export const getSuggestionsAsync = createAsyncThunk(
  "product/getSuggestions",
  async (searchQuery: string) => {
    const response = await getSuggestions(searchQuery);
    return response;
  }
);

export const searchProductsAsync = createAsyncThunk(
  "product/searchProducts",
  async ({
    searchQuery,
    maxPrice,
    minPrice,
  }: {
    searchQuery: string;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const response = await searchProducts(searchQuery, minPrice, maxPrice);
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
      })
      .addCase(searchProductsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.products = action.payload.products;
          state.filters = action.payload.filters;
          state.minPrice = action.payload.minPrice;
          state.maxPrice = action.payload.maxPrice;
        }
      })
      .addCase(searchProductsAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const selectSuggestions = (state: any) => state.product.suggestions;
export const selectSearchProductLoading = (state: any) => state.product.loading;
export const selectMinPrice = (state: any) => state.product.minPrice;
export const selectMaxPrice = (state: any) => state.product.maxPrice;
export const selectProducts = (state: any) => state.product.products;
export const selectFilters = (state: any) => state.product.filters;

export default productSlice;
