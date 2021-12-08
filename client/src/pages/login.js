import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  HStack,
  Flex,
  Divider,
  Box
} from '@chakra-ui/react';
import { FaSms } from 'react-icons/fa';

const Login = () => {
  return (
    <Flex
      p={{ base: '20px 35px', md: '20px 220px' }}
      color='white'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Heading textAlign='center' size='lg'>Sign In</Heading>
      <Divider w='7%' mt='13px' border='2px' bg='white' />
      <HStack
        mt='50px'
        width='100%'
      >
        <Box width='100%'>
          <Button leftIcon={<FaSms />} bg='teal.600' _hover={{ bg: 'teal.700' }} _active={{ bg: 'teal.700' }}>
            Login with SMS
          </Button>
        </Box>
        <Box width='100%'>
          <FormControl id='account' isRequired>
            <FormLabel>Email or Phone number</FormLabel>
            <Input autoComplete='off' bg='gray.600' borderColor='gray.500' />
          </FormControl>
          <FormControl mt='20px' id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <Input bg='gray.600' borderColor='gray.500' />
          </FormControl>
          <Button mt='25px' bg='orange.400' _hover={{ bg: 'orange.600' }} _active={{ bg: 'orange.600' }}>Sign In</Button>
        </Box>
      </HStack>
    </Flex>
  );
}

export default Login;