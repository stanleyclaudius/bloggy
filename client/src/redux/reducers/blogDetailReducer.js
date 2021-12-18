import { BLOG_DETAIL_TYPES } from './../types/blogDetailTypes';

const blogDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_DETAIL_TYPES.GET_BLOG_DETAIL:
      return action.payload;
    default:
      return state;
  }
}

export default blogDetailReducer;