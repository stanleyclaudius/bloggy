import {
  Heading,
  HStack,
  Spacer,
  Image,
  Text,
  Box
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Article = ({id, category, title, description, author, date, image, isProfile}) => {
  return (
    <HStack
      bg='gray.700'
      color='white'
      borderRadius='7px'
      shadow='md'
      p='15px'
      transition='200ms'
      alignItems='center'
      mb='30px'
      _hover={{ transform: 'scale(1.02)' }}
    >
      <Box>
        <Text color='orange.400'>Category: {category}</Text>
        <Link to={`/blog/${id}`}>
          <Heading pb='12px' size={isProfile ? 'md' : 'lg'}>{title}</Heading>
        </Link>
        <Text pb='12px'>{description}</Text>
        <HStack spacing='20px'>
          <Text>
            By <Link to={`/profile/${author._id}`} style={{ color: '#63B3ED' }}>{author.name}</Link>
          </Text>
          <Text>{date}</Text>
        </HStack>
      </Box>
      <Spacer />
      <Box w={isProfile ? '150px' : '300px'} h={isProfile ? '120px' : '150px'} d={{ base: 'none', md: 'block' }}>
        <Image
          src={image}
          alt='Bloggy Article Image'
          borderRadius='5px'
          border='1px'
          borderColor='gray.500'
          height='100%'
          width='100%'
          objectFit='cover'
        />
      </Box>
    </HStack>
  )
}

export default Article;