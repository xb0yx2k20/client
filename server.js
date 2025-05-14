const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// Замените на ваш токен бота и ID чата
const botToken = process.env.BOT_TOKEN || "YOUR_BOT_TOKEN";
const chatId = process.env.CHAT_ID || "YOUR_CHAT_ID"; // Например, @example или числовой ID чата

const bot = new TelegramBot(botToken, { polling: false });

// Middleware
app.use(cors());
app.use(express.json());

// Маршрут для обработки формы
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Проверка наличия всех полей
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  // Формирование сообщения для Telegram
  const telegramMessage = `
📩 Новое сообщение из формы обратной связи:
👤 Имя: ${name}
📧 Email: ${email}
💬 Сообщение: ${message}
  `;

  try {
    // Отправка сообщения в Telegram
    await bot.sendMessage(chatId, telegramMessage);
    res.status(200).json({ message: "Сообщение успешно отправлено" });
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error);
    res.status(500).json({ error: "Ошибка сервера при отправке сообщения" });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});