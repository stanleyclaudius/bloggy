import { Box, Heading, Divider, Center, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategoryBlogs } from './../../redux/actions/blogActions';
import Article from './../../components/global/Article';
import Pagination from './../../components/global/Pagination';

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

  return (
    <Box p={{ base: '20px 35px', md: '20px 100px' }}>
      <Heading textAlign='center' mb='5' size='lg'>{slug} Articles</Heading>
      <Divider bg='white' mb='6' />
      <Box>
        {
          alert.loading
          ? (
            <Center>
              <Spinner size='xl' />
            </Center>
          )
          : (
            <>
              {
                categoryBlog.blogs?.map(blog => (
                  <Article
                    key={blog._id}
                    category={slug}
                    title={blog.title}
                    description={blog.description}
                    author={blog.user?.name}
                    date={new Date(blog.createdAt).toLocaleDateString()}
                    image='https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg'
                  />
                ))
              }
            </>
          )
        }
      </Box>
      <Pagination
        page={categoryBlog.totalPage}
        callback={handlePagination}
      />
    </Box>
  );
}

export default BlogsCategory;