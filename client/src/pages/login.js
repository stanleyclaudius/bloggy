import {
  Heading,
  HStack,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginMethod from './../components/login/LoginMethod';
import AccountLogin from './../components/login/AccountLogin';
import SmsLogin from './../components/login/SmsLogin';

const Login = () => {
  const [isSmsLogin, setIsSmsLogin] = useState(false);

  const navigate = useNavigate();
  const {auth} = useSelector(state => state);

  useEffect(() => {
    if (auth.token) {
      navigate('/');
    }
  }, [auth.token, navigate]);

  return (
    <Flex
      p={{ base: '20px 35px', md: '20px 220px' }}
      color='white'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      mt={{ base: '20px', md: '50px' }}
    >
      <Heading textAlign='center' size='lg'>Sign In</Heading>
      <Divider w='7%' mt='13px' border='2px' bg='white' />
      <HStack
        mt={{ base: '30px', md: '50px' }}
        width='100%'
        spacing={{ base: '0', md: '100px' }}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <LoginMethod isSmsLogin={isSmsLogin} setIsSmsLogin={setIsSmsLogin} />
        {isSmsLogin ? <SmsLogin /> : <AccountLogin />}
      </HStack>
    </Flex>
  );
}

export default Login;