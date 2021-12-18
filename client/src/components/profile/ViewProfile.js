import {
  Box,
  Avatar,
  FormControl,
  FormLabel,
  Text
} from '@chakra-ui/react';

const ViewProfile = ({name, avatar, account}) => {
  return (
    <Box
      border='1px'
      borderColor='gray.600'
      borderRadius='7px'
      padding='20px'
      alignSelf='flex-start'
    >
      <Box textAlign='center'>
        <Avatar size='2xl' name={name} src={avatar} />
      </Box>
      <Box>
        <FormControl mt='20px'>
          <FormLabel>Name</FormLabel>
          <Text bg='gray.700' p='3' borderRadius='6px'>{name}</Text>
        </FormControl>
        <FormControl mt='20px'>
          <FormLabel>Email or Phone Number</FormLabel>
          <Text bg='gray.700' p='3' borderRadius='6px'>{account}</Text>
        </FormControl>
      </Box>
    </Box>
  );
}

export default ViewProfile;