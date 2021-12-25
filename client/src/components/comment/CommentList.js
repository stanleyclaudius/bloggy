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
        <button className='commentList__delete' onClick={() => handleDelete(id)}>
          <FaTrash />
        </button>

        <button className='commentList__edit' onClick={() => setEdit(comment)}>
          <FaEdit />
        </button>
      </>
    );
  }

  return (
    <div className='commentList'>
      <div>
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
            <div className='commentList__content'>
              <div dangerouslySetInnerHTML={{ __html: comment.content }} />
              <div className='commentList__utilBtn'>
                <div>
                  {
                    comment.blog_user_id === auth.user?._id
                    ? comment.user._id === auth.user?._id
                      ? additionalMenu(comment._id)
                      : (
                        <button className='commentList__delete' onClick={() => handleDelete(comment._id)}>
                          <FaTrash />
                        </button>
                      )
                    : comment.user._id === auth.user?._id && additionalMenu(comment._id)
                  }

                  {
                    auth.token && 
                    <button onClick={() => setOnReply(!onReply)}>
                      Reply
                    </button>
                  }
                </div>
                <p>{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
            </div>
          )
        }
      </div>

      {
        onReply && (
          <div mt='5'>
            <ReplyInput callback={handleReply} />
          </div>
        )
      }

      {children}
    </div>
  );
}

export default CommentList;