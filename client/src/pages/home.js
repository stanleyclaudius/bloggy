import { Box } from '@chakra-ui/react';
import Article from './../components/global/Article';
import Header from './../components/home/Header';
import Filter from './../components/home/Filter';

const home = () => {
  return (
    <>
      <Header />
      <Filter />
      <Box
        p={{ base: '15px 35px', md: '15px 100px' }}
      >
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
    </>
  )
}

export default home;