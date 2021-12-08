import {
  Heading,
  HStack,
  Spacer,
  Image,
  Text,
  Box
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Article = ({category, title, description, author, date, image}) => {
  return (
    <Link to='/'>
      <HStack
        color='white'
        borderRadius='5px'
        border='1px'
        borderColor='gray.500'
        spacing='100px'
        p='15px'
        transition='200ms'
        _hover={{ transform: 'scale(1.02)' }}
      >
        <Box>
          <Text color='orange.400'>Category: {category}</Text>
          <Heading pb='12px' size='lg'>{title}</Heading>
          <Text pb='12px'>{description}</Text>
          <HStack spacing='20px'>
            <Text>
              By <Link to='/' style={{ color: '#63B3ED' }}>{author}</Link>
            </Text>
            <Text>{date}</Text>
          </HStack>
        </Box>
        <Spacer />
        <Box w='300px' h='150px'>
          <Image
            src={image}
            alt='Bloggy Article Image'
            borderRadius='5px'
            border='1px'
            borderColor='gray.500'
            height='100%'
          />
        </Box>
      </HStack>
    </Link>
  )
}

export default Article;