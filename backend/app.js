require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const { errors } = require('celebrate');

const router = require('./routes');

const app = express();

// app.use(cors({
//   credentials: true,
//   maxAge: 30,
//   origin: [
//     'http://localhost:3000',
//     'http://mesto-web.nomoredomainsmonster.ru',
//     'https://mesto-web.nomoredomainsmonster.ru',
//     'https://api.mesto-web.nomoredomainsmonster.ru'
//   ],
// }));

// app.options('*', cors());

const { FoundError } = require('./middlewares/foundError');
const { errorHandler } = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');

app.use(cors);

const { PORT, DB_ADDRESS } = process.env;

app.use(express.json());

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(() => {
  throw new FoundError('Страница не найдена', 404);
});

app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
