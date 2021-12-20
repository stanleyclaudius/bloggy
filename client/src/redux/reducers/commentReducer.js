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
    case COMMENT_TYPES.UPDATE_COMMENT:
      return {
        ...state,
        data: state.data.map(item => item._id === action.payload._id ? {...item, content: action.payload.content} : item)
      };
    case COMMENT_TYPES.UPDATE_REPLY:
      return {
        ...state,
        data: state.data.map(item => (
          item._id === action.payload.comment_root
          ? {
            ...item,
            reply: item.reply.map(rep => (
              rep._id === action.payload._id
              ? action.payload
              : rep
            ))
          }
          : item
        ))
      };
    case COMMENT_TYPES.REPLY_COMMENT:
      return {
        ...state,
        data: state.data.map(item => (
          item._id === action.payload.comment_root
          ? {
            ...item,
            reply: [action.payload, ...item.reply]
          }
          : item
        ))
      };
    case COMMENT_TYPES.DELETE_COMMENT:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload._id)
      };
    case COMMENT_TYPES.DELETE_REPLY:
      return {
        ...state,
        data: state.data.map(item => (
          item._id === action.payload.comment_root
          ? {
            ...item,
            reply: item.reply.filter(rep => rep._id !== action.payload._id)
          }
          : item
        ))
      };
    default:
      return state;
  }
}

export default commentReducer;