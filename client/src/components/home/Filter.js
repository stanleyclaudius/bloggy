import {
  Box,
  HStack,
  Input,
  Button,
  Divider,
  Collapse,
  Tag,
  TagLabel,
  Wrap,
  TagCloseButton,
  InputGroup,
  InputRightAddon,
  useDisclosure
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';

const Filter = ({category, filter, setFilter}) => {
  const { isOpen, onToggle } = useDisclosure();

  const handleChooseCategory = cat => {
    setFilter(filter => {
      if (!filter.find(item => item._id === cat._id)) {
        return [...filter, cat];
      } else {
        return filter.filter(item => item._id !== cat._id);
      }
    });
  }

  const handleRemoveCategory = id => {
    setFilter(filter => filter.filter(item => item._id !== id));
  }

  return (
    <Box
      p={{ base: '0 35px 20px 35px' , md: '0 100px 20px 100px'}}
    >
      <HStack
        justifyContent='flex-end'
        spacing='20px'
      >
        <Box>
          <InputGroup borderColor='gray.500'>
            <Input
              w={{ base: '100%', md: '300px' }}
              bg='gray.700'
              color='white'
              placeholder='Search ...'
            />
            <InputRightAddon
              borderColor='gray.500'
              bg='orange.400'
              color='white'
              cursor='pointer'
              children={<FaSearch />}
            />
          </InputGroup>
        </Box>
        <Box>
          <Button
            bg='gray.700'
            border='1px'
            borderColor='gray.500'
            color='white'
            _hover={{ bg: 'gray.500', borderColor: 'gray.400' }}
            _active={{ bg: 'gray.500', borderColor: 'gray.400' }}
            leftIcon={<IoFilterSharp />}
            onClick={onToggle}
          >
            Filter
          </Button>
        </Box>
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <Wrap
          mt='20px'
          color='white'
          spacing='15px'
        >
          {
            category.map(cat => (
              <Tag
                key={cat._id}
                size='lg'
                borderRadius='full'
                variant='solid'
                bg='gray.600'
                cursor='pointer'
                opacity='0.5'
                transition='200ms'
                _hover={{ opacity: '1' }}
                onClick={() => handleChooseCategory(cat)}
              >
                <TagLabel>{cat.name}</TagLabel>
              </Tag>
            ))
          }
        </Wrap>
      </Collapse>
      <Divider mt='20px' />
      <HStack mt={filter?.length !== 0 ? '20px' : '0'} spacing='15px'>
        {
          filter.map(item => (
            <Tag
              key={item._id}
              size='lg'
              borderRadius='full'
              variant='solid'
              bg='green.500'
              onClick={() => handleRemoveCategory(item._id)}
            >
              <TagLabel>{item.name}</TagLabel>
              <TagCloseButton />
            </Tag>
          ))
        }
      </HStack>
    </Box>
  );
}

export default Filter;