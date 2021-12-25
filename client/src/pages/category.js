import { useSelector } from 'react-redux';
import NotFound from './../components/global/NotFound';
import CategoryForm from './../components/category/CategoryForm';
import CategoryTable from './../components/category/CategoryTable';

const Category = () => {
  const {auth} = useSelector(state => state);

  if (auth.user?.role !== 'admin') return <NotFound />
  return (
    <div className='category container'>
      <CategoryForm />
      <CategoryTable />
    </div>
  );
}

export default Category;