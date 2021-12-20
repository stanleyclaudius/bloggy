import {
  Box,
  Heading,
  Divider,
  Text,
  HStack,
  Center,
  Spinner
} from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogById } from './../../redux/actions/blogActions';
import { createComment, getComments } from './../../redux/actions/commentActions';
import Comment from './../../components/comment/Comment';
import ReplyInput from './../../components/comment/ReplyInput';
import Pagination from './../../components/global/Pagination';

const BlogDetail = () => {
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState([]);
  const {slug: id} = useParams();

  const dispatch = useDispatch();
  const {alert, auth, comment, socket, blogDetail} = useSelector(state => state);

  const handleSubmit = content => {
    const data = {
      content,
      user: auth.user,
      blog_id: blogDetail._id,
      blog_user_id: blogDetail.user,
      createdAt: new Date().toISOString()
    };

    setShowComments([data, ...showComments]);
    dispatch(createComment(data, auth));
  }

  const fetchComments = useCallback(async(page = 1) => {
    setLoading(true);
    await dispatch(getComments(id, page));
    setLoading(false);
  }, [dispatch, id]);

  const handlePagination = page => {
    fetchComments(page);
  }

  useEffect(() => {
    if (!id) return;
    dispatch(getBlogById(id));
    fetchComments();
  }, [dispatch, id, fetchComments]);

  useEffect(() => {
    setShowComments(comment.data);
  }, [comment]);

  useEffect(() => {
    if (!id || !socket) return;
    socket.emit('joinRoom', id);
    return () => {
      socket.emit('outRoom', id);
    }
  }, [socket, id]);

  return (
    <>
      {
        alert.loading
        ? (
          <Center>
            <Spinner size='xl' />
          </Center>
        )
        : (
          <Box p={{ base: '40px 35px', md: '40px 100px' }}>
            <Heading size='lg' textAlign='center'>{blogDetail.title}</Heading>
            <Divider m='20px 0 10px 0' bg='white' />
            <HStack spacing='20px' justifyContent='flex-end' fontStyle='italic' mb='20px'>
              <Text>By <Link to={`/profile/${blogDetail.user?._id}`} style={{ color: '#63B3ED' }}>{blogDetail.user?.name}</Link></Text>
              <Text>{new Date(blogDetail.createdAt).toLocaleString()}</Text>
            </HStack>
            <Box
              as='div'
              dangerouslySetInnerHTML={{ __html: blogDetail.content }}
            >
            </Box>
            <Box mt='30px'>
              <Heading fontSize='25px'>Comments</Heading>
              <Divider bg='white' m='20px 0' />
              {auth.token && <ReplyInput callback={handleSubmit} />}

              {
                loading
                ? (
                  <Center>
                    <Spinner size='xl' />
                  </Center>
                )
                : (
                  <>
                    {
                      showComments.map(comm => (
                        <Comment key={comm._id} comment={comm} />
                      ))
                    }
                  </>
                )
              }

              {
                comment.totalPage > 1 &&
                <Pagination
                  page={comment.totalPage}
                  callback={handlePagination}
                />
              }
            </Box>
          </Box>
        )
      }
    </>
  );
}

export default BlogDetail;