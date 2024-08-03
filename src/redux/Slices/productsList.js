import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example async function
export const productlist = createAsyncThunk(
  'productsList/fetchProductsList',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products; // Assuming the API returns products, not users
  }
);

const productsList = createSlice({
  name: 'productsList',
  initialState: {
    status: 'idle',
    data: null,
    loading: true,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(productlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(productlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.loading = false; // Ensure loading state is false
      })
      .addCase(productlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false; // Ensure loading state is false
      });
  }
});

export default productsList.reducer;