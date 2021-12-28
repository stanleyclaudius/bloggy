import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategoryBlogs } from './../../redux/actions/blogActions';
import Article from './../../components/global/Article';
import Pagination from './../../components/global/Pagination';
import Spinner from './../../components/global/Spinner';
import NotFound from './../../components/global/NotFound';
import HeadInfo from './../../utils/HeadInfo';

const BlogsCategory = () => {
  const [categoryId, setCategoryId] = useState('');

  const {slug} = useParams();
  const dispatch = useDispatch();
  const {category, categoryBlog, alert} = useSelector(state => state);

  const handlePagination = num => {
    const page = `?page=${num}`;
    dispatch(getCategoryBlogs(categoryId._id, page));
  }

  useEffect(() => {
    const id = category.find(item => item.name === slug);
    setCategoryId(id);
  }, [category, slug]);

  useEffect(() => {
    if (!categoryId) return;
    dispatch(getCategoryBlogs(categoryId._id));
  }, [dispatch, categoryId]);

  if (!categoryId) return <NotFound />
  return (
    <>
      <HeadInfo title={`Bloggy - ${slug} Blogs`} />
      <div className='blogsByCategory container'>
        <h1 className='blogsByCategory__title'>{slug} Articles</h1>
        <div>
          {
            alert.loading
            ? (
              <Spinner />
            )
            : (
              <>
                {
                  categoryBlog.blogs?.map(blog => (
                    <Article
                      key={blog._id}
                      id={blog._id}
                      category={slug}
                      title={blog.title}
                      description={blog.description}
                      author={blog.user}
                      date={new Date(blog.createdAt).toLocaleDateString()}
                      image='https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg'
                    />
                  ))
                }
              </>
            )
          }
        </div>

        {
          categoryBlog.totalPage > 1 &&
          <Pagination
            page={categoryBlog.totalPage}
            callback={handlePagination}
          />
        }
      </div>
    </>
  );
}

export default BlogsCategory;