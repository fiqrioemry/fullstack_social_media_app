const router = require('express').Router();
const { upload } = require('../../middleware/media');
const isAuthenticate = require('../../middleware/isAuthenticate');
const { sendChat, getChat, getChats } = require('../../controller/chat');

router.get('/', isAuthenticate, getChats);
router.get('/:receiverId', isAuthenticate, getChat);
router.post('/:receiverId', upload().single('image'), isAuthenticate, sendChat);

module.exports = router;
