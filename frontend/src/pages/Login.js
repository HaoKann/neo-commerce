import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/users/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка входа');
      }

      const result = await response.json();
      localStorage.setItem('token', result.token);

      // Обновляем статус входа в App
      onLogin();

      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetClick = () => {
    setShowReset(true);
    setError('');
    setResetSent(false);
  };

  const handleSendReset = async (e) => {
    e.preventDefault();
    setError('');
    if (!resetEmail) {
      setError('Пожалуйста, введите email');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:4000/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при отправке инструкции');
      }

      setResetSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.registerTitle}>{showReset ? 'Восстановление пароля' : 'Вход'}</h2>

      {error && (
        <div className={styles.errorAlert}>
          <span className={styles.errorText}>{error}</span>
        </div>
      )}

      {!showReset ? (
        <>
          <form onSubmit={handleSubmit} className={styles.registerForm}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={styles.inputField}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Пароль:</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={styles.inputField}
                required
              />
            </div>

            <button type="submit" disabled={isLoading} className={styles.submitButton}>
              {isLoading ? 'Загрузка...' : 'Войти'}
            </button>
          </form>

          <div className={styles.linkButtons}>
            <button type="button" className={styles.forgotPasswordBtn} onClick={handleResetClick}>
              Забыли пароль?
            </button>

            <button
              type="button"
              className={styles.registerRedirectBtn}
              onClick={() => navigate('/register')}
            >
              Зарегистрироваться
            </button>
          </div>
        </>
      ) : (
        <>
          {!resetSent ? (
            <form onSubmit={handleSendReset} className={styles.registerForm}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Email:</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>
              <button type="submit" disabled={isLoading} className={styles.submitButton}>
                {isLoading ? 'Отправка...' : 'Отправить инструкцию'}
              </button>
            </form>
          ) : (
            <p>Инструкция для смены пароля отправлена на вашу почту.</p>
          )}

          <button
            type="button"
            className={styles.backButton}
            onClick={() => {
              setShowReset(false);
              setResetEmail('');
              setError('');
              setResetSent(false);
            }}
          >
            ← Вернуться ко входу
          </button>
        </>
      )}
    </div>
  );
}
