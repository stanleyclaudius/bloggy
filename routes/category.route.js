const router = require('express').Router();
const categoryCtrl = require('./../controllers/categoryCtrl');

router.route('/')
  .get(categoryCtrl.getCategory)
  .post(categoryCtrl.createCategory);

router.route('/:id')
  .patch(categoryCtrl.updateCategory)
  .delete(categoryCtrl.deleteCategory);