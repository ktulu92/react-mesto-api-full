const Card = require('../models/cards');
// const NotFoundError = require('../errors/NotFoundError');
// const ForbiddenError = require('../errors/ForbiddenError');
const ServerError = require('../errors/ServerError');

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
  const {_id:userId} = req.user;

  Card.findByIdAndDelete(cardId)
  .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Карточки нет")
      }
      else if (card.owner.toString() !===req.user._id ){
        throw new ForbiddenError("Запрещено удалять чужую карточку!");
      }
       res.status(200).send({"Вы удалили свою карточку"});
      }.catch (error) {
        next(error);
      }
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
        throw new NotFoundError("Карточки нет")
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new  BadRequestError("Карточки нет")
      } else {
        res.status(500).send({ message: `Ошибка сервера ${err}` });
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
        throw new NotFoundError("Карточки нет")
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ForbiddenError') {
        throw new ForbiddenError("Запрещено лайкать чужую карточку!");
      } else {
        res.status(500).send({ message: `Ошибка сервера ${err}` });
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
