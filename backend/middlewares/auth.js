const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { autorization } = req.headers;

  if (!autorization || !autorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Авторизируйтесь'));
  }

  const token = autorization.replace('Bearer ', ' ');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key'); // добавить jwt ключ
  } catch (err) {
    next(new UnauthorizedError('Авторизируйтесь'));
  }

  req.user = payload;
  return next();
};
module.exports = auth;
