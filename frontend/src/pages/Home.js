import React, { useState, useMemo } from 'react';
import styles from './Home.module.css';

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

const ProductCard = React.memo(({ product }) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className={styles.card}>
      <img
        src={imageError ? 'https://via.placeholder.com/200' : product.image}
        alt={product.title}
        className={styles.image}
        onError={() => setImageError(true)}
      />
      <h3 className={styles.name}>{product.title}</h3>
      <p className={styles.price}>
        {new Intl.NumberFormat('ru-RU').format(Number(product.price))} ₸
      </p>
      <div className={styles.buttons}>
        <button className={styles.cartButton} aria-label="Добавить в корзину">➕</button>
        <button className={styles.likeButton} aria-label="Добавить в избранное">❤️</button>
      </div>
    </div>
  );
});

export default function Home() {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return productsData.filter(product =>
      product.title.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

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
          aria-label="Поле поиска товаров"
        />
        {query && (
          <button
            className={styles.clearSearch}
            onClick={() => setQuery('')}
            aria-label="Очистить поиск"
          >
            ×
          </button>
        )}
      </div>
      <div className={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className={styles.message}>
            {query ? 'Товары не найдены' : 'Нет доступных товаров'}
          </p>
        )}
      </div>
    </div>
  );
}
