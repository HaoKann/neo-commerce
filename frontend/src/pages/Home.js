import React, { useState, useEffect, useMemo } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const productsData = [
  {
    "id": 1,
    "title": "SoundCore Q30",
    "price": "15000",
    "image": "/images/products/electronics/soundcore-q30.jpg"
  },
  {
    "id": 2,
    "title": "Anker PowerCore",
    "price": "3500",
    "image": "/images/products/electronics/anker-power-core.jpg"
  },
  {
    "id": 3,
    "title": "Case iPhone 15",
    "price": "1200",
    "image": "/images/products/electronics/iphone-15-case.jpg"
  },
  {
    "id": 4,
    "title": "Galaxy Watch 6",
    "price": "25000",
    "image": "/images/products/electronics/galaxywatch6.jpg"
  },
  {
    "id": 5,
    "title": "JBL Flip 6",
    "price": "5500",
    "image": "/images/products/electronics/flip-6.jpg"
  },
  {
    "id": 6,
    "title": "Logitech G502",
    "price": "4200",
    "image": "/images/products/electronics/g502.jpg"
  },
  {
    "id": 7,
    "title": "Anker 735",
    "price": "2800",
    "image": "/images/products/electronics/anker735.jpg"
  },
  {
    "id": 8,
    "title": "SanDisk 128GB",
    "price": "2100",
    "image": "/images/products/electronics/sandisk.jpg"
  },
  {
    "id": 9,
    "title": "Spigen Case",
    "price": "1100",
    "image": "/images/products/electronics/spigen.jpg"
  },
  {
    "id": 10,
    "title": "HUAWEI FreeBuds 5i",
    "price": "7000",
    "image": "/images/products/electronics/huawei.jpg"
  },
  {
    "id": 11,
    "title": "Xiaomi 5000mAh",
    "price": "2500",
    "image": "/images/products/electronics/xiaomi.jpg"
  },
  {
    "id": 12,
    "title": "Kingston 64GB",
    "price": "1800",
    "image": "/images/products/electronics/kingston.jpg"
  }
];
export default function Home() {
  const [query, setQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 👈 временно true, чтобы работало
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [cartItems, favorites]);

  const filteredProducts = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return productsData.filter(product =>
      product.title.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const cartItemsCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const handleAddToCart = (product) => {
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

  const handleAddToFavorites = (productId) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  return (
    <div className={styles.home}>
      {/* Навигационная панель */}
      <nav className={styles.navBar}>
        <div className={styles.navLeft}>
          <Link to="/favorites" className={styles.navButton}>
            <span className={styles.navIcon}>❤️</span> Избранное
            {favorites.length > 0 && <span className={styles.badge}>{favorites.length}</span>}
          </Link>
          {isLoggedIn && (
            <Link to="/orders" className={styles.navButton}>
              <span className={styles.navIcon}>📦</span> Мои заказы
            </Link>
          )}
        </div>

        <div className={styles.navRight}>
          <Link to="/cart" className={styles.cartButton}>
            <span className={styles.navIcon}>🛒</span>
            {cartItemsCount > 0 && <span className={styles.badge}>{cartItemsCount}</span>}
          </Link>

          {!isLoggedIn ? (
            <button
              className={styles.loginButton}
              onClick={() => setShowLoginModal(true)}
            >
              Вход
            </button>
          ) : (
            <button
              className={styles.logoutButton}
              onClick={() => setIsLoggedIn(false)}
            >
              Выйти
            </button>
          )}
        </div>
      </nav>

      {/* Модальное окно входа */}
      {showLoginModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Вход в аккаунт</h3>
            <div className={styles.modalContent}>
              <input type="text" placeholder="Email" className={styles.modalInput} />
              <input type="password" placeholder="Пароль" className={styles.modalInput} />
              <button className={styles.modalLoginButton} onClick={handleLogin}>
                Войти
              </button>
              <button
                className={styles.modalCloseButton}
                onClick={() => setShowLoginModal(false)}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Основной контент */}
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