//  # React-компоненты - заголовок

import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <Link to="/register" className={styles.registerLink}>
          Регистрация
        </Link>
      </nav>
    </header>
  );
}