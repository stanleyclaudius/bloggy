import {
  Box,
  Avatar,
  FormControl,
  FormLabel,
  Text
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './../../redux/actions/userActions';

const ViewProfile = ({id}) => {
  const [userData, setUserData] = useState({
    avatar: '',
    name: '',
    account: ''
  });

  const dispatch = useDispatch();
  const {user} = useSelector(state => state);

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
      alignSelf='flex-start'
    >
      <Box textAlign='center'>
        <Avatar size='2xl' name={user.name} src={userData.avatar} />
      </Box>
      <Box>
        <FormControl mt='20px'>
          <FormLabel>Name</FormLabel>
          <Text bg='gray.700' p='3' borderRadius='6px'>{user.name}</Text>
        </FormControl>
        <FormControl mt='20px'>
          <FormLabel>Email or Phone Number</FormLabel>
          <Text bg='gray.700' p='3' borderRadius='6px'>{user.account}</Text>
        </FormControl>
      </Box>
    </Box>
  );
}

export default ViewProfile;