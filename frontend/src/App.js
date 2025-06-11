import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Cart from './components/Cart';
import Orders from './pages/Orders';
import AuthForm from './pages/AuthForm';
import ResetPassword from './pages/ResetPassword';
import Products from './components/Products';

// Создание контекста
const AppContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedLogin = localStorage.getItem('isLoggedIn');
    if (savedLogin === 'true') setIsLoggedIn(true);

    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);

    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);

    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const cartTotalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  }, [cartItems]);

  const cartItemsCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const favoritesCount = favorites.length;

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Функция для оформления заказа
  const handleOrder = () => {
    if (cartItems.length === 0) return;

    const newOrder = {
      id: Date.now(),
      date: new Date(),
      total: cartTotalPrice,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.title || `Товар #${item.id}`,
        price: item.price,
        quantity: item.quantity,
        image: item.image || '',
      })),
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    setCartItems([]);
  };

  // Функции для работы с корзиной
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Функции для работы с избранным
  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter(id => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  const isFavorite = (productId) => favorites.includes(productId);

  // Провайдер контекста
  const contextValue = {
    isLoggedIn,
    cartItems,
    setCartItems,
    favorites,
    setFavorites,
    cartTotalPrice,
    cartItemsCount,
    favoritesCount,
    handleLogout,
    handleLogin,
    toggleFavorite,
    isFavorite,
    addToCart,
    removeFromCart,
    clearCart,
    orders,
    setOrders,
    handleOrder,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

// Хук для использования контекста
export const useAppContext = () => useContext(AppContext);

export default App;