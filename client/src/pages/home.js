import {
  Box,
  Heading,
  Center,
  Divider,
  Flex,
  Spinner,
  Spacer
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHomeBlogs } from './../redux/actions/blogActions';
import ArticleContainer from './../components/home/ArticleContainer';
import Header from './../components/home/Header';
import Filter from './../components/home/Filter';

const Home = () => {
  const [filter, setFilter] = useState([]);

  const dispatch = useDispatch();
  const {homeBlog: blogCategory, alert, category} = useSelector(state => state);

  useEffect(() => {
    dispatch(getHomeBlogs(filter));
  }, [dispatch, filter]);

  return (
    <>
      <Header />
      {/* <Filter
        category={category}
        filter={filter}
        setFilter={setFilter}
      /> */}
      {/* <Box
        p={{ base: '15px 35px', md: '15px 100px' }}
      >
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
                blogCategory.map(cat => (
                  <Box key={cat._id}>
                    <Flex alignItems='center'>
                      <Heading fontSize='27px'>{cat.name}</Heading>
                      <Spacer />
                      {cat.count > 4 && <Link to={`/blogs/${cat.name}`}>See more</Link>}
                    </Flex>
                    <Divider bg='white' m='20px 0' />
                    <ArticleContainer blogs={cat.blogs} />
                  </Box>
                ))
              }
            </>
          )
        }
      </Box> */}
    </>
  )
}

export default Home;