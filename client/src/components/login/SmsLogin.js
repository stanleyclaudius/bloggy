import {
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
  Button
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';

const SmsLogin = () => {
  return (
    <Box width='100%' as='form'>
      <FormControl>
        <FormLabel>Phone Number</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<AiOutlinePlus />}
          />
          <Input bg='gray.700' />
        </InputGroup>
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

export default SmsLogin;