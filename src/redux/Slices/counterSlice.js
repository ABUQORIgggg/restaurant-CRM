// src/features/counter/counterSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example async function
export const fetchCount = createAsyncThunk(
  'counter/fetchCount',
  async () => {
    const response = await fetch('https://api.example.com/count');
    const data = await response.json();
    return data.count;
  }
);

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    status: 'idle',
    error: null
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
