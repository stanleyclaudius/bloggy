import { CATEGORY_TYPES } from './../types/categoryTypes';

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case CATEGORY_TYPES.GET_CATEGORY:
      return action.payload;
    case CATEGORY_TYPES.CREATE_CATEGORY:
      return [action.payload, ...state];
    case CATEGORY_TYPES.UPDATE_CATEGORY:
      return state.map(item => item._id === action.payload._id ? action.payload : item);
    case CATEGORY_TYPES.DELETE_CATEGORY:
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
}

export default categoryReducer;