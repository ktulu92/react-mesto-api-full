const Card = require('../models/cards');

const ServerError = require('../errors/ServerError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => next(new ServerError('Ошибка на сервере')));
};

const createCard = (req, res, next) => {
  const { name, link, owner = req.user._id } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch(() => next(new ServerError('Ошибка на сервере')));
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail(() => {
      throw new NotFoundError('Такой карточки нет');
    })

    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.remove().then((cardToDelete) => res.status(200).send({ data: cardToDelete }));
      } else {
        throw new ForbiddenError('Удалять можно только свои карточки');
      }
    })
    .catch(next);
};

const likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки нет');
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Карточки нет');
      } else {
        throw new ServerError('Ошибка на сервере');
      }
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки нет');
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ForbiddenError') {
        throw new ForbiddenError('Запрещено лайкать чужую карточку!');
      } else {
        throw new ServerError('Ошибка на сервере');
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
