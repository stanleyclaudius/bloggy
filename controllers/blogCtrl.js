const Blog = require('./../models/Blog');

const blogCtrl = {
  createBlog: async(req, res) => {
    try {
      const {title, content, description, thumbnail, category} = req.body;
      if (!title || !content || !description || !thumbnail || !category)
        return res.status(400).json({msg: 'Please fill up every field.'});

      const newBlog = new Blog({
        user: req.user._id,
        title,
        content,
        description,
        thumbnail,
        category
      });
      await newBlog.save();

      res.status(200).json({
        blog: newBlog,
        msg: 'Blog has been created successfully.'
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
}

module.exports = blogCtrl;