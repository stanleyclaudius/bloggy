import { Box } from '@chakra-ui/react';
import Article from './../global/Article';

const ArticleContainer = ({blogs}) => {
  return (
    <Box>
      {
        blogs.map(item => (
          <Article
            key={item._id}
            id={item._id}
            category={item.category?.name}
            title={item.title}
            description={item.description}
            author={item.user}
            date={new Date(item.createdAt).toLocaleDateString()}
            image='https://i.natgeofe.com/n/3861de2a-04e6-45fd-aec8-02e7809f9d4e/02-cat-training-NationalGeographic_1484324_square.jpg'
          />
        ))
      }
    </Box>
  );
}

export default ArticleContainer;