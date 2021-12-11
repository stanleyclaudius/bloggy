import {
  Box
} from '@chakra-ui/react';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';
import { postDataAPI } from './../../utils/fetchData';

const ActivateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {slug} = useParams();

  const activateAccount = useCallback(async() => {
    try {
      const res = await postDataAPI('auth/activate', {activation_token: slug});
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          success: res.data.msg
        }
      });
      navigate('/login');
    } catch (err) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: err.response.data.msg
        }
      });
      navigate('/login');
    }
  }, [dispatch, slug, navigate]);

  useEffect(() => {
    if (!slug) return;
    activateAccount();
  }, [slug, activateAccount]);

  return(
    <Box
      p={{ base: '30px 35px', md: '30px 100px' }}
    ></Box>
  );
}

export default ActivateAccount;