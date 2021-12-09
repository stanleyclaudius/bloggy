import { Box, Button, Text, Flex } from "@chakra-ui/react";

const CommentList = () => {
  return (
    <Box border='1px' borderColor='gray.500' borderRadius='7px' width='100%' padding='15px'>
      <Text>Test</Text>

      <Flex mt='20px' justifyContent='space-between' alignItems='center'>
        <Button
          size='sm'
          bg='orange.400'
          _hover={{ bg: 'orange.600' }}
          _active={{ bg: 'orange.600' }}
        >
          Reply
        </Button>
        <Text fontSize='14px'>24 November 2021</Text>
      </Flex>
    </Box>
  );
}

export default CommentList;