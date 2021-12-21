import { USER_BLOG_TYPES } from './../types/userBlogTypes';

const initialState = {
  blogs: [],
  totalPage: 1
}

const userBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_BLOG_TYPES.GET_USER_BLOGS:
      return action.payload;
    case USER_BLOG_TYPES.DELETE_USER_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter(item => item._id !== action.payload)
      };
    default:
      return state;
  }
}

export default userBlogReducer;