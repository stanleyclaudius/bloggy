import { GLOBAL_TYPES } from './../types/globalTypes';
import { COMMENT_TYPES } from './../types/commentTypes';
import { getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI } from './../../utils/fetchData';
import { checkTokenValidity } from './../../utils/checkTokenValidity';

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
  const tokenValidityResult = await checkTokenValidity(auth.token, dispatch);
  const access_token = tokenValidityResult ? tokenValidityResult : auth.token;

  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {}
    });

    const res = await postDataAPI('comment', data, access_token);

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
  const tokenValidityResult = await checkTokenValidity(token, dispatch);
  const access_token = tokenValidityResult ? tokenValidityResult : token;

  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {}
    });

    const res = await patchDataAPI(`comment/${comment._id}`, {data: comment, content}, access_token);
    
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
  const tokenValidityResult = await checkTokenValidity(token, dispatch);
  const access_token = tokenValidityResult ? tokenValidityResult : token;
  
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {}
    });

    const res = await postDataAPI(`comment/reply`, data, access_token);

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

export const deleteComment = (id, token) => async(dispatch) => {
  const tokenValidityResult = await checkTokenValidity(token, dispatch);
  const access_token = tokenValidityResult ? tokenValidityResult : token;
  
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {}
    });

    const res = await deleteDataAPI(`comment/${id}`, access_token);

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