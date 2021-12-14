import { GLOBAL_TYPES } from './../types/globalTypes';
import { USER_TYPES } from './../types/userTypes';
import { getDataAPI } from './../../utils/fetchData';

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