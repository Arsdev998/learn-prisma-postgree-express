// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import favoritesReducer from './features/auth/favoritesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer
  },
});

export default store;
