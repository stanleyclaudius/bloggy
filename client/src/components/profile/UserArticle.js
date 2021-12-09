import { Box } from '@chakra-ui/react';
import Article from './../global/Article';

const UserArticle = () => {
  return (
    <Box>
      <Article
        category='html'
        title='Lorem ipsum dolor sit amet'
        author='Lorem Ipsum'
        date='24 June 2020'
        image='https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg'
        isProfile={true}
      />
      <Article
        category='html'
        title='Lorem ipsum dolor sit amet'
        author='Lorem Ipsum'
        date='24 June 2020'
        image='https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg'
        isProfile={true}
      />
      <Article
        category='html'
        title='Lorem ipsum dolor sit amet'
        author='Lorem Ipsum'
        date='24 June 2020'
        image='https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg'
        isProfile={true}
      />
    </Box>
  );
}

export default UserArticle;