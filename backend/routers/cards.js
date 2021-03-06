const router = require('express').Router();
const { validateCreateCard, validateCardId } = require('../middlewares/validator');

const controller = require('../controllers/cards.js');

router.get('/', controller.getCards);

router.post('/', validateCreateCard, controller.createCard);

router.delete('/:cardId', validateCardId, controller.deleteCard);

router.put('/:cardId/likes', validateCardId, controller.likeCard);

router.delete('/:cardId/likes', validateCardId, controller.dislikeCard);

module.exports = router;
