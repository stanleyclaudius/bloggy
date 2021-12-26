const router = require('express').Router();
const blogCtrl = require('./../controllers/blogCtrl');
const { isAuthenticated } = require('./../middlewares/auth');

router.route('/')
  .get(blogCtrl.getHomeBlogs)
  .post(isAuthenticated, blogCtrl.createBlog);

router.route('/search').get(blogCtrl.searchBlog);

router.route('/:id')
  .get(blogCtrl.getBlogById)
  .delete(isAuthenticated, blogCtrl.deleteBlog)
  .patch(isAuthenticated, blogCtrl.updateBlog);

router.route('/user/:id').get(blogCtrl.getBlogsByUser);
router.route('/category/:id').get(blogCtrl.getCategoryBlogs);

module.exports = router;