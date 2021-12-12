const router = require('express').Router();
const blogCtrl = require('./../controllers/blogCtrl');
const { isAuthenticated } = require('./../middlewares/auth');

router.route('/')
  .post(isAuthenticated, blogCtrl.createBlog);

module.exports = router;