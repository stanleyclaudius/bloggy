const router = require('express').Router();
const commentCtrl = require('./../controllers/commentCtrl');
const { isAuthenticated } = require('./../middlewares/auth');

router.route('/').post(isAuthenticated, commentCtrl.createComment);

router.route('/reply').post(isAuthenticated, commentCtrl.replyComment);

router.route('/:id')
  .get(commentCtrl.getCommentsByBlog)
  .patch(isAuthenticated, commentCtrl.updateComment);

module.exports = router;