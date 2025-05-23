# neo-commerce
# 🛒 Neo-Commerce

Fullstack приложение интернет-магазина, выполненное в рамках демонстрационного экзамена **WorldSkills Almaty 2025** по компетенции *"Веб-технологии"*.

## 🔧 Стек технологий

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Хранилище данных:** JSON (без базы данных)

## ⚙️ Функционал

- ✅ Отображение всех товаров
- 🔍 Поиск товаров
- 🔐 Регистрация / Вход
- ❤️ Избранное
- 🛒 Корзина
- 📦 Оформление заказа
- 📃 Просмотр оформленных заказов
- 🚪 Выход из аккаунта

## 🧩 Страницы и компоненты

- Главная страница
- Страница входа / регистрации
- Избранное
- Корзина
- Мои заказы

## 🚀 Запуск проекта локально

Запуск frontend и backend одновременно
npm start

### 1. Клонируй репозиторий:

```bash
git clone https://github.com/HaoKann/neo-commerce.git
cd neo-commerce

2. Установите зависимости:
   ```bash
   # Бэкенд
   cd backend
   npm install
   
   # Фронтенд
   cd ../frontend
   npm install
   ```

## Запуск

Из корневой папки проекта:
```bash
npm install -g concurrently
npm start
```

Серверы запустятся:
- Бэкенд: http://localhost:4000
- Фронтенд: http://localhost:3000

Для продакшена:
```bash
# Сборка фронтенда
cd frontend
npm run build

# Запуск бэкенда
cd ../backend
node server.js
```