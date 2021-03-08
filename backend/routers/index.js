const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.post(
  '/signup',
  // celebrate({
  //   body: Joi.object().keys({
  //     name: Joi.string().min(2).max(30),
  //     password: Joi.string().min(6).required(),
  //     email: Joi.string().required().email(),
  //     about: Joi.string().min(2).max(30),
  //     avatar: Joi.string()
  //       .required()
  //       .pattern(
  //         /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/,
  //       ),
  //   }),
  // }),
  createUser,
);

router.post(
  '/signin',
  // celebrate({
  //   body: Joi.object().keys({
  //     password: Joi.string().min(6).required(),
  //     email: Joi.string().required().email(),
  //   }),
  // }),
  login,
);

// router.use(auth);
router.use('/users', auth, userRoutes); //
router.use('/cards', auth, cardRoutes); //

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
