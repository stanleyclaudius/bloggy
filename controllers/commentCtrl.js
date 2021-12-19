const Comment = require('./../models/Comment');

const commentCtrl = {
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
  }
}

module.exports = commentCtrl;