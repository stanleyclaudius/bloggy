const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  account: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
  },
  role: {
    type: String,
    default: 'user'
  },
  type: {
    type: String,
    default: 'register'
  },
  rf_token: {
    type: String,
    select: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('user', userSchema);