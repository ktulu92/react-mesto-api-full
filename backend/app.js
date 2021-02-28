const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routers');
const auth = require('./middlewares/auth');
const logger = require('./middlewares/logger');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '56029b0c53714e9654ddf1680', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  mongoose.connection.on('open', () => console.log('коннект!'));
  mongoose.connection.on('error', () => console.log('ошибка'));

  next();
});

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(requestLogger);

app.use(logger);

app.use('/', express.static('public'));
app.use('/', router);

app.use(auth);
// app.post('./signin', login);
// app.post('signup', createUser);

app.use(errorLogger); // подключаем логгер ошибок

// app.use(errors());

app.listen(PORT, () => {
  console.log(`application run on port ${PORT}`);
});
