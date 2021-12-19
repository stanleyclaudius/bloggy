import { Box, Button, Text, Flex, IconButton, HStack } from "@chakra-ui/react";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { updateComment } from './../../redux/actions/commentActions';
import ReplyInput from './../comment/ReplyInput';

const CommentList = ({comment}) => {
  const [onReply, setOnReply] = useState(false);
  const [edit, setEdit] = useState('');

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const handleEdit = content => {
    dispatch(updateComment(comment, content, auth.token));
    setEdit('');
  }

  return (
    <Box width='100%'>
      <Box border='1px' borderColor='gray.500' borderRadius='7px' width='100%' padding='15px'>
        {
          edit
          ? (
            <ReplyInput
              edit={edit}
              setEdit={setEdit}
              callback={handleEdit}
            />
          )
          : (
            <>
              <Text dangerouslySetInnerHTML={{ __html: comment.content }} />
              <Flex mt='20px' justifyContent='space-between' alignItems='center'>
                <HStack>
                  <IconButton
                    onClick={() => setEdit(comment)}
                    bg='orange.400'
                    aria-label='Edit Comment'
                    icon={<FaEdit />}
                    _hover={{ bg: 'orange.600' }}
                    _active={{ bg: 'orange.600' }}
                    isRound
                  />
                  <Button
                    size='sm'
                    bg='orange.400'
                    _hover={{ bg: 'orange.600' }}
                    _active={{ bg: 'orange.600' }}
                    onClick={() => setOnReply(!onReply)}
                  >
                    Reply
                  </Button>
                </HStack>
                <Text fontSize='14px'>{new Date(comment.createdAt).toLocaleString()}</Text>
              </Flex>
            </>
          )
        }
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