import { Grid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import NotFound from './../components/global/NotFound';
import CategoryForm from './../components/category/CategoryForm';
import CategoryTable from './../components/category/CategoryTable';

const Category = () => {
  const {auth} = useSelector(state => state);

  if (auth.user?.role !== 'admin') return <NotFound />
  return (
    <Grid
      p={{ base: '30px 35px', md: '30px 100px' }}
      gap='50px'
      templateColumns='repeat(auto-fill, minmax(500px, 1fr))'
    >
      <CategoryForm />
      <CategoryTable />
    </Grid>
  );
}

export default Category;