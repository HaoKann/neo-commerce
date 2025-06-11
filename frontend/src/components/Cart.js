import React, { useState } from 'react';
import { useAppContext } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Cart.module.css';
import emptyCartIcon from '../assets/media/alerts/empty-cart.svg';
import successOrderIcon from '../assets/media/alerts/success-order.svg';

function Cart() {
  const { cartItems, setCartItems, cartTotalPrice, cartItemsCount, handleOrder, clearCart } = useAppContext();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleRemoveFromCart = (itemId) => {
    // Фильтруем cartItems, оставляя только товары с id, отличным от itemId
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    if (!orderPlaced && cartItems.length > 0) {
      handleOrder(); // Используем handleOrder из App.js
      setOrderPlaced(true);
    } else if (orderPlaced) {
      navigate('/');
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Корзина</h2>

      {orderPlaced ? (
        <div className={styles.successBlock}>
          <img
            src={successOrderIcon}
            alt="Заказ оформлен"
            className={styles.successIcon}
          />
          <p className={styles.successMessage}>Заказ оформлен</p>
          <p className={styles.successSubText}>
            Ваш заказ скоро будет передан курьерской службе
          </p>
          {/* Убраны backContainer и backButton */}
        </div>
      ) : cartItems.length === 0 ? (
        <div className={styles.emptyBlock}>
          <img
            src={emptyCartIcon}
            alt="Корзина пуста"
            className={styles.emptyIcon}
          />
          <p className={styles.emptyCart}>Ваша корзина пуста</p>
          <div className={styles.backContainer}>
            <Link to="/" className={styles.backToHomeButton}>
              ← Вернуться на главную страницу
            </Link>
          </div>
        </div>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.cartItemImage}
              />
              <div className={styles.cartItemInfo}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>
                  {item.price} ₸ x {item.quantity}
                </p>
              </div>
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}

      {(cartItems.length > 0 || orderPlaced) && (
        <div className={styles.cartTotal}>
          <p className={styles.totalText}>
            <strong>Общая сумма:</strong> {cartTotalPrice} ₸
          </p>
          <button onClick={handleCheckout} className={styles.orderButton}>
            {orderPlaced ? '← Вернуться на главную страницу' : 'Оформить заказ'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;