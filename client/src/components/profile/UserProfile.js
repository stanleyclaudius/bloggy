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
import { useState } from 'react';

const UserProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Box
      border='1px'
      borderColor='gray.600'
      borderRadius='7px'
      padding='20px'
    >
      <Box textAlign='center'>
        <Avatar size='2xl' name='Avatar' src='' />
      </Box>
      <Box as='form'>
        <FormControl mt='20px'>
          <FormLabel>Name</FormLabel>
          <Input bg='gray.700' />
        </FormControl>
        <FormControl mt='20px'>
          <FormLabel>Email</FormLabel>
          <Input bg='gray.600' border='1px' borderColor='gray.500' isDisabled />
        </FormControl>
        <FormControl mt='20px'>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input type={showPassword ? 'text' : 'password'} bg='gray.700' />
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
            <Input type={showConfirmPassword ? 'text' : 'password'} bg='gray.700' />
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