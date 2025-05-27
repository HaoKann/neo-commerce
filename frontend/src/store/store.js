import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import favoritesReducer from './favoritesSlice';
import ordersReducer from './ordersSlice';  // импорт

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    orders: ordersReducer,  // добавляем сюда
  },
});
