import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';
import CommentQuill from './../editor/CommentQuill';

const ReplyInput = ({callback, edit, setEdit}) => {
  const [body, setBody] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!body) {
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {
          errors: 'Comment should be filled.'
        }
      });
    }

    callback(body);
    setBody(undefined);
  }

  useEffect(() => {
    if (edit) {
      setBody(edit.content);
    }

    return () => setBody('');
  }, [edit]);

  return (
    <Box mb='10'>
      <CommentQuill body={body} setBody={setBody} />
      <Flex justifyContent={`${edit ? 'space-between' : 'flex-end'}`} alignItems='center' mt='4'>
        {
          edit &&
          <Text
            onClick={() => setEdit('')}
            cursor='pointer'
          >
            Cancel
          </Text>
        }
        <Button
          bg='orange.400'
          _hover={{ bg: 'orange.600' }}
          _active={{ bg: 'orange.600' }}
          onClick={handleSubmit}
        >
          Comment
        </Button>
      </Flex>
    </Box>
  );
}

export default ReplyInput;