import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import ProductCard from '../components/ProductCard';
import styles from './Favorites.module.css';
import nonFavoritesIcon from '../assets/media/alerts/non-favorites.png';

const Favorites = () => {
  const { favorites, addToCart, toggleFavorite, isFavorite } = useAppContext();
  // Импортируем productsData из Home.js или создаем аналогичный источник
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

  const favoriteProducts = productsData.filter(product => favorites.includes(product.id));

  return (
    <div className={styles.favorites}>
      <h1>Избранное</h1>

      {favorites.length === 0 ? (
        <>
          <img
            src={nonFavoritesIcon}
            alt="Нет закладок"
            className={styles.icon}
          />
          <p className={styles.noBookmarks}>Закладок нет :(</p>
          <p className={styles.subText}>Вы ничего не добавляли в закладки</p>
          <div className={styles.backContainer}>
            <Link to="/" className={styles.backButton}>
              ← Вернуться на главную
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className={styles.grid}>
            {favoriteProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onAddToCart={addToCart}
                onAddToFavorites={toggleFavorite}
                isFavorite={isFavorite(product.id)}
              />
            ))}
          </div>
          <div className={styles.backContainer}>
            <Link to="/" className={styles.backButton}>
              ← Вернуться на главную
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;