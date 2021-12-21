import { GLOBAL_TYPES } from './../types/globalTypes';
import { COMMENT_TYPES } from './../types/commentTypes';
import { getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI } from './../../utils/fetchData';

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

    const res = await patchDataAPI(`comment/${comment._id}`, {data: comment, content}, token);
    
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
        errors: err
      }
    });
  }
}

export const replyComment = (data, token) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {}
    });

    const res = await postDataAPI(`comment/reply`, data, token);

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

export const deleteComment = (comment, id, token) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {}
    });

    const res = await deleteDataAPI(`comment/${id}`, token);
    dispatch({
      type: comment.comment_root ? COMMENT_TYPES.DELETE_REPLY : COMMENT_TYPES.DELETE_COMMENT,
      payload: comment
    })

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