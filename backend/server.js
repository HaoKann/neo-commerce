const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000; // Используем переменную окружения или 4000

// Конфигурация CORS с явным указанием допустимых источников
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статические файлы
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Валидация данных пользователя
const validateUser = ({ email, password }) => {
  if (!email || !password) return 'Email и пароль обязательны';
  if (!/^\S+@\S+\.\S+$/.test(email)) return 'Некорректный email';
  if (password.length < 6) return 'Пароль должен содержать минимум 6 символов';
  return null;
};

// Маршруты
app.get('/', (req, res) => {
  res.json({ 
    status: 'working',
    message: 'Сервер работает! Добро пожаловать.',
    endpoints: {
      products: '/api/products/get-products',
      register: '/api/users/register',
      login: '/api/users/sign-in'
    }
  });
});

// Товары
const products = [
  {
    id: 1,
    name: "Смартфон",
    price: 250000,
    image: "/images/phone.jpg",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Ноутбук",
    price: 450000,
    image: "/images/laptop.jpg",
    createdAt: new Date().toISOString()
  }
];

app.get('/api/products/get-products', (req, res) => {
  try {
    res.set('Cache-Control', 'public, max-age=300');
    res.json(products); // Возвращаем просто массив без обертки
  } catch (error) {
    console.error('Ошибка получения товаров:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal Server Error' 
    });
  }
});
// Пользователи
const users = [];

app.post('/api/users/register', (req, res) => {
  try {
    const { email, password } = req.body;
    
    const validationError = validateUser({ email, password });
    if (validationError) {
      return res.status(400).json({ 
        success: false,
        error: validationError 
      });
    }

    if (users.some(u => u.email === email)) {
      return res.status(409).json({ 
        success: false,
        error: 'Пользователь уже существует' 
      });
    }

    const user = { 
      id: users.length + 1, 
      email, 
      password, // В реальном приложении нужно хешировать!
      createdAt: new Date().toISOString() 
    };
    
    users.push(user);
    
    res.status(201).json({ 
      success: true,
      data: { 
        id: user.id, 
        email: user.email 
      } 
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal Server Error' 
    });
  }
});

app.post('/api/users/sign-in', (req, res) => {
  try {
    const { email, password } = req.body;
    
    const validationError = validateUser({ email, password });
    if (validationError) {
      return res.status(400).json({ 
        success: false,
        error: validationError 
      });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'Неверный email или пароль' 
      });
    }

    res.json({ 
      success: true,
      data: { 
        id: user.id, 
        email: user.email 
      } 
    });
  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal Server Error' 
    });
  }
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Endpoint not found' 
  });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false,
    error: 'Internal Server Error' 
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log('Доступные эндпоинты:');
  console.log(`- GET /api/products/get-products`);
  console.log(`- POST /api/users/register`);
  console.log(`- POST /api/users/sign-in`);
});

module.exports = app; // Для тестирования