import { COMMENT_TYPES } from './../types/commentTypes';

const initialState = {
  data: [],
  totalPage: 1
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_TYPES.CREATE_COMMENT:
      return {
        ...state,
        data: [action.payload, ...state.data]
      };
    case COMMENT_TYPES.GET_COMMENTS:
      return {
        data: action.payload.comments,
        totalPage: action.payload.totalPage
      };
    default:
      return state;
  }
}

export default commentReducer;