const Comment = require('./../models/Comment');
const mongoose = require('mongoose');

const Pagination = req => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;

  return {page, limit, skip};
}

const commentCtrl = {
  getCommentsByBlog: async(req, res) => {
    const {limit, skip} = Pagination(req);

    try {
      const data = await Comment.aggregate([
        {
          $facet: {
            totalData: [
              { $match: { blog_id: mongoose.Types.ObjectId(req.params.id) } },
              {
                $lookup: {
                  "from": "users",
                  "let": {user_id: "$user"},
                  "pipeline": [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { name: 1, avatar: 1 } }
                  ],
                  "as": "user"
                }
              },
              { $unwind: "$user" },
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit }
            ],
            totalCount: [
              { $match: { blog_id: mongoose.Types.ObjectId(req.params.id) } },
              { $count: 'count' }
            ]
          }
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1
          }
        }
      ]);
  
      const commentsData = data[0].totalData;
      const commentsCount = data[0].count;

      let totalPage = 0;
      if (commentsCount % limit === 0) {
        totalPage = commentsCount / limit;
      } else {
        totalPage = Math.floor(commentsCount / limit) + 1;
      }

      res.status(200).json({
        comments: commentsData,
        totalPage
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  createComment: async(req, res) => {
    try {
      const {content, user, blog_id, blog_user_id} = req.body;

      if (!content)
        return res.status(400).json({msg: 'Comment content can\'t be empty.'});

      const newComment = new Comment({
        content,
        user,
        blog_id,
        blog_user_id
      });
      await newComment.save();

      res.status(200).json({
        msg: 'Comment has been created successfully.',
        comment: newComment
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  updateComment: async(req, res) => {
    try {
      const comment = await Comment.findOneAndUpdate({
        _id: req.params.id,
        user: req.user._id
      }, {content: req.body.content}, {new: true});

      res.status(200).json({
        msg: 'Comment has been updated successfully.',
        comment
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
}

module.exports = commentCtrl;