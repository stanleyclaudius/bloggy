import { Box, Button, Text, Flex, IconButton, HStack } from "@chakra-ui/react";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { updateComment, replyComment, deleteComment } from './../../redux/actions/commentActions';
import ReplyInput from './../comment/ReplyInput';

const CommentList = ({comment, showReply, setShowReply, children}) => {
  const [onReply, setOnReply] = useState(false);
  const [edit, setEdit] = useState('');

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const handleEdit = content => {
    dispatch(updateComment(comment, content, auth.token));
    setEdit('');
  }

  const handleReply = body => {
    const data = {
      user: auth.user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      reply_user: comment.user,
      comment_root: comment.comment_root || comment._id,
      createdAt: new Date().toISOString()
    };

    setShowReply([data, ...showReply]);
    dispatch(replyComment(data, auth.token));
    setOnReply(false);
  }

  const handleDelete = id => {
    dispatch(deleteComment(id, auth.token));
  }

  const additionalMenu = id => {
    return (
      <>
        <IconButton
          onClick={() => handleDelete(id)}
          bg='red.400'
          aria-label='Delete Comment'
          icon={<FaTrash />}
          _hover={{ bg: 'red.600' }}
          _active={{ bg: 'red.600' }}
          isRound
        />

        <IconButton
          onClick={() => setEdit(comment)}
          bg='orange.400'
          aria-label='Edit Comment'
          icon={<FaEdit />}
          _hover={{ bg: 'orange.600' }}
          _active={{ bg: 'orange.600' }}
          isRound
        />
      </>
    );
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
                  {
                    comment.blog_user_id === auth.user?._id
                    ? comment.user._id === auth.user?._id
                      ? additionalMenu(comment._id)
                      : (
                        <IconButton
                          onClick={() => handleDelete(comment._id)}
                          bg='red.400'
                          aria-label='Delete Comment'
                          icon={<FaTrash />}
                          _hover={{ bg: 'red.600' }}
                          _active={{ bg: 'red.600' }}
                          isRound
                        />
                      )
                    : comment.user._id === auth.user?._id && additionalMenu(comment._id)
                  }
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
            <ReplyInput callback={handleReply} />
          </Box>
        )
      }

      {children}
    </Box>
  );
}

export default CommentList;