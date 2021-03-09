const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
// const ForbiddenError = require('../errors/ForbiddenError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => {
      next(new ServerError('Ошибка на сервере'));
    });
};

const getUser = (req, res, next) => {
  // const { id } = req.params;
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password, avatar, about,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Email уже зарегистрирован');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      about, avatar, name, email, password: hash,
    }))
    .then((user) => {
      const { _id } = user;
      res.send({
        name, email, _id, avatar, about,
      });
    })

    .catch(next);
};


const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка валидации');
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(() => next(new UnauthorizedError('Неверный логин или пароль'))); // исправить ошибку
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => next(new UnauthorizedError('Неверный логин или пароль'))); // исправить ошибку
};

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const user = User.findById(_id);
  if (!user) {
    throw new Error('Пользователь не найден');
  }

  res.status(200).send(user)
  .catch(next);
};
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateAvatar,
  updateProfile,
  login,
  getUserInfo,
};
