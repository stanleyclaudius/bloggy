import { GLOBAL_TYPES } from './../types/globalTypes';
import { COMMENT_TYPES } from './../types/commentTypes';
import { postDataAPI } from './../../utils/fetchData';

export const createComment = (data, token) => async(dispatch) => {
  try {
    const res = await postDataAPI('comment', data, token);
    dispatch({
      type: COMMENT_TYPES.CREATE_COMMENT,
      payload: res.data.comment
    });
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    });
  }
}