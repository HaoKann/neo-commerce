import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import styles from './Home.module.css';

const productsData = [
  { id: 1, title: "SoundCore Q30", price: "15000", image: "/images/products/electronics/soundcore-q30.jpg" },
  { id: 2, title: "Anker PowerCore", price: "3500", image: "/images/products/electronics/anker-power-core.jpg" },
  { id: 3, title: "Case iPhone 15", price: "1200", image: "/images/products/electronics/iphone-15-case.jpg" },
  { id: 4, title: "Galaxy Watch 6", price: "25000", image: "/images/products/electronics/galaxywatch6.jpg" },
  { id: 5, title: "JBL Flip 6", price: "5500", image: "/images/products/electronics/flip-6.jpg" },
  { id: 6, title: "Logitech G502", price: "4200", image: "/images/products/electronics/g502.jpg" },
  { id: 7, title: "Anker 735", price: "2800", image: "/images/products/electronics/anker735.jpg" },
  { id: 8, title: "SanDisk 128GB", price: "2100", image: "/images/products/electronics/sandisk.jpg" },
  { id: 9, title: "Spigen Case", price: "1100", image: "/images/products/electronics/spigen.jpg" },
  { id: 10, title: "HUAWEI FreeBuds 5i", price: "7000", image: "/images/products/electronics/huawei.jpg" },
  { id: 11, title: "Xiaomi 5000mAh", price: "2500", image: "/images/products/electronics/xiaomi.jpg" },
  { id: 12, title: "Kingston 64GB", price: "1800", image: "/images/products/electronics/kingston.jpg" },
];

export default function Home({ isLoggedIn, cartItems, setCartItems, favorites, setFavorites }) {
  const [query, setQuery] = useState('');

  // Фильтр товаров по поиску
  const filteredProducts = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return productsData.filter(product =>
      product.title.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  // Добавить в корзину
  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      window.location.href = '/auth';
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Добавить/удалить из избранного
  const handleAddToFavorites = (productId) => {
    if (!isLoggedIn) {
      window.location.href = '/auth';
      return;
    }

    const updatedFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];

    setFavorites(updatedFavorites);
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Все товары</h1>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск товара..."
          className={styles.searchInput}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && (
          <button
            className={styles.clearSearch}
            onClick={() => setQuery('')}
          >
            ×
          </button>
        )}
      </div>

      <div className={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToFavorites={handleAddToFavorites}
              isFavorite={favorites.includes(product.id)}
            />
          ))
        ) : (
          <p className={styles.message}>Товары не найдены</p>
        )}
      </div>
    </div>
  );
}