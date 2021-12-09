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

const Filter = () => {
  const { isOpen, onToggle } = useDisclosure();

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
          <Tag
            size='lg'
            borderRadius='full'
            variant='solid'
            bg='gray.600'
            cursor='pointer'
            opacity='0.5'
            transition='200ms'
            _hover={{ opacity: '1' }}
          >
            <TagLabel>HTML</TagLabel>
          </Tag>
        </Wrap>
      </Collapse>
      <Divider mt='20px' />
      <HStack mt='20px' spacing='15px'>
        <Tag
          size='lg'
          borderRadius='full'
          variant='solid'
          bg='green.500'
        >
          <TagLabel>HTML</TagLabel>
          <TagCloseButton />
        </Tag>
        <Tag
          size='lg'
          borderRadius='full'
          variant='solid'
          bg='green.500'
        >
          <TagLabel>HTML</TagLabel>
          <TagCloseButton />
        </Tag>
      </HStack>
    </Box>
  );
}

export default Filter;