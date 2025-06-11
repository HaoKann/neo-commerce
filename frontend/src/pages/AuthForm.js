import React, { useState } from 'react';
import { useAppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function AuthForm() {
  const { handleLogin } = useAppContext();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Здесь обычно запрос к API
    if (loginData.email && loginData.password) {
      handleLogin(); // Обновляем isLoggedIn в контексте
      setError('');
      navigate('/'); // Перенаправляем на главную страницу
    } else {
      setError('Заполните все поля');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Здесь обычно запрос к API
    if (registerData.email && registerData.password && registerData.confirmPassword) {
      if (registerData.password !== registerData.confirmPassword) {
        setError('Пароли не совпадают');
        return;
      }
      setError('');
      // Логика регистрации (например, запрос к серверу)
      // Временное сообщение об успехе
      alert('Регистрация успешна! Пожалуйста, войдите.');
      setRegisterData({ email: '', password: '', confirmPassword: '' }); // Очистка формы
      // Можно добавить navigate('/auth') для возврата к форме входа
    } else {
      setError('Заполните все поля');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formsWrapper}>
        <div className={styles.formContainer}>
          <h2 className={styles.registerTitle}>Вход</h2>
          {error && <div className={styles.errorAlert}>{error}</div>}
          <form onSubmit={handleLoginSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input
                type="email"
                className={styles.inputField}
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Пароль</label>
              <input
                type="password"
                className={styles.inputField}
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
            <button type="submit" className={styles.submitButton}>Войти</button>
          </form>
        </div>
        <div className={styles.formContainer}>
          <h2 className={styles.registerTitle}>Регистрация</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input
                type="email"
                className={styles.inputField}
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Пароль</label>
              <input
                type="password"
                className={styles.inputField}
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Подтвердите пароль</label>
              <input
                type="password"
                className={styles.inputField}
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              />
            </div>
            <button type="submit" className={styles.submitButton}>Зарегистрироваться</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;