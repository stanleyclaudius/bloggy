const Category = require('./../models/Category');

const categoryCtrl = {
  getCategory: async(req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({categories});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  createCategory: async(req, res) => {
    try {
      const {name, description} = req.body;

      if (!name || !description)
        return res.status(400).json({msg: 'Please fill up every field.'});

      const findCategory = await Category.findOne({name});
      if (findCategory)
        return res.status(400).json({msg: `Category with name ${name} exists already.`});

      const newCategory = new Category({
        name,
        description
      });
      await newCategory.save();

      res.status(200).json({
        category: newCategory,
        msg: `Category with name ${newCategory.name} has been created.`
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  updateCategory: async(req, res) => {
    try {
      const {name, description} = req.body;

      if (!name || !category)
        return res.status(400).json({msg: 'Please fill up every field.'});

      const category = await Category.findOneAndUpdate({_id: req.params.id}, {name, description}, {new: true});
      res.status(200).json({
        category,
        msg: `Category with ID ${req.params.id} has been updated.`
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  deleteCategory: async(req, res) => {
    try {
      await Category.findOneAndDelete({_id: req.params.id});
      res.status(200).json({msg: `Category with ID ${req.params.id} has been deleted.`});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
}

module.exports = categoryCtrl;