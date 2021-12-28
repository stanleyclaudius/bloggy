import CreateBlog from './../create_blog';
import { useParams } from 'react-router-dom';
import HeadInfo from './../../utils/HeadInfo';

const UpdateBlog = () => {
  const { slug } = useParams();

  return (
    <>
      <HeadInfo title='Bloggy - Update Blog' />
      <CreateBlog id={slug} />
    </>
  );
}

export default UpdateBlog;