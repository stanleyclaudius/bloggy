const Blog = require('./../models/Blog');
const mongoose = require('mongoose');

const blogCtrl = {
  getHomeBlogs: async(req, res) => {
    const categoryQuery = [];
    for (let i = 0; i < req.query.category?.length; i++) {
      categoryQuery.push(mongoose.Types.ObjectId(req.query.category[i]));
    }

    const aggregation = [
      {
        $lookup: {
          "from": "users",
          "let": {user_id: "$user"},
          "pipeline": [
            {$match: {$expr: {$eq: ["$_id", "$$user_id"]}}},
            {$project: {password: 0, role: 0, type: 0, createdAt: 0, updatedAt: 0}}
          ],
          "as": "user"
        }
      },
      {$unwind: "$user"},
      {
        $lookup: {
          "from": "categories",
          "localField": "category",
          "foreignField": "_id",
          "as": "category"
        }
      },
      {$unwind: "$category"},
      {
        $group: {
          _id: "$category._id",
          name: { $first: "$category.name" },
          blogs: { $push: "$$ROOT" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          blogs: {
            $slice: ['$blogs', 0, 4]
          },
          name: 1,
          count: 1
        }
      }
    ];
    
    if (categoryQuery.length !== 0) {
      aggregation.unshift({
        $match: {
          category: {$in: categoryQuery}
        }
      });
    }

    try {
      const blogs = await Blog.aggregate(aggregation);

      res.status(200).json({blogs});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
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