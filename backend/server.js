// Backend (Node.js + Express)
//  Главный файл сервера на Express

const express = require('express');
// Временная база данных (в оперативной памяти)
const users = [];

const cors = require('cors'); // Эта строка должна быть в начале файла
app.use(cors());

const app = express();
const PORT = 4000;

// Настройки CORS (добавьте после создания app, но до роутов)
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));



// Другие middleware (должны быть после CORS)
app.use(express.json());

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

// В backend/server.js добавьте тестовые данные
let products = [
  {
    id: 1,
    name: "Смартфон",
    price: 250000,
    image: "/images/phone.jpg"
  },
  {
    id: 2,
    name: "Ноутбук",
    price: 450000,
    image: "/images/laptop.jpg"
  }
];

app.get('/api/products/get-products', (req, res) => {
  res.json(products);
});


// Обработчик корневого маршрута
app.get('/', (req, res) => {
  res.send('Сервер работает! Добро пожаловать.');
});

const products = require('./data/electronic/products.json');

app.get('/api/products/get-products', (req, res) => {
  res.json(products);
});



app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});



app.get('/api/test', (req, res) => {
  res.json({ message: 'API работает!' });
});


app.post('/api/users/sign-in', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Неверный email или пароль' });
  }

  res.status(200).json({ success: true, user: { id: user.id, email: user.email } });
});
