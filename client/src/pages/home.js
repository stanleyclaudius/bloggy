import { Box, Heading, Divider, Flex, Spacer } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHomeBlogs } from './../redux/actions/blogActions';
import ArticleContainer from './../components/home/ArticleContainer';
import Header from './../components/home/Header';
import Filter from './../components/home/Filter';

const Home = () => {
  const dispatch = useDispatch();
  const {homeBlog: category} = useSelector(state => state);

  useEffect(() => {
    dispatch(getHomeBlogs());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Filter />
      <Box
        p={{ base: '15px 35px', md: '15px 100px' }}
      >
        {
          category.map(cat => (
            <Box key={cat._id}>
              <Flex alignItems='center'>
                <Heading fontSize='27px'>{cat.name}</Heading>
                <Spacer />
                {cat.count > 4 && <Link to='/'>See more</Link>}
              </Flex>
              <Divider bg='white' m='20px 0' />
              <ArticleContainer blogs={cat.blogs} />
            </Box>
          ))
        }
      </Box>
    </>
  )
}

export default Home;