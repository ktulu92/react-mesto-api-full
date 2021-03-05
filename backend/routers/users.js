const router = require('express').Router();

const cors = require('cors');
const controller = require('../controllers/users');

const options = {
  origin: [
    '*',
    // 'http://localhost:8080',
    // 'http://ktulu92.students.nomoredomains.monster',
    // 'https://ktulu92.students.nomoredomains.monster',
    // 'https://api.ktulu92.students.nomoredomains.monster',
    // 'http://api.ktulu92.students.nomoredomains.monster',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'autorization'],
  credentials: true,
};



router.use('*', cors(options)); // ПЕРВЫМ!

router.get('/', controller.getUsers);
router.get('/me', controller.getUserInfo);

router.get('/:id', controller.getUser);

router.patch('/me', controller.updateProfile);
router.patch('/avatar', controller.updateAvatar);

module.exports = router;
