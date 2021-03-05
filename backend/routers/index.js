const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { login, createUser } = require('../controllers/users');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      password: Joi.string().min(6).required(),
      email: Joi.string().required().email(),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      password: Joi.string().min(6).required(),
      email: Joi.string().required().email(),
    }),
  }),
  login,
);

// router.use(auth);
router.use('/users', userRoutes); //
router.use('/cards', cardRoutes); //

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
