// src/components/Products.js
import React, { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/products/get-products')
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сети');
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Ожидался массив товаров');
        }
        setProducts(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка товаров...</p>;
  if (error) return <p style={{color: 'red'}}>Ошибка: {error}</p>;

  return (
    <div>
      <h2>Товары</h2>
      <ul style={{listStyle: 'none', padding: 0}}>
        {products.map(product => (
          <li key={product.id} style={{marginBottom: '20px'}}>
            <h3>{product.name}</h3>
            <p>Цена: {product.price} ₸</p>
            <img src={`http://localhost:4000${product.image}`} alt={product.name} width={150} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
