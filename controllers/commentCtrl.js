const Comment = require('./../models/Comment');
const io = require('./../server');
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
              { $match: { blog_id: mongoose.Types.ObjectId(req.params.id), comment_root: { $exists: false } } },
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
              {
                $lookup: {
                  "from": "comments",
                  "let": {cm_id: "$reply"},
                  "pipeline": [
                    { $match: { $expr: { $in: ["$_id", "$$cm_id"] } } },
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
                    {
                      $lookup: {
                        "from": "users",
                        "let": { user_id: "$reply_user" },
                        "pipeline": [
                          { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                          { $project: { name: 1, avatar: 1 } }
                        ], 
                        "as": "reply_user"
                      }
                    },
                    { $unwind: '$reply_user' }
                  ],
                  "as": "reply"
                }
              },
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit }
            ],
            totalCount: [
              { $match: { blog_id: mongoose.Types.ObjectId(req.params.id), comment_root: { $exists: false } } },
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

      const data = {
        ...newComment._doc,
        user: req.user,
        createdAt: new Date().toISOString()
      };
      io.to(blog_id).emit('createComment', data);

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

      const data = {
        ...req.body.data,
        content: req.body.content,
        user: req.user
      };

      io.to(data.blog_id).emit('updateComment', data);

      res.status(200).json({
        msg: 'Comment has been updated successfully.',
        comment
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  replyComment: async(req, res) => {
    try {
      const {blog_id, blog_user_id, content, reply_user, comment_root} = req.body;

      if (!content)
        return res.status(400).json({msg: err.message});

      const newReply = new Comment({
        user: req.user._id,
        blog_id,
        blog_user_id,
        content,
        reply_user: reply_user._id,
        comment_root
      });

      await Comment.findOneAndUpdate({_id: comment_root}, {
        $push: { reply: newReply._id }
      }, {new: true});

      const data = {
        user: req.user,
        blog_id,
        blog_user_id,
        content,
        reply_user: reply_user._id,
        comment_root,
        _id: newReply._id
      }
      io.to(blog_id).emit('replyComment', data);

      await newReply.save();

      res.status(200).json({
        msg: 'Reply success.',
        comment: newReply
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  deleteComment: async(req, res) => {
    try {
      const comment = await Comment.findOneAndDelete({_id: req.params.id});

      if (!comment)
        return res.status(404).json({msg: 'Comment not found.'});

      if (comment.comment_root) {
        await Comment.findOneAndUpdate({_id: comment.comment_root}, {
          $pull: { reply: comment._id }
        })
      } else {
        await Comment.deleteMany({_id: { $in: comment.reply }});
      }
    
      io.to(`${comment.blog_id}`).emit('deleteComment', comment);

      res.status(200).json({msg: 'Comment deleted.'});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
}

module.exports = commentCtrl;