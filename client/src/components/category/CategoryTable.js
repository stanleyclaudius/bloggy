import {
  HStack,
  IconButton,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import AlertWarning from './../global/AlertWarning';
import UpdateCategory from './UpdateCategory';

const CategoryTable = () => {
  const [onDelete, setOnDelete] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
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
          <Tr>
            <Td>1</Td>
            <Td>HTML</Td>
            <Td>Heart of a website, without it, you can't create a website</Td>
            <Td>
              <HStack>
                <IconButton
                  aria-label='Edit Category'
                  icon={<AiFillEdit />}
                  mr='3'
                  bg='orange.400'
                  _hover={{ bg: 'orange.600' }}
                  _active={{ bg: 'orange.600' }}
                  onClick={onOpen}
                />
                <IconButton
                  aria-label='Delete Category'
                  icon={<AiFillDelete />}
                  bg='red.400'
                  _hover={{ bg: 'red.600' }}
                  _active={{ bg: 'red.600' }} 
                  onClick={() => setOnDelete(true)}
                />
              </HStack>
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <AlertWarning onDelete={onDelete} setOnDelete={setOnDelete} />
      <UpdateCategory isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default CategoryTable;