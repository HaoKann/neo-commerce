// Backend (Node.js + Express)
//  Главный файл сервера на Express

const express = require('express');
const app = express();
const PORT = 4000;

const cors = require('cors');
app.use(cors());
app.use(express.json()); // Для обработки JSON-запросов

const products = require('./data/electronic/products.json');

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`); // Используйте обратные кавычки ``
});