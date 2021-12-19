import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GLOBAL_TYPES } from './../../redux/types/globalTypes';
import CommentQuill from './../editor/CommentQuill';

const ReplyInput = ({callback}) => {
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
    setBody('');
  }

  return (
    <Box mb='10'>
      <CommentQuill body={body} setBody={setBody} />
      <Box textAlign='right'>
        <Button
          mt='4'
          bg='orange.400'
          _hover={{ bg: 'orange.600' }}
          _active={{ bg: 'orange.600' }}
          onClick={handleSubmit}
        >Comment</Button>
      </Box>
    </Box>
  );
}

export default ReplyInput;