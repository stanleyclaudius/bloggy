import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';

const UpdateCategory = ({isOpen, onClose}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Category Name</FormLabel>
            <Input bg='gray.700' />
          </FormControl>
          <FormControl mt='20px'>
            <FormLabel>Category Description</FormLabel>
            <Input bg='gray.700' />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' mr='3' onClick={onClose}>
            Close
          </Button>
          <Button variant='solid' bg='orange.400' _hover={{ bg: 'orange.600' }} _active={{ bg: 'orange.600' }}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateCategory;