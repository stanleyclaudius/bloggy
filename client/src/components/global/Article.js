import {
  Heading,
  HStack,
  Spacer,
  Image,
  Text,
  IconButton,
  Box
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Article = ({id, category, title, description, author, date, image, isProfile}) => {
  const navigate = useNavigate();

  const { auth } = useSelector(state => state);

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
          {
            isProfile && (author._id === auth.user?._id) &&
            <>
              <IconButton
                aria-label="Edit Article"
                icon={<FaEdit />}
                onClick={() => navigate(`/update_blog/${id}`)}
              />
              <IconButton
                aria-label="Delete Article"
                icon={<FaTrash />}
              />
            </>
          }
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