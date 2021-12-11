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
import { useDispatch } from 'react-redux';
import { login } from './../../redux/actions/authActions';

const AccountLogin = () => {
  const [userData, setUserData] = useState({
    account: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  
  const handleChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();
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