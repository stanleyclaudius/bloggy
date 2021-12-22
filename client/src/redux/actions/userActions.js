import { GLOBAL_TYPES } from './../types/globalTypes';
import { USER_TYPES } from './../types/userTypes';
import { getDataAPI, patchDataAPI } from './../../utils/fetchData';
import { uploadImage } from './../../utils/imageHandler';
import { checkTokenValidity } from './../../utils/checkTokenValidity';

export const getUserProfile = id => async(dispatch) => {
  try {
    const res = await getDataAPI(`user/${id}`);
    dispatch({
      type: USER_TYPES.GET_USER_PROFILE,
      payload: res.data.user
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

export const updateProfile = (data, id, token) => async(dispatch) => {
  const tokenValidityResult = await checkTokenValidity(token, dispatch);
  const access_token = tokenValidityResult ? tokenValidityResult : token;

  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    if (data.avatar) {
      const res = await uploadImage(data.avatar, 'user');
      data.avatar = res.secure_url;
    }

    const res = await patchDataAPI(`user/${id}`, data, access_token);
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        token
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