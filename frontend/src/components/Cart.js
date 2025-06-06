import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { addOrder } from '../store/ordersSlice';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Cart.module.css';
import emptyCartIcon from '../assets/media/alerts/empty-cart.svg';
import successOrderIcon from '../assets/media/alerts/success-order.svg';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = () => {
    if (!orderPlaced && cartItems.length > 0) {
      const newOrder = {
        id: Date.now(),
        items: cartItems,
        total: totalPrice,
        date: new Date().toISOString(),
      };
      dispatch(addOrder(newOrder));
      dispatch(clearCart());
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
          <p className={styles.successSubtext}>
            Ваш заказ скоро будет передан курьерской службе
          </p>
        </div>
      ) : cartItems.length === 0 ? (
        <div className={styles.emptyBlock}>
          <img
            src={emptyCartIcon}
            alt="Корзина пуста"
            className={styles.emptyIcon}
          />
          <p className={styles.emptyCart}>Ваша корзина пуста</p>
          {/* Кнопка возвращения на главную */}
          <Link to="/" className={styles.backToHomeButton}>
            ← Вернуться на главную страницу
          </Link>
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
                onClick={() => dispatch(removeFromCart(item.id))}
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
      <strong>Общая сумма:</strong> {totalPrice} ₸
    </p>

    {/* Сначала кнопка оформить заказ */}
    <button onClick={handleOrder} className={styles.orderButton}>
      {orderPlaced ? '← Вернуться на главную страницу' : 'Оформить заказ'}
    </button>

    {/* Потом кнопка "вернуться на главную" */}
    <Link to="/" className={styles.backButton}>
      Вернуться на главную
    </Link>
  </div>
)}
    </div>
  );
}

export default Cart;