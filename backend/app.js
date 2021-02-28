const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const { errors, celebrate, Joi } = require('celebrate');
const router = require('./routers');

const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const PORT = 3002;
const app = express();
app.use(require('cors')());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connection.on('open', () => console.log('коннект!'));
mongoose.connection.on('error', () => console.log('ошибка'));

// next();

app.use(requestLogger);

// app.use(logger);

app.use('/', express.static('public'));
app.use('/', router);

// app.use(auth); авторизировать в роутах
// app.post('/signin', login);
// app.post('/signup', createUser);

app.use(errorLogger); // подключаем логгер ошибок

app.listen(PORT, () => {
  console.log(`application run on port ${PORT}`);
});
