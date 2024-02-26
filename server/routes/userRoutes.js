const { register, login, setAvatar, getAllusers, getUserDetails } = require('../controller/userController');
const authenticateUser = require('../middlewares/authMiddlware');
const checkProfileImageSet = require('../middlewares/infoMiddleware');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setAvatar', authenticateUser, setAvatar);
router.get('/getAllUsers', authenticateUser, checkProfileImageSet, getAllusers)
router.get('/userDetails', authenticateUser,checkProfileImageSet, getUserDetails);

module.exports = router;