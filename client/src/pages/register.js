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
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      <Box as='form' w={{ base: '100%', md: '50%' }}>
        <FormControl mt='20px'>
          <FormLabel>Name</FormLabel>
          <Input bg='gray.700' />
        </FormControl>
        <FormControl mt='20px'>
          <FormLabel>Email or Phone number</FormLabel>
          <Input bg='gray.700' />
        </FormControl>
        <FormControl mt='20px'>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input type={showPassword ? 'text' : 'password'} bg='gray.700' borderColor='gray.600' />
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
            <Input type={showConfirmPassword ? 'text' : 'password'} bg='gray.700' borderColor='gray.600' />
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