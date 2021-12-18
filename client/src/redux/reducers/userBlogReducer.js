import { USER_BLOG_TYPES } from './../types/userBlogTypes';

const userBlogReducer = (state = [], action) => {
  switch (action.type) {
    case USER_BLOG_TYPES.GET_USER_BLOGS:
      return action.payload;
    default:
      return state;
  }
}

export default userBlogReducer;