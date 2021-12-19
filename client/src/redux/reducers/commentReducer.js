import { COMMENT_TYPES } from './../types/commentTypes';

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case COMMENT_TYPES.CREATE_COMMENT:
      return [action.payload, ...state];
    default:
      return state;
  }
}

export default commentReducer;