import CreateBlog from './../create_blog';
import { useParams } from 'react-router-dom';

const UpdateBlog = () => {
  const { slug } = useParams();

  return (
    <CreateBlog id={slug} />
  );
}

export default UpdateBlog;