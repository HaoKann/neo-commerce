import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      const product = action.payload;
      const exists = state.items.some(item => item.id === product.id);
      
      if (!exists) {
        state.items.push(product);
      }
    },
    removeFromFavorites: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;