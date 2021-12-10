import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react';

const CategoryForm = () => {
  return (
    <Box as='form'>
      <FormControl>
        <FormLabel>Category Name</FormLabel>
        <Input bg='gray.700' />
      </FormControl>
      <FormControl mt='20px'>
        <FormLabel>Category Description</FormLabel>
        <Input bg='gray.700' />
      </FormControl>
      <Button
        type='submit'
        bg='orange.400'
        mt='20px'
        _hover={{ bg: 'orange.600' }}
        _active={{ bg: 'orange.600' }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default CategoryForm;