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

  useEffect(() => {
    if (!socket) return;
    socket.on('updateComment', data => {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {}
      });

      dispatch({
        type: data.comment_root ? COMMENT_TYPES.UPDATE_REPLY : COMMENT_TYPES.UPDATE_COMMENT,
        payload: data
      });
    });

    return () => socket.off('updateComment');
  }, [dispatch, socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on('replyComment', data => {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {}
      });

      dispatch({
        type: COMMENT_TYPES.REPLY_COMMENT,
        payload: data
      });
    });
  }, [dispatch, socket]);

  return (
    <div></div>
  );
}

export default SocketClient;