import { HOME_BLOG_TYPES } from './../types/homeBlogTypes';

const homeBlogReducer = (state = [], action) => {
  switch (action.type) {
    case HOME_BLOG_TYPES.GET_BLOGS:
      return action.payload;
    default:
      return state;
  }
}

export default homeBlogReducer;