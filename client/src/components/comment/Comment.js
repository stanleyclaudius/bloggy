import { HStack } from '@chakra-ui/react';
import AvatarComment from './AvatarComment';
import CommentList from './CommentList';

const Comment = () => {
  return (
    <HStack alignItems='flex-start'>
      <AvatarComment />
      <CommentList />
    </HStack>
  );
}

export default Comment;