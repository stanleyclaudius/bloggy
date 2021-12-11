import {
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';
import { login } from './../../redux/actions/authActions';

const AccountLogin = () => {
  const [userData, setUserData] = useState({
    account: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const {alert} = useSelector(state => state);
  
  const handleChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!userData.account || !userData.password) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Please fill up every field.'
        }
      })
    }
    dispatch(login(userData));
  }

  return (
    <Box width='100%' as='form' onSubmit={handleSubmit}>
      <FormControl id='account'>
        <FormLabel>Email or Phone number</FormLabel>
        <Input autoComplete='off' bg='gray.700' borderColor='gray.600' name='account' value={userData.account} onChange={handleChange} />
      </FormControl>
      <FormControl mt='20px' id='password'>
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
        <Link to='/' style={{ display: 'block', marginTop: '5px', fontSize: '15px', color: '#63B3ED' }}>Forgot Password?</Link>
      </FormControl>
      <Button
        isLoading={alert.loading ? true : false}
        loadingText='Loading'
        mt='25px'
        bg='orange.400'
        _hover={{ bg: 'orange.600' }}
        _active={{ bg: 'orange.600' }}
        type='submit'
      >
        Sign In
      </Button>
    </Box>
  );
}

export default AccountLogin;