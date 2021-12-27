const router = require('express').Router();
const authCtrl = require('./../controllers/authCtrl');
const { isAuthenticated } = require('./../middlewares/auth');

router.post('/register', authCtrl.register);
router.post('/activate', authCtrl.activate);
router.post('/login', authCtrl.login);
router.post('/login_google', authCtrl.googleLogin);
router.post('/login_facebook', authCtrl.facebookLogin);
router.post('/login_sms', authCtrl.smsLogin);
router.post('/verify_otp', authCtrl.verifyOTP);
router.get('/logout', isAuthenticated, authCtrl.logout);
router.get('/refresh_token', authCtrl.refreshToken);
router.post('/forget_password', authCtrl.forgetPassword);
router.patch('/reset', authCtrl.resetPassword);

module.exports = router;