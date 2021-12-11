const router = require('express').Router();
const authCtrl = require('./../controllers/authCtrl');

router.post('/register', authCtrl.register);
router.post('/activate', authCtrl.activate);
router.post('/login', authCtrl.login);

module.exports = router;