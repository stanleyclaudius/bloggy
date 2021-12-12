import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory } from './../../redux/actions/categoryActions';

const AlertWarning = ({onDelete, setOnDelete, category, setSelectedCategory}) => {
  const [loading, setLoading] = useState(false);
  const cancelRef = useRef();

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  
  const onClose = () => {
    setSelectedCategory({});
    setOnDelete(false);
  }

  const handleDelete = async() => {
    setLoading(true);
    await dispatch(deleteCategory(category._id, auth.token));
    setLoading(false);
    onClose();
  }

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
            <Button isLoading={loading ? true : false} loadingText='Loading' colorScheme='red' onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default AlertWarning;