import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products/get-products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Проверка, что данные - массив и содержат необходимые поля
        if (!Array.isArray(data)) {
          throw new Error('Ожидался массив товаров');
        }
        
        // Добавляем проверку наличия обязательных полей
        const validatedProducts = data.map(item => ({
          id: item.id || Math.random().toString(36).substr(2, 9),
          name: item.name || 'Без названия',
          price: item.price || 0,
          image: item.image || 'https://via.placeholder.com/200'
        }));
        
        setProducts(validatedProducts);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    // Безопасная проверка свойства name
    const productName = product.name ? product.name.toLowerCase() : '';
    const searchQuery = query.toLowerCase();
    return productName.includes(searchQuery);
  });

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Все товары</h1>

      <input
        type="text"
        placeholder="Поиск товара..."
        className={styles.searchInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {error ? (
        <div className={styles.error}>
          ⚠️ Произошла ошибка: {error}
        </div>
      ) : loading ? (
        <p className={styles.message}>Загрузка товаров...</p>
      ) : filteredProducts.length === 0 ? (
        <div className={styles.empty}>
          <img 
            src="/media/alerts/empty-cart.png" 
            alt="Товары не найдены"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/100';
            }}
          />
          <p className={styles.message}>
            {query ? 'Товары не найдены' : 'Нет доступных товаров'}
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map(product => (
            <div key={product.id} className={styles.card}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.image}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200';
                }}
              />
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>{product.price} ₸</p>
              <div className={styles.buttons}>
                <button className={styles.cartButton}>➕</button>
                <button className={styles.likeButton}>❤️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}