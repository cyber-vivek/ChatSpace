const router = require('express').Router();
const {addMessage, getAllMessages} = require('../controller/messageController')

router.post('/addMessage', addMessage);
router.post('/getMessages', getAllMessages)

module.exports = router;