import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from './../../redux/actions/categoryActions';

const CategoryForm = () => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: ''
  });

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  
  const handleChange = e => {
    const {name, value} = e.target;
    setCategoryData({...categoryData, [name]: value});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await dispatch(createCategory(categoryData, auth.token));
    setLoading(false);
    setCategoryData({name: '', description: ''});
  }

  return (
    <Box as='form' onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Category Name</FormLabel>
        <Input bg='gray.700' name='name' value={categoryData.name} onChange={handleChange} autoComplete='off' />
      </FormControl>
      <FormControl mt='20px'>
        <FormLabel>Category Description</FormLabel>
        <Input bg='gray.700' name='description' value={categoryData.description} onChange={handleChange} autoComplete='off' />
      </FormControl>
      <Button
        isLoading={loading ? true : false}
        loadingText='Loading'
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