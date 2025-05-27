//  # React-компоненты - заголовок

<nav className={styles.nav}>
  <Link to="/" className={styles.logo}>Магазин</Link>
  <div className={styles.links}>
    <Link to="/favorites" className={styles.link}>
      Избранное
    </Link>
    <Link to="/cart" className={styles.link}>
      Корзина {totalQuantity > 0 && <span className={styles.badge}>{totalQuantity}</span>}
    </Link>
  </div>
</nav>