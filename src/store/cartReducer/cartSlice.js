import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    plusBike(state, action) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (findItem) {
        findItem.counter++;
      } else {
        state.items.push({
          ...action.payload,
          counter: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.counter;
      }, 0);
    },

    minusBike(state, action) {
      const findItem = state.items.find(
        (item) => item.id === action.payload,
      );
      if (findItem.counter > 1) {
        findItem.counter--;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload,
        );
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.counter;
      }, 0);
    },

    clearData(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    removeItem(state, action) {
      const findItem = state.items.find(
        (item) => item.id === action.payload,
      );
      if (findItem) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload,
        );
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.counter;
      }, 0);
    },
  },
});

// Action creators are generated for each case reducer function
export const { plusBike, minusBike, clearData, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
