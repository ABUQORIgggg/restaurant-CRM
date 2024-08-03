// src/redux/Slices/usersListSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example async function to fetch users
export const userListFetch = createAsyncThunk(
  'usersList/fetchUsersList',
  async () => {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    return data.users; // Assuming your API returns an object with a `users` array
  }
);



// Define the initial state
const initialState = {
  users: [],
  total: 0,
  skip: 0,
  limit: 30,
  status: 'idle',
  error: null
};

// Create a slice for managing users list state
const usersListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userListFetch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userListFetch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.total = action.payload.length; // Update total count
        state.skip += action.payload.length; // Increment skip for pagination
      })
      .addCase(userListFetch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Export the reducer function generated by createSlice
export default usersListSlice.reducer;