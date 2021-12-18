import {
  Box,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Flex,
  Text,
  InputRightElement
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';
import { updateProfile } from './../../redux/actions/userActions';

const UserProfile = ({id}) => {
  const [userData, setUserData] = useState({
    avatar: '',
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const {auth, alert} = useSelector(state => state);

  const handleChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleChangeImage = e => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 2) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: "Max image size is 2MB."
        }
      });
    }
    setAvatarPreview(file);
    setUserData({...userData, avatar: file});
  }

  const handleSubmit = e => {
    e.preventDefault();    
    const data = {name: userData.name};
    if (avatarPreview) {
      data.avatar = userData.avatar;
    }

    if (userData.password || userData.confirmPassword) {
      if (userData.password !== userData.confirmPassword) {
        return dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: {
            errors: 'Password confirmation doesn\'t match.'
          }
        });
      }
      data.password = userData.password;
    }
    dispatch(updateProfile(data, id, auth.token));
  }

  return (
    <Box
      border='1px'
      borderColor='gray.600'
      borderRadius='7px'
      padding='20px'
      as='form'
      onSubmit={handleSubmit}
    >
      <Flex
        justifyContent='space-between'
      >
        <Avatar
          size='2xl'
          name={auth.user?.name}
          src={avatarPreview ? URL.createObjectURL(avatarPreview) : auth.user?.avatar}
        />
        <Box>
          <Input
            type='file'
            accept="image/*"
            onChange={handleChangeImage}
          />
        </Box>
      </Flex>
      <Box>
        <FormControl mt='20px'>
          <FormLabel>Name</FormLabel>
          <Input bg='gray.700' name='name' defaultValue={auth.user?.name} onChange={handleChange} />
        </FormControl>
        <FormControl mt='20px' mb='20px'>
          <FormLabel>Email or Phone Number</FormLabel>
          <Input bg='gray.600' border='1px' borderColor='gray.500' name='account' defaultValue={auth.user?.account} isDisabled />
        </FormControl>
        {
          auth.user?.type !== 'register' && 
          <Text
            color='red.400'
            fontSize='14px'
            mb='8px'
          >Change password feature not available for user that login with {auth.user?.type}</Text>
        }
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input type={showPassword ? 'text' : 'password'} bg='gray.700' name='password' value={userData.password} onChange={handleChange} isDisabled={auth.user?.type !== 'register' ? true : false} />
            {
              auth.user?.type === 'register' &&
              <InputRightElement mr='7px'>
                <Button
                  size='sm'
                  h='1.75rem'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            }
          </InputGroup>
        </FormControl>
        <FormControl mt='20px'>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input type={showConfirmPassword ? 'text' : 'password'} bg='gray.700' name='confirmPassword' value={userData.confirmPassword} onChange={handleChange} isDisabled={auth.user?.type !== 'register' ? true : false} />
            {
              auth.user?.type === 'register' &&
              <InputRightElement mr='7px'>
                <Button
                  size='sm'
                  h='1.75rem'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            } 
          </InputGroup>
        </FormControl>
        <Button
          isLoading={alert.loading ? true : false}
          loadingText='Loading'
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