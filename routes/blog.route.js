const router = require('express').Router();
const blogCtrl = require('./../controllers/blogCtrl');
const { isAuthenticated } = require('./../middlewares/auth');

router.route('/')
  .get(blogCtrl.getHomeBlogs)
  .post(isAuthenticated, blogCtrl.createBlog);

router.route('/category/:id').get(blogCtrl.getCategoryBlogs);

module.exports = router;