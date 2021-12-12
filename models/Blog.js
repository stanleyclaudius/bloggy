const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 50
  },
  content: {
    type: String,
    required: true,
    minlength: 2000
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 50,
    maxlength: 400
  },
  thumbnail: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'category'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('blog', blogSchema);