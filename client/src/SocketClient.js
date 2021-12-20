import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBAL_TYPES } from './redux/types/globalTypes';
import { COMMENT_TYPES } from './redux/types/commentTypes';

const SocketClient = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector(state => state);

  useEffect(() => {
    if (!socket) return;
    socket.on('createComment', data => {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {}
      });

      dispatch({
        type: COMMENT_TYPES.CREATE_COMMENT,
        payload: data
      });
    });

    return () => socket.off('createComment');
  }, [dispatch, socket]);

  return (
    <div></div>
  );
}

export default SocketClient;