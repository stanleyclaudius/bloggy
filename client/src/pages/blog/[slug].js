import {
  Box,
  Heading,
  Divider,
  Text,
  HStack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const BlogDetail = () => {
  return (
    <Box p={{ base: '40px 35px', md: '40px 100px' }}>
      <Heading size='lg' textAlign='center'>Impact of COVID-19 to Economic Sector in Indonesia</Heading>
      <Divider m='20px 0 10px 0' bg='white' />
      <HStack spacing='20px' justifyContent='flex-end' fontStyle='italic' mb='20px'>
        <Text>By <Link to='/profile/fdsf' style={{ color: '#63B3ED' }}>Lorem Ipsum</Link></Text>
        <Text>24 June 2021</Text>
      </HStack>
      <Box>
        <Heading>Lorem Ipsum</Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis delectus aspernatur eaque. Excepturi a possimus aliquid nostrum ea neque autem numquam iusto laudantium eaque sapiente, error, consequatur consequuntur ipsum libero dolore esse pariatur quaerat odit doloremque! Doloremque fugit sunt ducimus corporis, et, maxime, tempore ipsa sint illum iusto corrupti non?
        </Text>
        <br />
        <Heading>Lorem Ipsum</Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis delectus aspernatur eaque. Excepturi a possimus aliquid nostrum ea neque autem numquam iusto laudantium eaque sapiente, error, consequatur consequuntur ipsum libero dolore esse pariatur quaerat odit doloremque! Doloremque fugit sunt ducimus corporis, et, maxime, tempore ipsa sint illum iusto corrupti non?
        </Text>
        <br />
        <Heading>Lorem Ipsum</Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis delectus aspernatur eaque. Excepturi a possimus aliquid nostrum ea neque autem numquam iusto laudantium eaque sapiente, error, consequatur consequuntur ipsum libero dolore esse pariatur quaerat odit doloremque! Doloremque fugit sunt ducimus corporis, et, maxime, tempore ipsa sint illum iusto corrupti non?
        </Text>
      </Box>
      <Box mt='30px'>
        <Heading fontSize='25px'>Comments</Heading>
        <Divider bg='white' m='20px 0' />
      </Box>
    </Box>
  );
}

export default BlogDetail;