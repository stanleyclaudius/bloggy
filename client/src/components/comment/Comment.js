import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from './../global/Avatar';
import CommentList from './CommentList';

const Comment = ({comment}) => {
  const [next, setNext] = useState(2);
  const [showReply, setShowReply] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!comment.reply) return;
    setShowReply(comment.reply);
  }, [comment.reply]);

  return (
    <div className='comment' style={{ opacity: `${comment._id ? '1' : '0.5'}`, pointerEvents: `${comment._id ? 'all' : 'none'}` }}>
      <Avatar
        avatar={comment.user?.avatar}
        name={comment.user?.name}
        onClick={() => navigate(`/profile/${comment.user?._id}`)}
      />
      <CommentList
        comment={comment}
        showReply={showReply}
        setShowReply={setShowReply}
      >
        {
          showReply.slice(0, next).map((comment, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '30px',
                marginTop: '20px',
                opacity: `${comment._id ? '1' : '0.5'}`, pointerEvents: `${comment._id ? 'all' : 'none'}` 
              }}
            >
              <Avatar avatar={comment.user?.avatar} name={comment.user?.name} />
              <CommentList
                comment={comment}
                showReply={showReply}
                setShowReply={setShowReply}
              />
            </div>
          ))
        }
        
        {
          showReply.length - next > 0
          ? (
            <p color='blue.400' mt='3' onClick={() => setNext(next + 5)} cursor='pointer'>
              See more
            </p>
          )
          : showReply.length > 2 &&
            <p color='blue.400' mt='3' onClick={() => setNext(2)} cursor='pointer'>
              Hide reply
            </p>
        }
      </CommentList>
    </div>
  );
}

export default Comment;