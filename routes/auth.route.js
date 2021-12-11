const router = require('express').Router();
const authCtrl = require('./../controllers/authCtrl');

router.post('/register', authCtrl.register);
router.post('/activate', authCtrl.activate);
router.post('/login', authCtrl.login);
router.post('/login_google', authCtrl.googleLogin);
router.post('/login_facebook', authCtrl.facebookLogin);
router.post('/login_sms', authCtrl.smsLogin);
router.post('/verify_otp', authCtrl.verifyOTP);
router.get('/logout', authCtrl.logout);
router.get('/refresh_token', authCtrl.refreshToken);

module.exports = router;