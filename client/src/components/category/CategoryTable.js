import {
  HStack,
  IconButton,
  Box,
  Center,
  Table,
  Thead,
  Spinner,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { getCategory } from './../../redux/actions/categoryActions';
import UpdateCategory from './UpdateCategory';

const CategoryTable = () => {
  const [onDelete, setOnDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const {alert, category} = useSelector(state => state);

  const handleDelete = category => {
    setOnDelete(true);
    setSelectedCategory(category);
  }

  const handleUpdate = category => {
    onOpen();
    setSelectedCategory(category);
  }

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <Box>
      {
        alert.loading
        ? (
          <Center textALign='center' m='auto'>
            <Spinner size='xl' />
          </Center>
        )
        : (
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Category</Th>
                <Th>Description</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                category.map((cat, i) => (
                  <Tr>
                    <Td>{i + 1}</Td>
                    <Td>{cat.name}</Td>
                    <Td>{cat.description}</Td>
                    <Td>
                      <HStack>
                        <IconButton
                          aria-label='Edit Category'
                          icon={<AiFillEdit />}
                          mr='3'
                          bg='orange.400'
                          _hover={{ bg: 'orange.600' }}
                          _active={{ bg: 'orange.600' }}
                          onClick={() => handleUpdate(cat)}
                        />
                        <IconButton
                          aria-label='Delete Category'
                          icon={<AiFillDelete />}
                          bg='red.400'
                          _hover={{ bg: 'red.600' }}
                          _active={{ bg: 'red.600' }} 
                          onClick={() => handleDelete(cat)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        )
      }
      <UpdateCategory isOpen={isOpen} onClose={onClose} category={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </Box>
  );
}

export default CategoryTable;