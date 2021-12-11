import {
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { smsLogin } from './../../redux/actions/authActions';
import { AiOutlinePlus } from 'react-icons/ai';
import VerifyModal from './VerifyModal';

const SmsLogin = () => {
  const [phone, setPhone] = useState('');
  const {isOpen, onOpen, onClose} = useDisclosure();

  const dispatch = useDispatch();
  const {alert} = useSelector(state => state);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(smsLogin(phone));
    onOpen();
  }

  return (
    <>
      <Box width='100%' as='form' onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<AiOutlinePlus />}
            />
            <Input bg='gray.700' value={phone} onChange={e => setPhone(e.target.value)} />
          </InputGroup>
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
      <VerifyModal isOpen={isOpen} onClose={onClose} phone={phone} />
    </>
  );
}

export default SmsLogin;