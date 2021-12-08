import {
  Box,
  HStack,
  Input,
  Button,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
  InputGroup,
  InputRightAddon
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';

const Filter = () => {
  return (
    <Box bg='gray.700' p={{ base: '0 35px 20px 35px' , md: '0 100px 20px 100px'}}>
      <HStack justifyContent='flex-end' spacing='20px' mb='30px'>
        <Box>
          <InputGroup borderColor='gray.500'>
            <Input bg='gray.600' color='white' placeholder='Search ...' />
            <InputRightAddon borderColor='gray.500' bg='orange.400' color='white' cursor='pointer' children={<FaSearch />} />
          </InputGroup>
        </Box>
        <Box>
          <Button bg='gray.600' border='1px' borderColor='gray.500' color='white' _hover={{ bg: 'gray.500', borderColor: 'gray.400' }} _active={{ bg: 'gray.500', borderColor: 'gray.400' }} leftIcon={<IoFilterSharp />}>Filter</Button>
        </Box>
      </HStack>
      <Divider />
      <HStack mt='20px' spacing='15px'>
        <Tag
          size='lg'
          borderRadius='full'
          variant='solid'
          bg='gray.600'
        >
          <TagLabel>HTML</TagLabel>
          <TagCloseButton />
        </Tag>
        <Tag
          size='lg'
          borderRadius='full'
          variant='solid'
          bg='gray.600'
        >
          <TagLabel>HTML</TagLabel>
          <TagCloseButton />
        </Tag>
      </HStack>
    </Box>
  );
}

export default Filter;