import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import styles from './Header.module.css';

const Header = () => {
  const { 
    isLoggedIn, 
    handleLogout, 
    cartTotalPrice, 
    favoritesCount, 
    cartItemsCount 
  } = useAppContext();

  return (
    <nav className={styles.navBar}>
      <div className={styles.navLeft}>
        <Link to="/favorites" className={styles.navButton}>
          <span className={styles.navIcon}>❤️</span> Избранное
          {favoritesCount > 0 && (
            <span className={styles.badge}>{favoritesCount}</span>
          )}
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
          {cartItemsCount > 0 && (
            <span className={styles.cartSum}>
              {cartItemsCount} ({cartTotalPrice} ₸)
            </span>
          )}
        </Link>

        {!isLoggedIn ? (
          <Link to="/auth" className={styles.loginButton}>
            Вход
          </Link>
        ) : (
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;