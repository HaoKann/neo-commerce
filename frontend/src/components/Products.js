import React, { useEffect, useState } from 'react';
import { useAppContext } from '../App';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setCartItems, cartItems } = useAppContext(); // Добавил cartItems для отладки

  useEffect(() => {
    fetch('http://localhost:4000/api/products/get-products')
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сети');
        return res.json();
      })
      .then(data => {
        console.log('Данные из API:', data); // Для отладки
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

  const handleAddToCart = (product) => {
    console.log('Добавляем в корзину:', product);
    setCartItems(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    console.log('Текущее состояние корзины:', cartItems); // Для отладки
  };

  if (loading) return <p>Загрузка товаров...</p>;
  if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;

  return (
    <div>
      <h2>Товары</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: '20px' }}>
            <h3>{product.name}</h3>
            <p>Цена: {product.price} ₸</p>
            <img src={`http://localhost:4000${product.image}`} alt={product.name} width={150} />
            <button
              onClick={() => handleAddToCart(product)}
              style={{
                backgroundColor: '#8758D4',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Добавить в корзину
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;