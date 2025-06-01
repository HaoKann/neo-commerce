import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import styles from './Favorites.module.css';
import nonFavoritesIcon from '../assets/media/alerts/non-favorites.png';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites.items);

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
            {favorites.map(product => (
              <ProductCard key={product.id} product={product} />
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
