import { Box, Button } from '@chakra-ui/react';
import { FaSms } from 'react-icons/fa';
import { BsKeyFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleLogin } from './../../redux/actions/authActions';
import GoogleLogin from 'react-google-login-lite';
import FacebookLogin from 'react-facebook-login-lite';

const LoginMethod = ({isSmsLogin, setIsSmsLogin}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onGoogleSuccess = response => {
    const id_token = response.getAuthResponse().id_token;
    dispatch(googleLogin(id_token));
  }

  const onFacebookSuccess = response => {

  }

  return (
    <Box width='100%' mb={{ base: '40px', md: '0' }}>
      <Box mb='25px'>
        <GoogleLogin
          client_id='644315342100-ipbpodgl4s8j2aheqd8k9qvc8f8hahau.apps.googleusercontent.com'
          cookiepolicy='single_host_origin'
          onSuccess={onGoogleSuccess}
        />
      </Box>

      <Box mb='25px'>
        <FacebookLogin
          appId=''
          onSuccess={onFacebookSuccess}
        />
      </Box>

      <Button
        leftIcon={isSmsLogin ? <BsKeyFill /> : <FaSms />}
        width='100%'
        bg='teal.600'
        mb='25px'
        _hover={{ bg: 'teal.700' }}
        _active={{ bg: 'teal.700' }}
        onClick={() => setIsSmsLogin(!isSmsLogin)}
      >
        Sign in with {isSmsLogin ? 'Bloggy Account' : 'SMS'}
      </Button>

      <Button
        leftIcon={<MdAccountCircle />}
        width='100%'
        bg='teal.600'
        _hover={{ bg: 'teal.700' }}
        _active={{ bg: 'teal.700' }}
        onClick={() => navigate('/register')}
      >
        Register new account
      </Button>
    </Box>
  );
}

export default LoginMethod;