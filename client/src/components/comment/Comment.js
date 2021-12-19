import { HStack, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import AvatarComment from './AvatarComment';
import CommentList from './CommentList';

const Comment = ({comment}) => {
  const [next, setNext] = useState(2);
  const [showReply, setShowReply] = useState([]);

  useEffect(() => {
    if (!comment.reply) return;
    setShowReply(comment.reply);
  }, [comment.reply]);

  return (
    <HStack alignItems='flex-start' mb='7' opacity={comment._id ? 1 : 0.5} pointerEvents={comment._id ? 'all' : 'none'}>
      <AvatarComment avatar={comment.user?.avatar} />
      <CommentList
        comment={comment}
        showReply={showReply}
        setShowReply={setShowReply}
      >
        {
          showReply.slice(0, next).map((comment, idx) => (
            <HStack alignItems='flex-start' mt='5' key={idx} opacity={comment._id ? 1 : 0.5} pointerEvents={comment._id ? 'all' : 'none'}>
              <AvatarComment avatar={comment.user?.avatar} />
              <CommentList
                comment={comment}
                showReply={showReply}
                setShowReply={setShowReply}
              />
            </HStack>
          ))
        }
        
        {
          showReply.length - next > 0
          ? (
            <Text color='blue.400' mt='3' onClick={() => setNext(next + 5)} cursor='pointer'>
              See more
            </Text>
          )
          : showReply.length > 2 &&
            <Text color='blue.400' mt='3' onClick={() => setNext(2)} cursor='pointer'>
              Hide reply
            </Text>
        }
      </CommentList>
    </HStack>
  );
}

export default Comment;