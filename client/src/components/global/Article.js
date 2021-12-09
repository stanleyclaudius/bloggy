import {
  Heading,
  HStack,
  Spacer,
  Image,
  // HStack,
  Text,
  Box
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Article = ({category, title, description, author, date, image, isProfile}) => {
  return (
    <Link to='/'>
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
          <Heading pb='12px' size={isProfile ? 'md' : 'lg'}>{title}</Heading>
          <Text pb='12px'>{description}</Text>
          <HStack spacing='20px'>
            <Text>
              By <Link to='/' style={{ color: '#63B3ED' }}>{author}</Link>
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
    </Link>
  )
}

export default Article;