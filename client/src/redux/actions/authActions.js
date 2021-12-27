import { GLOBAL_TYPES } from './../types/globalTypes';
import { getDataAPI, postDataAPI, patchDataAPI } from './../../utils/fetchData';
import { checkTokenValidity } from './../../utils/checkTokenValidity';

export const register = data => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await postDataAPI('auth/register', data);
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
    })
  }
}

export const login = data => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await postDataAPI('auth/login', data);
    localStorage.setItem('logged', 'true');
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
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

export const refreshToken = () => async(dispatch) => {
  const logged = localStorage.getItem('logged');
  if (logged !== 'true') return;

  try {
    const res = await getDataAPI('auth/refresh_token');
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
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

export const logout = token => async(dispatch) => {
  const tokenValidityResult = await checkTokenValidity(token, dispatch);
  const access_token = tokenValidityResult ? tokenValidityResult : token;

  try {
    await getDataAPI('auth/logout', access_token);
    localStorage.removeItem('logged');
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {}
    });
    
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {}
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

export const googleLogin = token => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await postDataAPI('auth/login_google', {id_token: token});
    localStorage.setItem('logged', true);
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
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

export const facebookLogin = (token, uid) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await postDataAPI('auth/login_facebook', {accessToken: token, userID: uid});
    localStorage.setItem('logged', true);
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
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

export const smsLogin = phone => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await postDataAPI('auth/login_sms', {phone: `+${phone}`});
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

export const verifyOtp = (phone, code) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await postDataAPI('auth/verify_otp', {phone: `+${phone}`, code});
    localStorage.setItem('logged', 'true');
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
      }
    });

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    });
  }
}

export const forgetPassword = account => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await postDataAPI('auth/forget_password', {account});
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

export const resetPassword = (password, token) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    });

    const res = await patchDataAPI('auth/reset', {password, token});
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