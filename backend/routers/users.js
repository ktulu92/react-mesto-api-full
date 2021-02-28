const router = require('express').Router();

const controller = require('../controllers/users');

router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);

router.patch('/me', controller.updateProfile);
router.patch('/avatar', controller.updateAvatar);

module.exports = router;
