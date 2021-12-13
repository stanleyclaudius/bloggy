import { CATEGORY_BLOG_TYPES } from './../types/categoryBlogTypes';

const categoryBlogReducer = (state = [], action) => {
  switch (action.type) {
    case CATEGORY_BLOG_TYPES.GET_BLOGS:
      return action.payload;
    default:
      return state;
  }
}

export default categoryBlogReducer;