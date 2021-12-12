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
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../redux/actions/categoryActions';

const UpdateCategory = ({isOpen, onClose, category, setSelectedCategory}) => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: ''
  });

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  
  const handleClose = () => {
    onClose();
    setSelectedCategory({});
    setCategoryData({name: '', description: ''});
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setCategoryData({...categoryData, [name]: value});
  }

  const handleUpdate = async e => {
    e.preventDefault();
    if (category.name === categoryData.name && category.description === categoryData.description) {
      handleClose();
      return;
    }
    setLoading(true);
    await dispatch(updateCategory(categoryData, category._id, auth.token));
    setLoading(false);
    handleClose();
  }

  useEffect(() => {
    if (!category) return;
    setCategoryData({
      name: category.name,
      description: category.description
    });
  }, [category]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Category Name</FormLabel>
            <Input bg='gray.700' name='name' value={categoryData.name} onChange={handleChange} />
          </FormControl>
          <FormControl mt='20px'>
            <FormLabel>Category Description</FormLabel>
            <Input bg='gray.700' name='description' value={categoryData.description} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' mr='3' onClick={onClose}>
            Close
          </Button>
          <Button
            isLoading={loading ? true : false}
            loadingText='Loading'
            variant='solid'
            bg='orange.400'
            _hover={{ bg: 'orange.600' }}
            _active={{ bg: 'orange.600' }}
            onClick={handleUpdate}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateCategory;