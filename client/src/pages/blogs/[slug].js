import { Box, Heading, Divider } from '@chakra-ui/react';
import Article from './../../components/global/Article';

const BlogsCategory = () => {
  return (
    <Box p={{ base: '20px 35px', md: '20px 100px' }}>
      <Heading textAlign='center' mb='5' size='lg'>HTML Articles</Heading>
      <Divider bg='white' mb='6' />
      <Box>
        <Article
          category='html'
          title='Lorem ipsum dolor sit amet'
          description='Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'
          author='Lorem Ipsum'
          date='24 June 2020'
          image='https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg'
        />
        <Article
          category='html'
          title='Lorem ipsum dolor sit amet'
          description='Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'
          author='Lorem Ipsum'
          date='24 June 2020'
          image='https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg'
        />
        <Article
          category='html'
          title='Lorem ipsum dolor sit amet'
          description='Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'
          author='Lorem Ipsum'
          date='24 June 2020'
          image='https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg'
        />
        <Article
          category='html'
          title='Lorem ipsum dolor sit amet'
          description='Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'
          author='Lorem Ipsum'
          date='24 June 2020'
          image='https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg'
        />
        <Article
          category='html'
          title='Lorem ipsum dolor sit amet'
          description='Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'
          author='Lorem Ipsum'
          date='24 June 2020'
          image='https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg'
        />
      </Box>
    </Box>
  );
}

export default BlogsCategory;