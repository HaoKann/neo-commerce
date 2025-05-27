import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { addOrder } from '../store/ordersSlice';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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

      {orderPlaced && (
        <p className={styles.successMessage}>Заказ оформлен</p>
      )}

      {cartItems.length === 0 ? (
        <p className={styles.emptyCart}>Ваша корзина пуста</p>
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
    <button onClick={handleOrder} className={styles.orderButton}>
      {orderPlaced ? 'Вернуться на главную страницу' : 'Оформить заказ'}
    </button>
  </div>
)}

    </div>
  );
}

export default Cart;
