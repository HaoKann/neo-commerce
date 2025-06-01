import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToFavorites, removeFromFavorites } from '../store/favoritesSlice';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const [imageError, setImageError] = React.useState(false);
  const isFavorite = favorites.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    }));
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }));
    }
  };

  return (
    <div className={styles.card}>
      <img
        src={imageError ? 'https://via.placeholder.com/200' : product.image}
        alt={product.title}
        className={styles.image}
        onError={() => setImageError(true)}
      />
      <h3 className={styles.name}>{product.title}</h3> {/* ✅ ПРАВИЛЬНО */}
      <p className={styles.price}>
        {new Intl.NumberFormat('ru-RU').format(product.price)} ₸
      </p>
      <div className={styles.buttons}>
        <button
          className={styles.cartButton}
          onClick={handleAddToCart}
          aria-label="Добавить в корзину"
        >
          ➕
        </button>
        <button
          className={`${styles.likeButton} ${isFavorite ? styles.active : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
