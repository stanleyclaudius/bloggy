import { GLOBAL_TYPES } from './../types/globalTypes';
import { COMMENT_TYPES } from './../types/commentTypes';
import { getDataAPI, postDataAPI, patchDataAPI } from './../../utils/fetchData';

export const getComments = (id, page = 1) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {}
    });

    const res = await getDataAPI(`comment/${id}?page=${page}`);
    dispatch({
      type: COMMENT_TYPES.GET_COMMENTS,
      payload: res.data
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

export const createComment = (data, auth) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {}
    });
    
    const res = await postDataAPI('comment', data, auth.token);
    dispatch({
      type: COMMENT_TYPES.CREATE_COMMENT,
      payload: {
        ...res.data.comment,
        user: auth.user
      }
    });

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
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

export const updateComment = (comment, content, token) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {}
    });

    const res = await patchDataAPI(`comment/${comment._id}`, {content}, token);
    dispatch({
      type: COMMENT_TYPES.UPDATE_COMMENT,
      payload: {
        _id: comment._id,
        content
      }
    });
    
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
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