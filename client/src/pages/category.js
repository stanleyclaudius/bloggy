import { useSelector } from 'react-redux';
import NotFound from './../components/global/NotFound';
import CategoryForm from './../components/category/CategoryForm';
import CategoryTable from './../components/category/CategoryTable';
import HeadInfo from './../utils/HeadInfo';

const Category = () => {
  const {auth} = useSelector(state => state);

  if (auth.user?.role !== 'admin') return <NotFound />
  return (
    <>
      <HeadInfo title='Bloggy - Create Category' />
      <div className='category container'>
        <CategoryForm />
        <CategoryTable />
      </div>
    </>
  );
}

export default Category;