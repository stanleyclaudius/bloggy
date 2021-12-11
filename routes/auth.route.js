const router = require('express').Router();
const authCtrl = require('./../controllers/authCtrl');

router.post('/register', authCtrl.register);
router.post('/activate', authCtrl.activate);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.logout);
router.get('/refresh_token', authCtrl.refreshToken);

module.exports = router;