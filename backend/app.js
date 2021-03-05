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

// const options = {
//   origin: [
//     '*',
//     // 'http://localhost:8080',
//     // 'http://ktulu92.students.nomoredomains.monster',
//     // 'https://ktulu92.students.nomoredomains.monster',
//     // 'https://api.ktulu92.students.nomoredomains.monster',
//     // 'http://api.ktulu92.students.nomoredomains.monster',
//   ],
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'autorization'],
//   credentials: true,
// };

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

app.use('/', exapp.use('*', cors()); // ПЕРВЫМ!
