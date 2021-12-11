import {
  Box,
  Flex,
  Heading,
  Divider,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBAL_TYPES } from './../redux/types/globalTypes';
import { register } from './../redux/actions/authActions';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    account: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {alert, auth} = useSelector(state => state);

  const handleChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!userData.name || !userData.account || !userData.password || !userData.confirmPassword) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Please fill up every field.'
        }
      });
    }

    if (userData.password.length < 8) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Password should be at least 8 characters.'
        }
      });
    }

    if (userData.password !== userData.confirmPassword) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Password confirmation should be matched.'
        }
      });
    }
    dispatch(register(userData));
  }

  useEffect(() => {
    if (auth.token) {
      navigate('/');
    }
  }, [auth.token, navigate]);

  return (
    <Flex
      p={{ base: '20px 35px', md: '20px 220px' }}
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      mt='20px'
    >
      <Heading size='lg'>Sign Up</Heading>
      <Divider w='7%' mt='13px' border='2px' bg='white' />
      <Box as='form' onSubmit={handleSubmit} w={{ base: '100%', md: '50%' }}>
        <FormControl mt='20px'>
          <FormLabel>Name</FormLabel>
          <Input bg='gray.700' name='name' value={userData.name} onChange={handleChange} autoComplete='off' />
        </FormControl>
        <FormControl mt='20px'>
          <FormLabel>Email or Phone number</FormLabel>
          <Input bg='gray.700' name='account' value={userData.account} onChange={handleChange} autoComplete='off' />
        </FormControl>
        <FormControl mt='20px'>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input type={showPassword ? 'text' : 'password'} bg='gray.700' borderColor='gray.600' name='password' value={userData.password} onChange={handleChange} />
            <InputRightElement mr='7px'>
              <Button
                h='1.75rem'
                size='sm'
                bg='gray.600'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl mt='20px'>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input type={showConfirmPassword ? 'text' : 'password'} bg='gray.700' borderColor='gray.600' name='confirmPassword' value={userData.confirmPassword} onChange={handleChange} />
            <InputRightElement mr='7px'>
              <Button
                h='1.75rem'
                size='sm'
                bg='gray.600'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          isLoading={alert.loading ? true : false}
          loadingText='Loading'
          bg='orange.400'
          type='submit'
          _hover={{ bg: 'orange.600' }}
          _active={{ bg: 'orange.600' }}
          mt='20px'
          mb='20px'
        >
          Sign Up
        </Button>
      </Box>
      <Text>Already have an account? Login <Link to='/login' style={{ color: '#63B3ED' }}>here</Link></Text>
    </Flex>
  );
}

export default Register;