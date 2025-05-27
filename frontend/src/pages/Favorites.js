import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import styles from './Favorites.module.css';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites.items);

  return (
    <div className={styles.favorites}>
      <h1>Избранное</h1>
      
      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p>В избранном пока нет товаров</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;