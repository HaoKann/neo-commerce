import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ isLoggedIn, onLogout, cartTotalPrice, favoritesCount, cartItemsCount }) => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.navLeft}>
        <Link to="/favorites" className={styles.navButton}>
          <span className={styles.navIcon}>❤️</span> Избранное
          {favoritesCount > 0 && <span className={styles.badge}>{favoritesCount}</span>}
        </Link>
        {isLoggedIn && (
          <Link to="/orders" className={styles.navButton}>
            <span className={styles.navIcon}>📦</span> Мои заказы
          </Link>
        )}
      </div>

      <div className={styles.navRight}>
        <Link to="/cart" className={styles.cartButton}>
          <span className={styles.navIcon}>🛒</span>
          {cartItemsCount > 0 && <span className={styles.cartSum}>{cartItemsCount} ({cartTotalPrice} ₽)</span>}
        </Link>

        {!isLoggedIn ? (
          <Link to="/auth" className={styles.loginButton}>
            Вход
          </Link>
        ) : (
          <button
            className={styles.logoutButton}
            onClick={onLogout}
          >
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;