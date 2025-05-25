// # Главный компонент
// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './components/Products'; // Импортируем компонент Products (создай папку components и туда файл Products.js)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} /> {/* Новый роут для товаров */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
