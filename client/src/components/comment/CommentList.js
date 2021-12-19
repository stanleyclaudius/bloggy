import { Box, Button, Text, Flex } from "@chakra-ui/react";
import { useState } from 'react';
import ReplyInput from './../comment/ReplyInput';

const CommentList = ({comment}) => {
  const [onReply, setOnReply] = useState(false);

  return (
    <Box width='100%'>
      <Box border='1px' borderColor='gray.500' borderRadius='7px' width='100%' padding='15px'>
        <Text dangerouslySetInnerHTML={{ __html: comment.content }} />

        <Flex mt='20px' justifyContent='space-between' alignItems='center'>
          <Button
            size='sm'
            bg='orange.400'
            _hover={{ bg: 'orange.600' }}
            _active={{ bg: 'orange.600' }}
            onClick={() => setOnReply(!onReply)}
          >
            Reply
          </Button>
          <Text fontSize='14px'>{new Date(comment.createdAt).toLocaleString()}</Text>
        </Flex>
      </Box>

      {
        onReply && (
          <Box mt='5'>
            <ReplyInput />
          </Box>
        )
      }
    </Box>
  );
}

export default CommentList;