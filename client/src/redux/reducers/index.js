import { combineReducers } from 'redux';
import auth from './authReducer';
import user from './userReducer';
import alert from './alertReducer';
import category from './categoryReducer';
import homeBlog from './homeBlogReducer';
import categoryBlog from './categoryBlogReducer';
import userBlog from './userBlogReducer';
import blogDetail from './blogDetailReducer';
import comment from './commentReducer';
import socket from './socketReducer';

export default combineReducers({
  auth,
  alert,
  user,
  category,
  homeBlog,
  categoryBlog,
  userBlog,
  blogDetail,
  comment,
  socket
});