import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Orders.module.css';

function Orders() {
  const orders = useSelector(state => state.orders);
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  if (orders.length === 0) {
    return (
      <div className={styles.ordersContainer}>
        <p>У вас пока нет заказов.</p>
        <button className={styles.homeButton} onClick={handleGoHome}>
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    <div className={styles.ordersContainer}>
      <h2>Мои заказы</h2>
      {orders.map(order => (
        <div key={order.id} className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <p><strong>Номер заказа:</strong> {order.id}</p>
            <p><strong>Дата:</strong> {new Date(order.date).toLocaleString()}</p>
            <p><strong>Итого:</strong> {order.total} ₸</p>
          </div>
          <ul className={styles.orderItemsList}>
            {order.items.map(item => (
              <li key={item.id} className={styles.orderItem}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className={styles.orderItemImage} 
                />
                <span className={styles.orderItemName}>{item.name}</span>
                <span className={styles.orderItemPrice}>
                  {item.price} ₸ x {item.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button className={styles.homeButton} onClick={handleGoHome}>
        Вернуться на главную
      </button>
    </div>
  );
}

export default Orders;
