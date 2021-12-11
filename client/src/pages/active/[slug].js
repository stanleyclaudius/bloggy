import {
  Box,
  useToast
} from '@chakra-ui/react';
import { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postDataAPI } from './../../utils/fetchData';

const ActivateAccount = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const {slug} = useParams();

  const activateAccount = useCallback(async() => {
    try {
      const res = await postDataAPI('auth/activate', {activation_token: slug});
      await toast({
        position: 'top-right',
        title: 'Success.',
        description: `${res.data.msg}`,
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      navigate('/login');
    } catch (err) {
      await toast({
        position: 'top-right',
        title: 'Failed.',
        description: `${err.response.data.msg}`,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      navigate('/login');
    }
  }, [slug, navigate, toast]);

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