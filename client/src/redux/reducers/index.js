import { combineReducers } from 'redux';
import auth from './authReducer';
import user from './userReducer';
import alert from './alertReducer';
import category from './categoryReducer';
import homeBlog from './homeBlogReducer';
import categoryBlog from './categoryBlogReducer';

export default combineReducers({
  auth,
  alert,
  user,
  category,
  homeBlog,
  categoryBlog
});