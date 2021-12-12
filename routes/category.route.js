const router = require('express').Router();
const categoryCtrl = require('./../controllers/categoryCtrl');
const { isAuthenticated, authorizeRoles } = require('./../middlewares/auth');

router.route('/')
  .get(categoryCtrl.getCategory)
  .post(isAuthenticated, authorizeRoles('admin'), categoryCtrl.createCategory);

router.route('/:id')
  .patch(isAuthenticated, authorizeRoles('admin'), categoryCtrl.updateCategory)
  .delete(isAuthenticated, authorizeRoles('admin'), categoryCtrl.deleteCategory);

module.exports = router;