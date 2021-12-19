const router = require('express').Router();
const commentCtrl = require('./../controllers/commentCtrl');
const { isAuthenticated } = require('./../middlewares/auth');

router.route('/').post(isAuthenticated, commentCtrl.createComment);

router.route('/:id').get(commentCtrl.getCommentsByBlog);

module.exports = router;