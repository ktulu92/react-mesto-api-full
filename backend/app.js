const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const router = require('./routers');

const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const PORT = 3000;
const app = express();

app.use('*', cors()); // ПЕРВЫМ!
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connection.on('open', () => console.log('коннект!'));
mongoose.connection.on('error', () => console.log('ошибка'));

// next();

app.use(requestLogger);

// ...

// обработчики ошибок
app.use(errors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger); // подключаем логгер ошибок



app.use((err, req, res, next) => {
 if(err.status){
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Ошибка валидации';
  }
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Передан некорректный токен';
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    statusCode = 409;
    message = 'Пользователь с таким email уже есть';
  }
   return res.status(err.status).send({message:err.message})
 }
 res.status(500).send({message:err.message})
});


app.listen(PORT, () => {
  console.log(`application run on port ${PORT}`);
});


