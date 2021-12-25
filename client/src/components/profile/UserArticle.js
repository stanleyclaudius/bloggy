import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBlogs } from './../../redux/actions/blogActions';
import Article from './../global/Article';
import Pagination from './../global/Pagination';
import Spinner from './../global/Spinner';

const UserArticle = ({id}) => {
  const dispatch = useDispatch();
  const {alert, userBlog} = useSelector(state => state);

  const handlePagination = num => {
    dispatch(getUserBlogs(id, num));
  }

  useEffect(() => {
    if (!id) return;
    dispatch(getUserBlogs(id));
  }, [dispatch, id]);

  return (
    <div className='userArticle'>
      {
        alert.loading
        ? (
          <Spinner />
        )
        : (
          <>
            {
              userBlog.blogs?.map(blog => (
                <Article
                  key={blog._id}
                  id={blog._id}
                  category={blog.category.name}
                  title={blog.title}
                  author={blog.user}
                  description={blog.description}
                  date={new Date(blog.createdAt).toLocaleDateString()}
                  image={blog.thumbnail}
                  isProfile={true}
                />
              ))
            }
          </>
        )
      }

      {
        userBlog.totalPage > 1 &&
        <Pagination
          page={userBlog.totalPage}
          callback={handlePagination}
        />
      }
    </div>
  );
}

export default UserArticle;