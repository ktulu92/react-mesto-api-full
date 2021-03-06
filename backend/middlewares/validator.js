const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL } = require('validator');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom((value) => {
        if (!isURL(value)) {
          throw new CelebrateError();
        }
        return value;
      }),
  }),
});

// ПОДШАМАНИТЬ
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .custom((value) => {
        if (!isURL(value)) {
          throw new CelebrateError();
        }
        return value;
      }),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().min(24).max(24),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().min(24).max(24),
  }),
});

module.exports = {
  validateLogin,
  validateProfile,
  validateAvatar,
  validateCreateCard,
  validateCardId,
  validateUserId,
};
