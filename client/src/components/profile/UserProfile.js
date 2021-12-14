import {
  Box,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  InputRightElement
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './../../redux/actions/userActions';

const UserProfile = ({id}) => {
  const [userData, setUserData] = useState({
    avatar: '',
    name: '',
    account: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const {user} = useSelector(state => state);

  const handleChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  useEffect(() => {
    if (!id) return;
    dispatch(getUserProfile(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!user) return;
    setUserData({
      ...userData,
      name: user.name,
      account: user.account,
      avatar: user.avatar
    });
  }, [user, userData]);

  return (
    <Box
      border='1px'
      borderColor='gray.600'
      borderRadius='7px'
      padding='20px'
    >
      <Box textAlign='center'>
        <Avatar size='2xl' name={user.name} src={userData.avatar} />
      </Box>
      <Box as='form'>
        <FormControl mt='20px'>
          <FormLabel>Name</FormLabel>
          <Input bg='gray.700' name='name' value={userData.name} onChange={handleChange} />
        </FormControl>
        <FormControl mt='20px'>
          <FormLabel>Email or Phone Number</FormLabel>
          <Input bg='gray.600' border='1px' borderColor='gray.500' name='account' value={userData.account} isDisabled />
        </FormControl>
        <FormControl mt='20px'>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input type={showPassword ? 'text' : 'password'} bg='gray.700' name='password' value={userData.password} onChange={handleChange} />
            <InputRightElement mr='7px'>
              <Button
                size='sm'
                h='1.75rem'
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
            <Input type={showConfirmPassword ? 'text' : 'password'} bg='gray.700' name='confirmPassword' value={userData.confirmPassword} onChange={handleChange} />
            <InputRightElement mr='7px'>
              <Button
                size='sm'
                h='1.75rem'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          type='submit'
          bg='orange.400'
          mt='20px'
          _hover={{ bg: 'orange.600' }}
          _active={{ bg: 'orange.600' }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
}

export default UserProfile;