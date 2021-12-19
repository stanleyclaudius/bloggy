import { HStack } from '@chakra-ui/react';
import AvatarComment from './AvatarComment';
import CommentList from './CommentList';

const Comment = ({comment}) => {
  return (
    <HStack alignItems='flex-start' mb='7'>
      <AvatarComment avatar={comment.user?.avatar} />
      <CommentList comment={comment} />
    </HStack>
  );
}

export default Comment;