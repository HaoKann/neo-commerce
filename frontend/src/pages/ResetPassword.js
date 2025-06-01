// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'; // используем те же стили

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:4000/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при отправке письма');
      }

      setMessage('Инструкция по восстановлению отправлена на email.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.registerTitle}>Восстановление пароля</h2>

      {error && (
        <div className={styles.errorAlert}>
          <span>{error}</span>
        </div>
      )}
      {message && (
        <div className={styles.successAlert}>
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Введите email:</label>
          <input
            type="email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Восстановить
        </button>
      </form>

      <button onClick={() => navigate('/login')} className={styles.backButton}>
        ← Вернуться ко входу
      </button>
    </div>
  );
}
