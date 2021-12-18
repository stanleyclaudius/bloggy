const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  blog_id: {
    type: mongoose.Types.ObjectId,
    ref: 'blog'
  },
  blog_user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  content: {
    type: String,
    required: true
  },
  reply: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'comment'
    }
  ],
  reply_user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  comment_root: {
    type: mongoose.Types.ObjectId,
    ref: 'comment'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('comment', commentSchema);