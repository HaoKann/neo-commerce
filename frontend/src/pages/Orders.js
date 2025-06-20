import React from 'react';
import { useAppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import styles from './Orders.module.css';
import nonOrdersIcon from '../assets/media/alerts/non-orders.png';

function Orders() {
  const { orders, handleOrder } = useAppContext(); // Добавляем handleOrder для возможного использования
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  if (!orders || orders.length === 0) {
    return (
      <div className={styles.ordersContainer}>
        <h2 className={styles.title}>Мои заказы</h2>
        <img
          src={nonOrdersIcon}
          alt="Нет заказов"
          className={styles.nonOrdersIcon}
        />
        <p className={styles.noOrdersBold}>У вас нет заказов</p>
        <p className={styles.noOrdersSubText}>Добавьте товары в корзину.</p>
        <p className={styles.noOrdersSubText}>Оформите хотя бы один заказ.</p>
        <div className={styles.backContainer}>
          <button className={styles.backButton} onClick={handleGoHome}>
            ← Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.ordersContainer}>
      <h2 className={styles.title}>Мои заказы</h2>
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

      <div className={styles.backContainer}>
        <button className={styles.backButton} onClick={handleGoHome}>
          Вернуться на главную
        </button>
      </div>
    </div>
  );
}

export default Orders;