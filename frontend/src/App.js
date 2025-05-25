// # Главный компонент
// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        
      </Routes>
    </BrowserRouter>
  );
}



<Routes>
  <Route path="/" element={<Register />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  
</Routes>


export default App;
