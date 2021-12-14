const router = require('express').Router();
const userCtrl = require('./../controllers/userCtrl');
const { isAuthenticated } = require('./../middlewares/auth');

router.route('/:id')
  .get(userCtrl.getUserProfile)
  .patch(isAuthenticated, userCtrl.updateProfile);

module.exports = router;