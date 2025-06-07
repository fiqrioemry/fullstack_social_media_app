const router = require('express').Router();
const auth = require('../../controller/auth');
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/google', auth.googleAuth);
router.post('/signup', auth.userSignUp);
router.post('/signin', auth.userSignIn);
router.post('/signout', auth.userSignOut);
router.post('/send-otp', auth.sendingOTP);
router.post('/verify-otp', auth.verifyOTP);
router.post('/refresh', auth.userAuthRefresh);
router.get('/me', isAuthenticate, auth.userAuthCheck);
router.get('/google/callback', auth.googleAuthCallback);

module.exports = router;
