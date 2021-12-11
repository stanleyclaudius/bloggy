import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyOtp } from './../../redux/actions/authActions';

const VerifyModal = ({isOpen, onClose, phone}) => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await dispatch(verifyOtp(phone, pin));
    setLoading(false);
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>OTP Verification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>OTP Code</FormLabel>
              <Input value={pin} onChange={e => setPin(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={loading ? true : false}
              loadingText='Loading'
              bg='orange.400'
              _hover={{ bg: 'orange.600' }}
              _active={{ bg: 'orange.600' }}
              onClick={handleSubmit}
            >
              Verify
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}

export default VerifyModal;