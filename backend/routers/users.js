const router = require('express').Router();
const { validateLogin, validateProfile, validateAvatar } = require('../middlewares/validator');
const controller = require('../controllers/users');

router.get('/', controller.getUsers);
router.get('/me', controller.getUserInfo);

router.get('/:id', validateLogin, controller.getUser);

router.patch('/me', controller.updateProfile);
//validateProfile
router.patch('/avatar', validateAvatar, controller.updateAvatar);

module.exports = router;
