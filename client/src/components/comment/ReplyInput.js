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
    <div style={{ marginBottom: `${!edit && '40px'}` }} className='replyInput'>
      <CommentQuill body={body} setBody={setBody} />
      <div className='replyInput__utilBtn'>
        {
          edit &&
          <p style={{ cursor: 'pointer' }} onClick={() => setEdit('')}>
            Cancel
          </p>
        }
        <button onClick={handleSubmit}>
          Comment
        </button>
      </div>
    </div>
  );
}

export default ReplyInput;