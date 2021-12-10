import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';
import { useRef } from 'react';

const AlertWarning = ({onDelete, setOnDelete}) => {
  const cancelRef = useRef();
  
  const onClose = () => setOnDelete(false);

  return (
    <AlertDialog
      isOpen={onDelete}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Category
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} mr='3'>
              Cancel
            </Button>
            <Button colorScheme='red'>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default AlertWarning;