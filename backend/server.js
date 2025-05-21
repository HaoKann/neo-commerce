// Backend (Node.js + Express)
//  Главный файл сервера на Express
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
const users = [];

// Регистрация
app.post('/api/users/register', (req, res) => {
  const { email, password } = req.body;
  
  // Валидация
  if (!email || !password) {
    return res.status(400).json({ error: 'Email и пароль обязательны' });
  }

  if (users.some(u => u.email === email)) {
    return res.status(409).json({ error: 'Пользователь уже существует' });
  }

  // В реальном проекте: хеширование пароля!
  const user = { id: users.length + 1, email, password };
  users.push(user);
  
  res.status(201).json({ 
    success: true,
    user: { id: user.id, email: user.email } 
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});