import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ProductType = {
  id: number;
  title: string; // FakeStoreAPI uses title, not name
  price: number;
  description: string;
  category: string;
  image: string;
};

interface ProductState {
  products: ProductType[];
  loading: boolean;
  error: string | null;
}

// create initial state

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  }
);

// create slice

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Something went wrong";
      });
  },
});

export default productSlice.reducer;