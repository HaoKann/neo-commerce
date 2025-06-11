import React from 'react';
import styles from '../pages/Home.module.css'; // Импортируем стили

function ProductCard({ product, onAddToCart, onAddToFavorites, isFavorite }) {
  const handleAddToCartClick = () => {
    onAddToCart(product);
  };

  const handleAddToFavoritesClick = () => {
    // Передаем ID товара (как ожидает родительский компонент)
    onAddToFavorites(product.id);
  };

  return (
    <div className={styles.card}>
      {/* Контейнер для изображения с фиксированными размерами */}
      <div className={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.title} 
          className={styles.image}
        />
      </div>
      
      {/* Название товара */}
      <h3 className={styles.name}>{product.title}</h3>
      
      {/* Цена товара */}
      <p className={styles.price}>
        {product.price} ₸
      </p>
      
      {/* Кнопки действий */}
      <div className={styles.buttons}>
        <button
          onClick={handleAddToCartClick}
          className={styles.cartButton}
        >
          <span role="img" aria-label="cart">🛒</span> В корзину
        </button>
        
        <button
          onClick={handleAddToFavoritesClick}
          className={`${styles.likeButton} ${isFavorite ? styles.active : ''}`}
        >
          {isFavorite ? 'Убрать' : 'В избранное'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;