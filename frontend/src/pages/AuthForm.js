import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

export default function AuthForm({ onLogin }) {
  const navigate = useNavigate();

  // Состояние для формы входа
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Состояние для формы регистрации
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '' });
  const [registerError, setRegisterError] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);

  // Обработчик изменений для формы входа
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  // Обработчик изменений для формы регистрации
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  // Обработчик отправки формы входа
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    const url = 'http://localhost:4000/api/users/sign-in';
    const body = {
      email: loginData.email,
      password: loginData.password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка входа');
      }

      const result = await response.json();
      localStorage.setItem('token', result.token);
      onLogin();
      navigate('/');
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  // Обработчик отправки формы регистрации
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterError('');

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Пароли не совпадают');
      setRegisterLoading(false);
      return;
    }

    const url = 'http://localhost:4000/api/users/register';
    const body = {
      email: registerData.email,
      password: registerData.password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка регистрации');
      }

      setRegisterData({ email: '', password: '', confirmPassword: '' });
      setRegisterError('');
      alert('Регистрация успешна! Теперь вы можете войти.');
    } catch (err) {
      setRegisterError(err.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formsWrapper}>
        {/* Форма входа */}
        <div className={styles.formContainer}>
          <h2 className={styles.registerTitle}>Вход</h2>
          {loginError && (
            <div className={styles.errorAlert}>
              <span className={styles.errorText}>{loginError}</span>
            </div>
          )}
          <form onSubmit={handleLoginSubmit} className={styles.registerForm}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Пароль</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className={styles.inputField}
                required
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loginLoading}
            >
              {loginLoading ? 'Загрузка...' : 'Войти'}
            </button>
            
          </form>
        </div>

        {/* Форма регистрации */}
        <div className={styles.formContainer}>
          <h2 className={styles.registerTitle}>Регистрация</h2>
          {registerError && (
            <div className={styles.errorAlert}>
              <span className={styles.errorText}>{registerError}</span>
            </div>
          )}
          <form onSubmit={handleRegisterSubmit} className={styles.registerForm}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Пароль</label>
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Подтвердите пароль</label>
              <input
                type="password"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                className={styles.inputField}
                required
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={registerLoading}
            >
              {registerLoading ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}