// src/redux/Slices/userDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('userData')) || null,
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload)); // Save to localStorage
    },
    clearUserData: (state) => {
      state.user = null;
      localStorage.removeItem('userData'); // Remove from localStorage
    },
  },
});

export const { setUserData, clearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
