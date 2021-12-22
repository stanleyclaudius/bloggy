import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { GLOBAL_TYPES } from './../redux/types/globalTypes';

export const checkTokenValidity = async(token, dispatch) => {
  const decoded = jwt_decode(token);

  if (decoded.exp >= Date.now() / 1000) return;

  const res = await axios.get('/api/v1/auth/refresh_token');
  dispatch({
    type: GLOBAL_TYPES.AUTH,
    payload: {
      user: res.data.user,
      token: res.data.accessToken
    }
  });

  return res.data.accessToken;
}