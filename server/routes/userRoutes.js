const { register, login, setAvatar, getAllusers } = require('../controller/userController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar);
router.get('/getAllUsers', getAllusers)

module.exports = router;