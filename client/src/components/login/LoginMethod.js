import { Box, Button } from '@chakra-ui/react';
import { FaSms } from 'react-icons/fa';
import { BsKeyFill } from 'react-icons/bs';
import GoogleLogin from 'react-google-login-lite';
import FacebookLogin from 'react-facebook-login-lite';

const LoginMethod = ({isSmsLogin, setIsSmsLogin}) => {
  const onGoogleSuccess = response => {

  }

  const onFacebookSuccess = response => {

  }

  return (
    <Box width='100%' mb={{ base: '40px', md: '0' }}>
      <Box mb='25px'>
        <GoogleLogin
          client_id='1060142626291-b7t0hjccfsflhdordfb1fed2j32igvn8.apps.googleusercontent.com'
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
        _hover={{ bg: 'teal.700' }}
        _active={{ bg: 'teal.700' }}
        onClick={() => setIsSmsLogin(!isSmsLogin)}
      >
        Sign in with {isSmsLogin ? 'Bloggy Account' : 'SMS'}
      </Button>
    </Box>
  );
}

export default LoginMethod;