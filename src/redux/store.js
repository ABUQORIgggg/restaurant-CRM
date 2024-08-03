// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/Slices/counterSlice';
import usersListReducer from '../redux/Slices/usersListSlice';
import productsListReducer from '../redux/Slices/productsList';
import userDataReducer from '../redux/Slices/userDataSlice'; // Import the new slice

const store = configureStore({
  reducer: {
    counter: counterReducer,
    usersList: usersListReducer,
    productsList: productsListReducer,
    userData: userDataReducer, // Add the new slice
  },
});

export default store;
