const router = require('express').Router();

const controller = require('../controllers/cards.js');

router.get('/', controller.getCards);

router.post('/', controller.createCard);

router.delete('/:cardId', controller.deleteCard);

router.put('/:cardId/likes', controller.likeCard);

router.delete('/:cardId/likes', controller.dislikeCard);

module.exports = router;
