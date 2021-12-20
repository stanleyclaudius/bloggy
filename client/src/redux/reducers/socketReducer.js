import { GLOBAL_TYPES } from './../types/globalTypes';

const socketReducer = (state = null, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.SOCKET:
      return action.payload;
    default:
      return state;
  }
}

export default socketReducer;