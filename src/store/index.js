import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartReducer/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
